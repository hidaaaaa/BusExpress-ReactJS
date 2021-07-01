import axiosClient from './axiosClient';

const busApi = {
	getAll(params) {
		let url = '/trips';
		return axiosClient.get(url, { params });
	},
	async getPostsOfTripByDate(params) {
		const newParams = { ...params };

		const productList = await axiosClient.get('/trip', { params: newParams });

		return productList;
	},
};

export default busApi;
