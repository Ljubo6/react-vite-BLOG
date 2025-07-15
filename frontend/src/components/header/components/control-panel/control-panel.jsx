import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button, Icon } from '../../../../components';
import {
	selectUserRole,
	selectUserLogin,
} from '../../../../selectors/index.js';
import { ROLE } from '../../../../constants/index.js';
import { logout } from '../../../../actions/index.js';
import { checkAccess } from '../../../../utils/index.js';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

const UserName = styled.div`
	font-size: 18px;
	font-weight: bold;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
	};
	const isAdmin = checkAccess([ROLE.ADMIN], roleId);
	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/login">Login</Link>
					</Button>
				) : (
					<>
						<UserName>{login}</UserName>
						<Icon
							id="fa-sign-out"
							margin="0 0 0 10px"
							onClick={onLogout}
						></Icon>
					</>
				)}
			</RightAligned>
			<RightAligned>
				<Icon
					id="fa-backward"
					margin="10px 0 0 0"
					onClick={() => navigate(-1)}
				></Icon>
				{isAdmin && (
					<>
						<Link to="/post">
							<Icon id="fa-file-text-o" margin="10px 0 0 16px"></Icon>
						</Link>
						<Link to="/users">
							<Icon id="fa-users" margin="10px 0 0 16px"></Icon>
						</Link>
					</>
				)}
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)``;
