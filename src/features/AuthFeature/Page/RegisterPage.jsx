import { notification } from 'antd';
import authApi from 'api/authApi';
import React from 'react';
import { useState } from 'react';
import RegisterForm from '../Components/RegisterForm/RegisterForm';

function RegisterPage(props) {
	const [loading, setLoading] = useState(false);
	const handleSubmit = async (values) => {
		setLoading(true);
		try {
			console.log(values);
			const data = {
				...values,
				sex: values.sex ? 'Nữ' : 'Nam',
			};
			await authApi.register(data);
			setLoading(false);
			return notification.success({
				message: 'register success',
			});
		} catch (error) {
			setLoading(false);
			return notification.error({
				message: 'register fail',
			});
		}
	};

	return (
		<div className="page">
			<RegisterForm onSubmit={handleSubmit} loading={loading} />
		</div>
	);
}

export default RegisterPage;
