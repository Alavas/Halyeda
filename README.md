# Halyeda

## v1.1

-  PostgreSQL Database
-  NodeJS Back End
-  ReactJS/Redux Front End

## v1.0

-  MS SQL Database
-  NodeJS/PHP Back End
-  HTML/PHP Front End

---

## Back End API

### Routes

##### GET /graphdata

Returns the most recent datapoint in the database as JSON.

&nbsp;&nbsp;&nbsp;&nbsp;**_Example Data:_**

```json
{
	"id": 2112,
	"ts": "2018-11-23T05:57:52.873Z",
	"t": "67.38",
	"l": "59.49",
	"o": "43.3",
	"f": "43.3",
	"w": "0",
	"p": "30.35",
	"r": "0.00",
	"h": "82"
}
```

##### POST /graphdata

Returns an array of objects containing all datapoints after supplied timestamp. Timestamp to be sent as a part of a JSON formatted body.

&nbsp;&nbsp;&nbsp;&nbsp;**_Example Body:_**

```json
{
	"timestamp": "2018-11-23 01:03:25.060"
}
```

&nbsp;&nbsp;&nbsp;&nbsp;**_Returned Data:_**

```json
[
	{
		"ID": 820041,
		"TS": "2018-11-23T01:03:44.097",
		"T": "67.38",
		"L": 17.84,
		"O": "43.3",
		"F": "43.3",
		"W": "0",
		"P": "30.35",
		"R": "0.00",
		"H": "82"
	},
	{
		"ID": 820042,
		"TS": "2018-11-23T01:04:04.113",
		"T": "67.38",
		"L": 17.71,
		"O": "44.3",
		"F": "44.3",
		"W": "0",
		"P": "30.34",
		"R": "0.00",
		"H": "80"
	}
]
```

##### POST /data

Accepts a POST with a JSON body and writes to Postgres database.

&nbsp;&nbsp;&nbsp;&nbsp;**_Example Data:_**

```json
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
```

Returns **_201_** for success, **_401_** for incorrect API key, and **_400_** on error.
