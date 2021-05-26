import axiosClient from "./axiosClients";

const productAPI = {
	async getAll(params) {
		// Transform _page to _start
		const newParams = { ...params };
		newParams._start =
			!params._page || params._page <= 1
				? 0
				: (params._page - 1) * (params._limit || 50);
		// Remove un-needed key
		delete newParams._page;
		// Fetch product list + count
		const productList = await axiosClient.get("/products", {
			params: newParams,
		});
		const count = await axiosClient.get("/products/count", {
			params: newParams,
		});
		// Build response and return
		return {
			data: productList,
			pagination: {
				page: params._page,
				limit: params._limit,
				total: count,
			},
		};
	},
	get(id) {
		let url = `/products/${id}`;
		return axiosClient.get(url);
	},
	add(data) {
		let url = "/products";
		return axiosClient.post(url, data);
	},
	update(data) {
		let url = `/products/${data.id}`;
		return axiosClient.patch(url);
	},
	remove(id) {
		let url = `/products/${id}`;
		return axiosClient.delete(url);
	},
};

export default productAPI;
