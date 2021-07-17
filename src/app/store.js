import authReducer from 'features/authSlice';
import ticketReducer from 'features/HomeFeature/Pages/BuyPage/ticketSlice';
const { configureStore } = require('@reduxjs/toolkit');

const rootReducer = {
	auth: authReducer,
	tickets: ticketReducer,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
