import axiosClient from './axiosClient';

const authApi = {
	async register(data) {
		const url = '/m/register';

		return await axiosClient.post(url, data);
	},
	async login(data) {
		const url = '/user/m/login';

		return await axiosClient.post(url, data);
	},
	async bookedTickets(data) {
		const url = '/user/booked_tickets';

		return await axiosClient.get(url, data);
	},
	async cancelTicket(data) {
		const url = '/user/cancle';

		return await axiosClient.post(url, data);
	},
	async forgotPassword(data) {
		const url = '/m/forgot';

		return await axiosClient.post(url, data);
	},
	async changePassword(data) {
		const url = '/user/m/profile';

		return await axiosClient.post(url, data);
	},
};

export default authApi;
