import axiosClient from './axiosClient';

const authApi = {
	async register(data) {
		const url = '/m/register';

		return await axiosClient.post(url, data);
	},
};

export default authApi;
