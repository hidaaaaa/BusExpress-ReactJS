import { Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import InputField from 'components/InputField/InputField';
import RadioField from 'components/RadioField';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function InformationForm({ information, handleSubmit }) {
	const [visible, setVisible] = useState(false);
	const form = useForm({
		defaultValues: {
			TenKH: information.TenKH,
			SDT: information.SDT,
			DiaChi: information.DiaChi,
			GioiTinh: information.GioiTinh === 'Nữ',
		},
	});

	const showModal = () => {
		setVisible(true);
	};

	const handleCancel = () => {
		setVisible(false);
	};

	const handleSubmitClick = async (values) => {
		values.GioiTinh = values.GioiTinh ? 'Nữ' : 'Nam';

		values = { SLGhe: information.SLGhe, ...values };
		if (handleSubmit) {
			setVisible(false);
			handleSubmit(values);
		}
	};
	return (
		<>
			<Button type="primary" onClick={showModal}>
				Change
			</Button>
			<Modal
				title={`Change information Ticket ${information.tag}`}
				visible={visible}
				onCancel={handleCancel}
				footer={null}
			>
				<form onSubmit={form.handleSubmit(handleSubmitClick)}>
					<InputField form={form} name="TenKH" label="name" defaultValue={information.TenKH} />

					<InputField form={form} name="SDT" label="phone" defaultValue={information.SDT} />

					<InputField form={form} name="DiaChi" label="address" defaultValue={information.DiaChi} />

					<RadioField form={form} name="GioiTinh" label="Sex" defaultValue={information.GioiTinh === 'Nữ'} />

					<button className="button__confirm" type="submit">
						Change ticket {information.tag}
					</button>
				</form>
			</Modal>
		</>
	);
}

export default InformationForm;
