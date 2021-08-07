import axiosClient from './axiosClient';

const paymentApi = {
	async payment(params) {
		const newParams = { ...params };
		const results = await axiosClient.post('m/pay', newParams);
		console.log(results);
		return results;
	},
};

export default paymentApi;
