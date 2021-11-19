import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/Router';
import ProgressBar from '../components/ProgressBar';
import 'semantic-ui-css/semantic.min.css';
import { Button, Card, Grid } from 'semantic-ui-react';

const examExample = () => {
	const wrapper = {
		padding: '30px',
	};

	const cardStyle = {
		width: '100%',
		fontSize: '1.5em',
	};

	return (
		<div style={wrapper}>
			<ProgressBar message="검사예시" percent={0} />

			<Card style={cardStyle}>
				<Card.Content>
					<Card.Description>
						Steve wants to add you to the group <strong>best friends</strong>
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<Button basic color="green" size="big">
						Approve
					</Button>
					<Button basic color="blue" size="big">
						Decline
					</Button>
				</Card.Content>
			</Card>
			<Button
				size="big"
				floated="left"
				content="이전"
				icon="left arrow"
				labelPosition="left"
			/>
			<Button
				size="big"
				floated="right"
				content="다음"
				icon="right arrow"
				labelPosition="right"
			/>
		</div>
	);
};

export default examExample;
