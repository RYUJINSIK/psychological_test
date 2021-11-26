import React, { useState, useEffect } from 'react';
import { Grid, Progress } from 'semantic-ui-react';

const ProgressBarForm = ({ message, percent }) => {
	// FIXME:
	// 1. 프로그래스 바 css 확인 ( % 표시, 바 높이 )		[ ]

	return (
		<Grid celled="internally">
			<h1>{message}</h1>
			<Grid.Row>
				<Grid.Column width={16}>
					<Progress size="large" indicating percent={percent} progress />
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

export default ProgressBarForm;
