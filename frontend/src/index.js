import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { updateTime, updateData } from './actions/chartActions'
import { initDate } from './utilities/utils'
import { history, store } from './store/store'
import App from './App'
//Import global CSS.
import './styles/index.css'

class createWS {
	constructor() {
		this.connected = false
		this.missedMsgs = 0
	}
	open() {
		this.ws = new WebSocket('wss://halyeda.herokuapp.com')
		this.ws.onerror = e => {
			console.log(e)
		}
		this.ws.onmessage = message => {
			let payload = JSON.parse(message.data)
			store.dispatch({
				type: payload.action,
				data: payload.data
			})
			this.missedMsgs = 0
		}
		this.connected = true
	}
	close() {
		this.ws.close()
		this.connected = false
	}
}

setInterval(() => {
	if (ws.connected) {
		ws.missedMsgs++
		if (ws.missedMsgs > 11) {
			ws.close()
		}
	} else {
		store.dispatch(updateData(store.getState().chartReducer.lastUpdate))
		ws.open()
	}
}, 2000)

const ws = new createWS()
//Set initial time.
store.dispatch(updateTime(initDate()))
//Initialize data store.
store.dispatch(updateData(store.getState().chartReducer.lastUpdate))
ws.open()

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
	document.getElementById('root')
)
