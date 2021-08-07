import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, notification } from 'antd';
import authApi from 'api/authApi';
import InputField from 'components/InputField/InputField';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function ForgotForm(props) {
	const [loading, setLoading] = useState(false);
	const form = useForm({
		defaultValues: {
			email: '',
		},
		// resolver: yupResolver(schema),
	});

	const handleSubmit = async (values) => {
		// if (onSubmit) {
		// 	await onSubmit(values);
		// 	form.reset();
		// }

		setLoading(true);

		try {
			await authApi.forgotPassword(values);
			setLoading(false);
			return notification.success({
				message: 'Change password success',
			});
		} catch (error) {
			console.log(error);
			setLoading(false);
			return notification.error({
				message: 'Change password fail',
				// description: error.msg,
			});
		}
	};

	return (
		<form onSubmit={form.handleSubmit(handleSubmit)} className="loginForm">
			<div className="loginForm__title">
				Forgot Password
				<span>
					<Link to="login">
						<Button type="primary" danger style={{ marginRight: '10px' }}>
							Login
						</Button>
					</Link>
				</span>
			</div>

			<InputField form={form} name="email" label="email" />

			<button type="submit" className={`${loading ? 'loading-button' : ''}`}>
				{loading ? (
					<>
						<FontAwesomeIcon icon={faSpinner} className="loading-icon" /> Loading...
					</>
				) : (
					<>Send Email to reset password</>
				)}
			</button>
		</form>
	);
}

export default ForgotForm;
