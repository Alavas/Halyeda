export const updateTime = time => {
	return {
		type: 'LAST_UPDATE',
		time
	}
}

export const updateData = timestamp => {
	return dispatch =>
		fetch('https://halyeda.herokuapp.com/api/graphdata', {
			method: 'POST',
			body: JSON.stringify({
				timestamp
			}),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(
				data => dispatch(dataSuccess(data)),
				err => dispatch(dataFailure(err))
			)
}

export const dataSuccess = data => {
	return {
		type: 'LOAD_DATA_SUCCESS',
		data
	}
}

export const dataFailure = err => {
	return {
		type: 'LOAD_DATA_FAILURE',
		err
	}
}
