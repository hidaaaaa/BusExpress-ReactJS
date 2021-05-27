import transferSlice from '../features/BuyTicketFeature/TransferSlice';
const { configureStore } = require('@reduxjs/toolkit');

const rootReducer = {
	transfer: transferSlice,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
