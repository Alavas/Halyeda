import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

class Nav extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(e) {
		this.props.updateHistory(e.target.id)
	}

	render() {
		const history = this.props.pathname

		return (
			<div className="navbar-fixed">
				<nav className="navheader">
					<div className="nav-wrapper">
						<a className="brand-logo" href="https://github.com/alavas/">
							ALAVAS
							<sub style={{ fontSize: '9px' }}>Justin Savala</sub>
						</a>
						{/*eslint-disable-next-line*/}
						<a data-activates="mobile-demo" className="button-collapse">
							<i className="material-icons">menu</i>
						</a>
						<ul className="right hide-on-med-and-down">
							<li
								style={
									history === '/chart'
										? { backgroundColor: 'rgba(0,0,0,0.2)' }
										: null
								}
							>
								{/*eslint-disable-next-line*/}
								<a id="chart" onClick={this.handleClick}>
									Data Chart
									<i id="chart" className="material-icons left">
										show_chart
									</i>
								</a>
							</li>
							<li
								style={
									history === '/about'
										? { backgroundColor: 'rgba(0,0,0,0.2)' }
										: null
								}
							>
								{/*eslint-disable-next-line*/}
								<a id="about" onClick={this.handleClick}>
									About
									<i id="about" className="material-icons left">
										info
									</i>
								</a>
							</li>
						</ul>
						<ul className="side-nav" id="mobile-demo">
							<li
								style={
									history === '/chart'
										? { backgroundColor: 'rgba(0,0,0,0.2)' }
										: null
								}
							>
								{/*eslint-disable-next-line*/}
								<a id="chart" onClick={this.handleClick}>
									Data Chart
									<i id="chart" className="material-icons left">
										show_chart
									</i>
								</a>
							</li>
							<li
								style={
									history === '/about'
										? { backgroundColor: 'rgba(0,0,0,0.2)' }
										: null
								}
							>
								{/*eslint-disable-next-line*/}
								<a id="about" onClick={this.handleClick}>
									About
									<i id="about" className="material-icons left">
										info
									</i>
								</a>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		pathname: state.router.location.pathname
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateHistory: route => {
			dispatch(push(route))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Nav)
