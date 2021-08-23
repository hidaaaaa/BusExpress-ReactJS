import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { notification } from 'antd';
import PasswordField from 'components/PasswordField/PasswordField';
import React from 'react';
import { useForm } from 'react-hook-form';

function ChangePasswordForm({ onSubmit, loading = false }) {
	const form = useForm({
		defaultValues: {
			password: '',
			newPassword: '',
			reNewPassword: '',
		},
		// resolver: yupResolver(schema),
	});

	const handleSubmit = async (values) => {
		if (values.reNewPassword !== values.newPassword) {
			return notification.error({ message: 'error', description: "Password dosen't match" });
		}
		if (values.reNewPassword === '' || values.newPassword === '' || values.password === '') {
			return notification.error({ message: 'error', description: "Password can't null" });
		}

		if (onSubmit) {
			const temp = { new: values.newPassword, old: values.password };
			onSubmit(temp);
		}
	};

	return (
		<form onSubmit={form.handleSubmit(handleSubmit)} className="loginForm">
			<PasswordField form={form} name="password" label="password" />
			<PasswordField form={form} name="newPassword" label="New Password" />
			<PasswordField form={form} name="reNewPassword" label="Confirm New Password" />

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

export default ChangePasswordForm;
