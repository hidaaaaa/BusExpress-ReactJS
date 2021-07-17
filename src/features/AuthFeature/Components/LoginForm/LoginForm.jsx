import InputField from 'components/InputField/InputField';
import PasswordField from 'components/PasswordField/PasswordField';
import React from 'react';
import { useForm } from 'react-hook-form';

function LoginForm({ onSubmit }) {
	const form = useForm({
		defaultValues: {
			email: '',
			password: '',
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
		<form onSubmit={form.handleSubmit(handleSubmit)} className="loginForm">
			<div className="loginForm__title">Login Now</div>

			<InputField form={form} name="email" label="email" />
			<PasswordField form={form} name="password" label="password" />

			<button type="submit">Register</button>
		</form>
	);
}

export default LoginForm;
