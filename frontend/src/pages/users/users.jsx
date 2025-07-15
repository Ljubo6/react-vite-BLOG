import styled from 'styled-components';
import { PrivateContent, H2 } from '../../components/index.js';
import { UserRow, TableRow } from './components/index.js';
import { useEffect, useState } from 'react';
import { ROLE } from '../../constants/index.js';
import { checkAccess, request } from '../../utils/index.js';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors/index.js';

const UserContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
	const userRole = useSelector(selectUserRole);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}
		Promise.all([request('/users'),request(`/users/roles`)]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}

				setUsers(usersRes.data);
				setRoles(rolesRes.data);
			},
		);
	}, [shouldUpdateUserList, userRole]);
	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}
		request(`/users/${userId}`,'DELETE').then(() => {
			setShouldUpdateUserList(!shouldUpdateUserList);
		});
	};
	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
			<div className={className}>
				<H2>Users</H2>
				<div>
					<TableRow>
						<div className="login-column">Login</div>
						<div className="registered-at-column">Register date</div>
						<div className="role-column">Role</div>
					</TableRow>

					{users.map(({ id, login, registeredAt, roleId }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							registeredAt={registeredAt}
							roleId={roleId}
							roles={roles.filter(
								({ id: roleId }) => roleId !== ROLE.GUEST,
							)}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</div>
			</div>
		</PrivateContent>
	);
};
export const Users = styled(UserContainer)`
	display: flex;
	margin: 0 auto;
	align-items: center;
	flex-direction: column;
	width: 570px;
	font-size: 18px;
`;
