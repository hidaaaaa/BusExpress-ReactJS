import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, notification } from 'antd';
import InputField from 'components/InputField/InputField';
import PasswordField from 'components/PasswordField/PasswordField';
import RadioField from 'components/RadioField';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import '../style.scss';

// const schema = yup.object().shape({
// 	fullname: yup
// 		.string()
// 		.required('please enter your fullname')
// 		.test('should has at least two words', 'Please enter at least two words', (value) => {
// 			return value.split(' ').length >= 2;
// 		}),

// 	email: yup.string().required('Please enter your email').email('Please enter a valid email'),

// 	password: yup.string().required('Please enter your password').min(6, 'Please enter at least 6 characters'),
// 	retypePassword: yup
// 		.string()
// 		.required('Please retype your password')
// 		.oneOf([yup.ref('password')], 'Password does not match'),
// });

function RegisterForm({ onSubmit, loading }) {
	const form = useForm({
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			password: '',
			address: '',
			sex: false,
		},
		// resolver: yupResolver(schema),
	});

	const handleSubmit = async (values) => {
		if (
			values.name === '' ||
			values.email === '' ||
			values.phone === '' ||
			values.password === '' ||
			values.address === ''
		) {
			return notification.error({
				message: 'error',
				description: 'Field cant null',
			});
		}

		if (onSubmit) {
			await onSubmit(values);
			// form.reset();
		}
	};

	return (
		<form onSubmit={form.handleSubmit(handleSubmit)} className="registerForm">
			<div className="registerForm__title">
				Register Now
				<span>
					<Link to="login">
						<Button type="primary" danger style={{ marginRight: '10px' }}>
							login
						</Button>
					</Link>
					<Link to="forgot">
						<Button type="primary">Forgot Password?</Button>
					</Link>
				</span>
			</div>

			<InputField form={form} name="name" label="name" />
			<InputField form={form} name="email" label="email" />
			<InputField form={form} name="phone" label="phone" />
			<InputField form={form} name="address" label="address" />
			<RadioField form={form} name="sex" label="Sex" defaultValue={false} />
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

export default RegisterForm;
