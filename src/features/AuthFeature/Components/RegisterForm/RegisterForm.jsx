import InputField from 'components/InputField/InputField';
import PasswordField from 'components/PasswordField/PasswordField';
import React from 'react';
import { useForm } from 'react-hook-form';

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

function RegisterForm({ onSubmit }) {
	const form = useForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
			password2: '',
		},
		// resolver: yupResolver(schema),
	});

	const handleSubmit = async (values) => {
		if (onSubmit) {
			await onSubmit(values);
			form.reset();
		}
	};

	return (
		<form onSubmit={form.handleSubmit(handleSubmit)} className="registerForm">
			<div className="registerForm__title">Login Now</div>

			<InputField form={form} name="name" label="name" />
			<InputField form={form} name="email" label="email" />
			<PasswordField form={form} name="password" label="password" />
			<PasswordField form={form} name="password2" label="password2" />

			<button type="submit">Register</button>
		</form>
	);
}

export default RegisterForm;
