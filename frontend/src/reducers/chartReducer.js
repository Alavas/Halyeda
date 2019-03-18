import { DateTime } from 'luxon'

export const chartReducer = (
	state = {
		auto: true,
		lastUpdate: '',
		data: []
	},
	action
) => {
	switch (action.type) {
		case 'LAST_UPDATE':
			state = { ...state, lastUpdate: action.time }
			break
		case 'LOAD_DATA_SUCCESS':
			let x = action.data.length
			if (x > 0) {
				action.data.map(point => {
					point.time = DateTime.fromISO(point.eventdate).toLocaleString(
						DateTime.DATETIME_MED_WITH_SECONDS
					)
					point.light = ((point.light / 65535) * 100).toFixed(2)
					return point
				})
				let lastUpdate = action.data[x - 1].eventdate
				state = {
					...state,
					data: [...state.data, ...action.data],
					lastUpdate
				}
			}
			break
		case 'LOAD_DATA_FAILURE':
			state = {
				...state,
				data: []
			}
			break
		case 'CHART_AUTO':
			state = { ...state, auto: action.auto }
			break
		default:
			break
	}
	return state
}
