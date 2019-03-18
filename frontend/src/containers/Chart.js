import React, { Component } from 'react'
import { connect } from 'react-redux'
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer'
import LineChart from 'recharts/lib/chart/LineChart'
import Line from 'recharts/lib/cartesian/Line'
import XAxis from 'recharts/lib/cartesian/XAxis'
import YAxis from 'recharts/lib/cartesian/YAxis'
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid'
import Tooltip from 'recharts/lib/component/Tooltip'
import Legend from 'recharts/lib/component/Legend'

class Chart extends Component {
	render() {
		const update =
			new Date(this.props.chart.lastUpdate).toLocaleString() ||
			'Loading Data'
		const dataPoints = this.props.chart.data.length || 'Loading!'
		const current = this.props.chart.data.slice(-1)[0] || {}
		return (
			<div className="chart">
				<ResponsiveContainer
					width="99%"
					height={450}
					className="chart-graph"
				>
					<LineChart data={this.props.chart.data}>
						<XAxis dataKey="time" />
						<YAxis
							domain={[0, 100]}
							minor={true}
							ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
						/>
						<CartesianGrid vertical={true} strokeDasharray="3 3" />
						<Tooltip />
						<Legend className="chart-legend" />
						<Line
							name="Outside Temp (°F)"
							dataKey="outside"
							stroke="black"
							dot={false}
						/>
						<Line
							name="Room Temp (°F)"
							dataKey="room"
							stroke="red"
							dot={false}
						/>
						<Line
							name="Feels Like (°F)"
							dataKey="feelslike"
							stroke="blue"
							dot={false}
						/>
						<Line
							name="Light Lvl (%)"
							dataKey="light"
							stroke="grey"
							dot={false}
						/>
						<Line
							name="Wind (mph)"
							dataKey="wwind"
							stroke="orange"
							dot={false}
						/>
						<Line
							name="Pressure (inHg)"
							dataKey="pressure"
							stroke="green"
							dot={false}
						/>
						<Line
							name="Rain (in)"
							dataKey="rain"
							stroke="purple"
							dot={false}
						/>
						<Line
							name="Humidity (%)"
							dataKey="humidity"
							stroke="magenta"
							dot={false}
						/>
					</LineChart>
				</ResponsiveContainer>
				<div className="card chart-table">
					<table className="bordered striped centered">
						<caption>Current Data</caption>
						<thead />
						<tbody>
							<tr>
								<td>Last Update</td>
								<td>{update}</td>
								<td># Data Points</td>
								<td>{dataPoints}</td>
							</tr>
							<tr>
								<td>Room</td>
								<td>{current.room}</td>
								<td>Outside</td>
								<td>{current.outside}</td>
							</tr>
							<tr>
								<td>Feels Like</td>
								<td>{current.feelslike}</td>
								<td>Humidity</td>
								<td>{current.humidity}</td>
							</tr>
							<tr>
								<td>Wind</td>
								<td>{current.wind}</td>
								<td>Pressure</td>
								<td>{current.pressure}</td>
							</tr>
							<tr>
								<td>Rain</td>
								<td>{current.rain}</td>
								<td>Light Lvl</td>
								<td>{current.light}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		chart: state.chartReducer
	}
}

export default connect(mapStateToProps)(Chart)
