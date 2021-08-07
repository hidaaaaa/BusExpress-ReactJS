const { createSlice } = require('@reduxjs/toolkit');

const ticketSlice = createSlice({
	name: 'tickets',
	initialState: {
		tickets: {},
	},
	reducers: {
		getListTicket(state, action) {
			const newListTicket = action.payload;
			state.tickets = newListTicket;
		},
		deleteTicket(state, action) {
			state.tickets = {};
		},
	},
});

const { actions, reducer } = ticketSlice;
export const { getListTicket, deleteTicket } = actions;
export default reducer;
