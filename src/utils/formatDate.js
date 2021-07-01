export function formatDate(departureDate) {
	let day = departureDate.getDate();
	let year = departureDate.getFullYear();
	let month = departureDate.getMonth() + 1;
	if (day < 10) {
		day = '0' + day;
	}
	if (month < 10) {
		month = '0' + month;
	}
	return year + '-' + month + '-' + day;
}
