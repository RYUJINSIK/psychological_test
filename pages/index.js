import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'semantic-ui-css/semantic.min.css';
import { Button, Icon, Input, Label } from 'semantic-ui-react';

const Index = () => {
	const router = useRouter();
	const [maleColor, setMaleColor] = useState('white');
	const [femaleColor, setFemaleColor] = useState('white');
	const [labelVal, setLabelVal] = useState('none');

	const [user, setUser] = useState({
		name: '',
		gender: '',
		date: new Date().getTime(),
	});

	const onChangeAction = (e) => {
		if (e.type === 'click') {
			if (e.target.value === '100323') {
				setMaleColor('blue');
				setFemaleColor('white');
			} else if (e.target.value === '100324') {
				setFemaleColor('red');
				setMaleColor('white');
			}
		}

		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
		setLabelVal('none');
	};

	const onSubmitAction = (e) => {
		const regex = /^[가-힣|a-z|A-Z|]+$/; //정규식

		if (regex.test(user.name.replace(' ', ''))) {
			localStorage.setItem('userData', JSON.stringify(user));
			router.push('/examExample');
		} else {
			setLabelVal('block');
		}
	};

	const wrapper = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: '100vh',
	};
	const mainDiv = {
		padding: '30px',
		width: '500px',
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

	const testIcon = {
		marginBottom: '-8px',
		width: '35px',
		height: '35px',
	};

	return (
		<div style={wrapper}>
			<div style={mainDiv}>
				<h1>
					직업가치관검사 &nbsp;&nbsp;
					<img src="/images/test.png" style={testIcon} />
				</h1>
				<br />
				<Input
					placeholder="이름을 입력하세요"
					type="text"
					name="name"
					value={user.name}
					onChange={onChangeAction}
				/>
				<Label basic color="red" pointing style={{ display: labelVal }}>
					<Icon name="warning circle" />
					이름을 정확하게 입력해주세요.
				</Label>
				<br />

				<Button.Group>
					<Button
						color={maleColor}
						name="gender"
						value="100323"
						onClick={onChangeAction}
					>
						남성 &nbsp;&nbsp;
						<Icon name="male" />
					</Button>
					<Button.Or />
					<Button
						color={femaleColor}
						name="gender"
						value="100324"
						onClick={onChangeAction}
					>
						여성 &nbsp;&nbsp;
						<Icon name="female" />
					</Button>
				</Button.Group>
				<br />
				<Button
					style={startBtnColor}
					animated
					onClick={onSubmitAction}
					type="submit"
					disabled={user.name && user.gender ? false : true}
				>
					<Button.Content visible>검사시작</Button.Content>
					<Button.Content hidden>
						<Icon name="arrow right" />
					</Button.Content>
				</Button>
			</div>
		</div>
	);
};

export default Index;
