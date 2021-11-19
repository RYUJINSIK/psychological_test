import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/Router';
import 'semantic-ui-css/semantic.min.css';
import { Button, Icon, Input, Popup } from 'semantic-ui-react';

const Index = () => {
	const router = useRouter();
	const [maleColor, setMaleColor] = useState('white');
	const [femaleColor, setFemaleColor] = useState('white');
	const [user, setUser] = useState({
		name: '',
		gender: '',
	});

	const onChangeAction = (e) => {
		if (e.type === 'click') {
			if (e.target.value === 'male') {
				setMaleColor('blue');
				setFemaleColor('white');
			} else {
				setFemaleColor('red');
				setMaleColor('white');
			}
		}

		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const onSubmitAction = (e) => {
		const regex = /^[가-힣|a-z|A-Z|]+$/; //정규식
		e.preventDefault();

		if (regex.test(user.name.replace(' ', ''))) {
			localStorage.setItem('userData', JSON.stringify(user));
			router.push('/examExample');
		} else {
			alert('이름을 정확하게 입력해주세요.');
		}
	};

	// useEffect(() => {
	//   console.log(user)
	// },[user])

	const wrapper = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: '100vh',
	};
	const mainDiv = {
		padding: '30px',
		width: '400px',
		border: '1px solid #8f8377',
		borderRadius: '10px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	};

	const startBtnColor = {
		backgroundColor: '#d6d2ff',
	};

	return (
		<div style={wrapper}>
			<div style={mainDiv}>
				<h1>직업가치관검사</h1>
				<br />
				<Input
					placeholder="이름을 입력하세요"
					type="text"
					name="name"
					value={user.name}
					onChange={onChangeAction}
				/>
				<br />

				<Button.Group>
					<Button
						color={maleColor}
						name="gender"
						value="male"
						onClick={onChangeAction}
					>
						남성
					</Button>
					<Button.Or />
					<Button
						color={femaleColor}
						name="gender"
						value="female"
						onClick={onChangeAction}
					>
						여성
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
