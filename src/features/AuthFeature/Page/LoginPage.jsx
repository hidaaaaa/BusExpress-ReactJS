import { unwrapResult } from '@reduxjs/toolkit';
import { notification } from 'antd';
import { login } from 'features/authSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginForm from '../Components/LoginForm/LoginForm';

function LoginPage({ url = '/home' }) {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();

	const handleSubmit = async (values) => {
		setLoading(true);
		try {
			const action = login(values);
			const resultAction = await dispatch(action);
			unwrapResult(resultAction);
			history.push(url);
			setLoading(false);
			return notification.error({
				message: 'Login success',
			});
		} catch (error) {
			setLoading(false);
			return notification.error({
				message: 'Wrong credentials',
				description: 'Invalid username or password',
			});
		}
	};
	return (
		<div className="page">
			<LoginForm onSubmit={handleSubmit} loading={loading} />
		</div>
	);
}

export default LoginPage;
