import React, { Component } from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import ReactGA from 'react-ga'
import Nav from './containers/Nav'
import Chart from './containers/Chart'
import About from './components/About'

class App extends Component {
	componentDidMount() {
		ReactGA.initialize('UA-108465458-1')
		ReactGA.pageview(window.location.pathname)
	}

	componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location) {
			this.fireTracking()
		}
	}

	fireTracking() {
		ReactGA.pageview(window.location.pathname)
	}

	render() {
		return (
			<div className="app">
				<Nav />
				<Switch>
					<Route exact path="/about" component={About} />
					<Route exact path="/chart" component={Chart} />
					<Redirect to="/chart" />
				</Switch>
			</div>
		)
	}
}

export default withRouter(App)
