import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from '../../../../components';

// const IconContainer = ({ className }) => (
// 	<div className={className}>
// 		<i className="fa fa-code" aria-hidden="true"></i>
// 	</div>
// );

// const Icon = styled(IconContainer)`
// 	font-size: 70px;
// 	margin-outside: 10px;
// `;

const LargeText = styled.div`
	font-size: 48px;
	font-weight: 600;
	line-height: 48px;
	margin-top: 17px;
`;
const SmallText = styled.div`
	font-size: 18px;
	font-weight: bold;
`;

export const LogoContainer = ({ className }) => (
	<Link className={className} to="/">
		<Icon id="fa-code" size="70px" margin="0 10px 0 0"></Icon>
		<div>
			<LargeText>Blog</LargeText>
			<SmallText>for web-developer's</SmallText>
		</div>
	</Link>
);

export const Logo = styled(LogoContainer)`
	display: flex;
	margin-top: -21px;
`;
