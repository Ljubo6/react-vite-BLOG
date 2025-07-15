import { ControlPanel, Logo } from './components/index.js';
import styled from 'styled-components';

const Discription = styled.div`
	font-style: italic;
`;

const HeaderContainer = ({ className }) => {
	return (
		<header className={className}>
			<Logo></Logo>
			<Discription>
				Web technologies
				<br /> Code writing
				<br /> Error analysis
			</Discription>
			<ControlPanel></ControlPanel>
		</header>
	);
};
export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	position: fixed;
	top: 0;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	background-color: #fff;
	box-shadow: 0px -2px 17px #000;
	z-index: 10;
`;
