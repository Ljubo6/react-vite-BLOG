import styled from 'styled-components';
import { Icon, Input } from '../../../../components/index.js';
import PropTypes from 'prop-types';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				placeholder="Search by title..."
				onChange={onChange}
			/>
			<Icon inactive={true} id="fa-search" size="21px" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	position: relative;
	width: 330px;
	height: 40px;
	margin: 40px auto 0;

	& > input {
		padding: 10px 32px 10px 10px;
	}

	& > div {
		position: absolute;
		top: 9px;
		right: 9px;
	}
`;
Search.propTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
