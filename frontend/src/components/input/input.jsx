import styled from 'styled-components';
import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const InputContainer = forwardRef(({ className, width, ...props }, ref) => {
	return <input className={className} {...props} ref={ref} />;
});

export const Input = styled(InputContainer)`
	width: ${({ width = '100%' }) => width};
	height: 40px;
	margin: 0 0 10px 0;
	padding: 10px;
	border: 1px solid #000;
	font-size: 18px;
`;
Input.propTypes = {
	width: PropTypes.string,
};
