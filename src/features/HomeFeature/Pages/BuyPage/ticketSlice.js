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
	},
});

const { actions, reducer } = ticketSlice;
export const { getListTicket } = actions;
export default reducer;
