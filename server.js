const express = require('express')
const http = require('http')
const path = require('path')
const ws = require('ws')
const bodyParser = require('body-parser')
const _ = require('lodash')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg')

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: process.env.SSL_STATE
})

const app = express()
const server = http.Server(app)
const wss = new ws.Server({ server })

app.use(bodyParser.json())
app.use(
	bodyParser.urlencoded({
		extended: true
	})
)

app.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
	res.header('Access-Control-Allow-Headers', 'Content-Type')
	next()
})

//Return most recent datapoint as JSON.
app.get('/api/graphdata', async (req, res) => {
	const Query = `SELECT id,eventdate AS ts,room AS t,ROUND(CAST(light as DECIMAL(7,2))/327.67,2) AS l,outside AS o,feelslike AS f,wind AS w,pressure AS p,rain AS r,humidity AS h FROM datalog ORDER BY ID DESC LIMIT 1;`
	try {
		const client = await pool.connect()
		const result = await client.query(Query)
		const results = result ? result.rows[0] : {}
		res.send(results)
		res.end
		client.release()
	} catch (err) {
		console.error(err)
		res.send('Error ' + err)
		res.end
	}
})

//TODO: complete the /graphdata route.
app.post('/api/graphdata', async (req, res) => {
	const timestamp = req.body.timestamp
	if (_.isUndefined(timestamp)) {
		res.sendStatus(400)
		res.end
	} else {
		const Query = `SELECT id,eventdate,room,light,outside,feelslike,wind,pressure,rain,humidity FROM datalog WHERE eventdate > '${timestamp}' ORDER BY id ASC;`
		try {
			const client = await pool.connect()
			const result = await client.query(Query)
			const results = result ? result.rows : []
			res.send(results)
			res.end
			client.release()
		} catch (err) {
			console.error(err)
			res.send('Error ' + err)
			res.end
		}
	}
})

//Receive data from the data logger.

/* Sample JSON data from datalogger.
{ 
	"room": "75.32",
	"light": "21989",
	"outside": "68.9",
	"feelslike": "68.9",
	"wind": "0",
	"pressure": "29.91",
	"rain": "0.70",
	"humidity": "86%",
	"apikey": "your-api-key" 
}
*/

app.post('/api/data', async (req, res) => {
	const data = req.body
	if (data.apikey === process.env.API_KEY) {
		data.humidity = data.humidity.replace('%', '')
		data.eventdate = new Date().toISOString()
		delete data.apikey
		wss.clients.forEach(function each(client) {
			if (client.readyState === ws.OPEN) {
				client.send(
					JSON.stringify({
						type: 'LOAD_DATA_SUCCESS',
						data: [data]
					})
				)
			}
		})
		// prettier-ignore
		let Query = `INSERT INTO datalog (eventdate,room,light,outside,feelslike,wind,pressure,rain,humidity) VALUES ('${data.eventdate}','${data.room}','${data.light}','${data.outside}','${data.feelslike}','${data.wind}','${data.pressure}','${data.rain}','${data.humidity}');`
		try {
			const client = await pool.connect()
			const results = await client.query(Query)
			res.sendStatus(201)
			res.end
			client.release()
		} catch (err) {
			console.error(err)
			res.send('Error ' + err)
		}
	} else {
		res.sendStatus(401)
		res.end
	}
})

app.use(express.static(path.join(__dirname, 'frontend/build')))

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'))
})

wss.on('connection', function open(ws) {
	console.log('Client Connected')
})

wss.on('close', function close() {
	console.log('disconnected')
})

server.listen(PORT, () => {
	console.log(`App listening on ${PORT}.`)
})
