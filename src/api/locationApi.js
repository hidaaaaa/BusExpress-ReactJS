import axiosClient from './axiosClient';

const locationAPI = {
	getAll(params) {
		let url = '/trips';
		return axiosClient.get(url, { params });
	},
	async getPostsOfTripByDate(params) {
		const newParams = { ...params };

		const productList = await axiosClient.get('/trip', { params: newParams });

		return productList;
	},
	add(data) {
		let url = '/location';
		return axiosClient.post(url, data);
	},
	update(data) {
		let url = `/location/${data.id}`;
		return axiosClient.patch(url);
	},
	remove(id) {
		let url = `/location/${id}`;
		return axiosClient.delete(url);
	},
};

export default locationAPI;
