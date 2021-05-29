import axiosClient from './axiosClient';

const listPostApi = {
	async getPostByDateAndTime(params) {
		const newParams = { ...params };

		const productList = await axiosClient.get('/m/posts', { params: newParams });

		return productList;
	},
};

export default listPostApi;
