import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'semantic-ui-css/semantic.min.css';
import { Button, Icon, Input, Popup } from 'semantic-ui-react';

const Finish = () => {
	const router = useRouter();
	const onSubmitAction = (e) => {
		router.push('/examResult');
	};

	const wrapper = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: '100vh',
	};
	const mainDiv = {
		padding: '30px',
		width: '700px',
		border: '1px solid #8f8377',
		borderRadius: '10px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F7FEFF',
	};

	const startBtnColor = {
		backgroundColor: '#d6d2ff',
	};

	return (
		<div style={wrapper}>
			<div style={mainDiv}>
				<h1>검사가 완료되었습니다. &nbsp;&nbsp;</h1>
				<br />
				<p>
					검사결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게
					생각하는지를 알려주고,
					<br />
					중요 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를
					제공합니다.
				</p>
				<br />
				<Button
					style={startBtnColor}
					animated
					onClick={onSubmitAction}
					type="submit"
				>
					<Button.Content visible>결과보기</Button.Content>
					<Button.Content hidden>
						<Icon name="arrow right" />
					</Button.Content>
				</Button>
			</div>
		</div>
	);
};

export default Finish;
