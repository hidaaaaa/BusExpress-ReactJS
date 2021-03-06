import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, notification } from 'antd';
import InputField from 'components/InputField/InputField';
import PasswordField from 'components/PasswordField/PasswordField';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import '../style.scss';

function LoginForm({ onSubmit, loading = false }) {
	const form = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		// resolver: yupResolver(schema),
	});

	const handleSubmit = async (values) => {
		console.log(values.email, values.password, values.email === '' || values.password === '');
		if (values.email !== '' || values.password !== '') {
			if (onSubmit) {
				await onSubmit(values);
				//form.reset();
			}
		} else {
			return notification.error({
				message: 'Wrong credentials 1',
				description: 'Invalid username or password',
			});
		}
	};

	return (
		<form onSubmit={form.handleSubmit(handleSubmit)} className="loginForm">
			<div className="loginForm__title">
				Login Now
				<span>
					<Link to="register">
						<Button type="primary" danger style={{ marginRight: '10px' }}>
							register
						</Button>
					</Link>
					<Link to="forgot">
						<Button type="primary">Forgot Password?</Button>
					</Link>
				</span>
			</div>

			<InputField form={form} name="email" label="email" />
			<PasswordField form={form} name="password" label="password" />

			<button type="submit" className={loading ? 'loading-button' : ''}>
				{loading ? (
					<>
						<FontAwesomeIcon icon={faSpinner} className="loading-icon" /> Loading...
					</>
				) : (
					<>Login</>
				)}
			</button>
		</form>
	);
}

export default LoginForm;
