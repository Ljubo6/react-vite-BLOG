import styled from 'styled-components';
import { Button } from '../button/button.jsx';
import { useSelector } from 'react-redux';
import {
	selectModalIsOpen,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalText,
} from '../../selectors/index.js';

const ModalContainer = ({ className }) => {
	const isOpen = useSelector(selectModalIsOpen);
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);

	if (!isOpen) {
		return null;
	}
	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="box">
				<h3>{text}</h3>
				<div className="buttons">
					<Button width="120px" onClick={onConfirm}>
						Yes
					</Button>
					<Button width="120px" onClick={onCancel}>
						Cancel
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	z-index: 20;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;

	& .overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
	}

	& .box {
		width: 400px;
		margin: 0 auto;
		padding: 0 20px 20px;
		text-align: center;
		z-index: 30;
		position: relative;
		top: 50%;
		transform: translate(0, -50%);
		background-color: #fff;
		border: 3px solid #000;
	}

	& .buttons {
		display: flex;
		justify-content: center;
	}

	& .buttons button {
		margin: 0 5px;
	}
`;
