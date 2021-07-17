import React from 'react';
import RegisterForm from '../Components/RegisterForm/RegisterForm';

function RegisterPage(props) {
	const handleSubmit = (values) => {
		console.log(values);
	};

	return (
		<div className="registerPage">
			<RegisterForm onSubmit={handleSubmit} />
		</div>
	);
}

export default RegisterPage;
