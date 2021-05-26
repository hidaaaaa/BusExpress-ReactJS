import axiosClient from './axiosClient';

const locationAPI = {
	getAll(params) {
		let url = '/trips';
		return axiosClient.get(url, { params });
	},
	async getPostsOfTripByDate(params) {
		// Transform _page to _start
		const newParams = { ...params };
		// newParams._start = !params._page || params._page <= 1 ? 0 : (params._page - 1) * (params._limit || 50);
		// Remove un-needed key
		// delete newParams._page;
		// Fetch product list + count
		const productList = await axiosClient.get('/trip', { params: newParams });
		// const count = await axiosClient.get('/products/count', { params: newParams });
		// Build response and return
		// return {
		// 	data: productList,
		// 	pagination: {
		// 		page: params._page,
		// 		limit: params._limit,
		// 	},
		// };
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
