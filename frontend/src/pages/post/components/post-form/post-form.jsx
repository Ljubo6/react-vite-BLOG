import styled from 'styled-components';
import { H2, Icon, Input } from '../../../../components/index.js';
import { SpecialPanel } from '../special-panel/special-panel.jsx';
import { useLayoutEffect, useRef, useState } from 'react';
import { sanitizeContent } from './utils/index.js';
import { useDispatch } from 'react-redux';
import { savePostAsync } from '../../../../actions/index.js';
import { useNavigate } from 'react-router-dom';
import { PROP_TYPE } from '../../../../constants/index.js';

const PostFormContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titleValue, setTitleValue] = useState(title);
	const contentRef = useRef(null);
	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitleValue(title);
	}, [imageUrl, title]);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(id,{
				imageUrl: imageUrlValue,
				title: titleValue,
				content: newContent,
			}),
		).then(({ id }) => navigate(`/post/${id}`));
	};
	const onImageChange = ({ target }) => setImageUrlValue(target.value);
	const onTitleChange = ({ target }) => setTitleValue(target.value);

	return (
		<div className={className}>
			<Input
				value={imageUrlValue}
				placeholder="Image..."
				onChange={onImageChange}
			/>
			<Input value={titleValue} placeholder="Title..." onChange={onTitleChange} />
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="20px 0"
				editButton={
					<Icon
						id="fa-floppy-o"
						size="21px"
						margin="0 10px 0 0"
						onClick={onSave}
					/>
				}
			/>
			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="post-text"
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .post-text {
		min-height: 80px;
		border: 1px solid #000;
		font-size: 18px;
		white-space: pre-line;
	}
`;
PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
