import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/Router';
import ProgressBar from '../components/ProgressBar';
import { Grid, Image } from 'semantic-ui-react';

const examExample = () => {
	const wrapper = {
		padding: '30px',
	};

	return (
		<div style={wrapper}>
			<ProgressBar message="검사진행" percent={0} />
		</div>
	);
};

export default examExample;
