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
	async getPostByDateAndTime(params) {
		const newParams = { ...params };

		const productList = await axiosClient.get('/posts', { params: newParams });

		return productList;
	},
	async getPostDetailed(params) {
		const url = `/getPostDetails/${params.postID}`;

		const postDetailed = await axiosClient.get(url);
		return postDetailed;
	},
	async getAllBuses() {
		const url = '/all-buses';

		const allBuses = await axiosClient.get(url);
		return allBuses;
	},
};

export default busApi;
