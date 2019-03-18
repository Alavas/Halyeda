export const initDate = () => {
	let d = new Date()
	d.setSeconds(1)
	d.setMinutes(0)
	d.setHours(0)
	d = d
		.toISOString()
		.slice(0, 19)
		.replace('T', ' ')
	return d
}
