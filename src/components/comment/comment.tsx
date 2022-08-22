import React, { useState } from "react";
import styled from "styled-components";
import { CommentProps } from "../../types";

export default function Comment({
	comment,
	card,
	deleteComment,
	updateComment,
}: CommentProps) {
	let [textField, setTextField] = useState(comment.text);

	const deleteHandler = (id: string) => {
		deleteComment(card, id);
	};

	const changeHandler = (event: { target: HTMLInputElement }) => {
		setTextField(() => event.target.value);
	};

	const blurHandler = () => {
		updateComment(card, comment.id, textField);
	};

	return (
		<CommentField>
			<HeadContainer>
				<Author>{comment.author}</Author>
				<Delete onClick={() => deleteHandler(comment.id)}>X</Delete>
			</HeadContainer>
			<CommentInput
				value={textField}
				onChange={changeHandler}
				onBlur={blurHandler}
			/>
		</CommentField>
	);
}

const CommentField = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 10px;
	margin-left: 10px;
	border-bottom: 1px solid gray;
`;

const Author = styled.h4`
	margin-top: 0;
	margin-bottom: 0;
`;

const Delete = styled.button`
	margin-right: 10px;
	cursor: pointer;
`;

const HeadContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const CommentInput = styled.input`
	height: 40px;
	border: 0px;
	background-color: transparent;
`;
