import { notification } from 'antd';
import authApi from 'api/authApi';
import React from 'react';
import { useState } from 'react';
import ChangePasswordForm from './components/ChangePasswordForm';

function ChangePassword(props) {
	const [loading, setLoading] = useState(false);
	const onChangePassword = async (values) => {
		setLoading(true);
		try {
			await authApi.changePassword(values);
			setLoading(false);
			return notification.success({ message: 'success', description: 'change password successful' });
		} catch (error) {
			setLoading(false);
			return notification.error({ message: 'error', description: '' });
		}
	};

	return (
		<div>
			<div className="profile__title">change password</div>

			<ChangePasswordForm onSubmit={onChangePassword} loading={loading} />
		</div>
	);
}

export default ChangePassword;
