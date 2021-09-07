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
	async getAllTicket() {
		const url = '/all-ticket';

		const allTicket = await axiosClient.get(url);
		return allTicket;
	},
	async getTotalRevenue() {
		const url = '/total-revenue';
		const allTicket = await axiosClient.get(url);
		return allTicket;
	},
	async getAllTicketEmail() {
		const url = '/all-ticket-mail';

		const allTicket = await axiosClient.get(url);
		return allTicket;
	},
	async getBuses() {
		const url = '/buses';

		const allBuses = await axiosClient.get(url);
		return allBuses;
	},
	async createBus(params) {
		const url = `/create-bus?BienSoXe=${params.BienSoXe}&LoaiXe=${params.LoaiXe}&SoLuongGhe=${params.SoLuongGhe}`;

		const bus = await axiosClient.post(url);
		return bus;
	},
	async changeBus(params) {
		const url = `/change-bus?BienSoXe=${params.BienSoXe}&LoaiXe=${params.LoaiXe}&SoLuongGhe=${params.SoLuongGhe}`;

		const bus = await axiosClient.post(url);
		return bus;
	},
	async createTrip(params) {
		const url = `/create-trip?MaTX=${params.MaTX}&DiemDi=${params.DiemDi}&DiemDen=${params.DiemDen}&DonGia=${params.DonGia}`;
		const trip = await axiosClient.post(url);
		return trip;
	},
	async changeTrip(params) {
		const url = `/change-trip?MaTX=${params.MaTX}&DiemDi=${params.DiemDi}&DiemDen=${params.DiemDen}&DonGia=${params.DonGia}`;
		const trip = await axiosClient.post(url);
		return trip;
	},
	async createPost(params) {
		const url = `/create-post?MaCX=${params.MaCX}&MaTX=${params.MaTX}&BienSoXe=${params.BienSoXe}&NgayDi=${params.NgayDi}&GioDi=${params.GioDi}`;
		const post = await axiosClient.post(url);
		return post;
	},
	async changePost(params) {
		const url = `/change-post?MaCX=${params.MaCX}&MaTX=${params.MaTX}&BienSoXe=${params.BienSoXe}&NgayDi=${params.NgayDi}&GioDi=${params.GioDi}`;
		const post = await axiosClient.post(url);
		return post;
	},
};

export default busApi;
