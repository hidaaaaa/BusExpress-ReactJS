const { configureStore } = require('@reduxjs/toolkit');

const rootReducer = {
	transfer: 1,
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
