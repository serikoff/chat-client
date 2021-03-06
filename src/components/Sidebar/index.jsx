import React from 'react';
import { Icon, Button, Modal, Select, Input } from 'antd';
import { Dialogs } from 'containers';

import './Sidebar.scss';

const Sidebar = ({
	user: { _id, fullname },
	users,
	visible,
	usersInputValue,
	messageText,
	selectedUser,
	isLoading,
	onShowModal,
	onCreateDialog,
	onCancel,
	onChangeUsersInput,
	onChangeMessageText,
	onSearch,
	onSelectUser,
}) => {
	const options = users.map(({ _id, fullname, email }) => (
		<Select.Option key={_id}>{`${fullname} : ${email}`}</Select.Option>
	));

	return (
		<div className="chat__sidebar">
			<div className="chat__sidebar-header">
				<div>
					<Icon type="team" />
					<span>Список диалогов</span>
				</div>
				<Button onClick={onShowModal} type="ghost" shape="circle" icon="form" />
			</div>
			<Dialogs />
			<Modal
				title="Создание диалога"
				visible={visible}
				okButtonProps={{ disabled: messageText === '' || selectedUser === '' }}
				onOk={onCreateDialog}
				onCancel={onCancel}
				okText="Создать диалог"
				cancelText="Отменить"
				confirmLoading={isLoading}>
				<Select
					value={
						usersInputValue === ''
							? 'Введите имя пользователя или E-Mail'
							: usersInputValue
					}
					onSearch={onSearch}
					onChange={onChangeUsersInput}
					onSelect={onSelectUser}
					notFoundContent={null}
					style={{ width: '100%', opacity: usersInputValue === '' ? '0.5' : '1' }}
					defaultActiveFirstOption={false}
					showArrow={false}
					filterOption={false}
					showSearch>
					{options}
				</Select>
				<br />
				<br />
				{selectedUser !== '' && (
					<Input.TextArea
						onChange={onChangeMessageText}
						placeholder="Введите сообщение"
						autoSize={{ minRows: 2, maxRows: 6 }}
						value={messageText}
					/>
				)}
			</Modal>
		</div>
	);
};

export default Sidebar;
