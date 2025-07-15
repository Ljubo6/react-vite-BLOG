import { H2 } from '../h2/h2.jsx';
import styled from 'styled-components';
import { PROP_TYPE } from '../../constants/index.js';

const Div = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	font-size: 18px;
`;

export const Error = ({ error }) =>
	error && (
		<Div>
			<H2>Error</H2>
			<div>{error}</div>
		</Div>
	);

Error.PropTypes = {
	error: PROP_TYPE.ERROR,
};
