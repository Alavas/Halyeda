import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { rootReducer } from '../reducers'
import thunk from 'redux-thunk'

export const history = createBrowserHistory()

export const store = createStore(
	connectRouter(history)(rootReducer),
	compose(applyMiddleware(routerMiddleware(history), thunk))
)
