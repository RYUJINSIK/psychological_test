import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/Router';
import ProgressBar from '../components/ProgressBar';
import 'semantic-ui-css/semantic.min.css';
import { Button, Card, Popup, Confirm, Message, Icon } from 'semantic-ui-react';

const examExample = () => {
	const router = useRouter();
	const [a1Color, setA1Color] = useState('white');
	const [a2Color, setA2Color] = useState('white');
	const [nextVal, setNextVal] = useState(false);
	const [confirm, setConfirm] = useState(false);

	const user = JSON.parse(localStorage.getItem('userData'));

	const onClickAnswer = (e) => {
		if (e.target.value === 'a1') {
			setA1Color('blue');
			setA2Color('white');
			setNextVal(true);
		} else if (e.target.value === 'a2') {
			setA2Color('green');
			setA1Color('white');
			setNextVal(true);
		}
	};

	const confirmToggle = (e) => {
		if (confirm === true) {
			setConfirm(false);
		} else {
			setConfirm(true);
		}
	};
	const onSubmitAction = (e) => {
		router.push('/examProgress');
	};

	const wrapper = {
		padding: '20px',
		justifyContent: 'center',
		alignItems: 'flex-start',
		minHeight: '100vh',
		display: 'flex',
	};
	const mainDiv = {
		width: '70%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	};

	const cardStyle = {
		width: '100%',
		fontSize: '1.3em',
		alignItems: 'center',
	};
	const popupBtn = {
		width: '20px',
		height: '20px',
	};
	const confirmBtn = {
		width: '400px',
		fontSize: '1.3em',
	};

	const info = [
		'직업과 관련된 두개의 가치 중에서 자기에게 더 중요한 가치에 표시하세요.',
		'가치의 뜻을 잘 모르겠다면 문항옆  [ ? ]  아이콘에 있는가치의 설명을 확인하고 하나를  선택해주세요.',
	];
	return (
		<div style={wrapper}>
			<div style={mainDiv}>
				<ProgressBar message="검사예시" percent={0} />
				<Message
					info
					icon="bullhorn"
					header="[검사예시] 페이지 입니다."
					list={info}
				/>
				<Card style={cardStyle}>
					<Card.Content>
						<Card.Description>
							Q1. 두 개 가치 중에 자신에게 더 중요한 가치를 선택하세요.
						</Card.Description>
					</Card.Content>
					<Card.Content extra>
						<Button
							color={a1Color}
							size="large"
							name="a1"
							value="a1"
							onClick={onClickAnswer}
						>
							능력발휘 &nbsp;&nbsp;
							<Popup
								content="직업을 통해 자신의 능력을 발휘하는 것입니다."
								trigger={<img src="/images/question.png" style={popupBtn} />}
							/>
						</Button>

						<Button
							color={a2Color}
							size="large"
							name="a2"
							value="a2"
							onClick={onClickAnswer}
						>
							자율성 &nbsp;&nbsp;
							<Popup
								content="일하는 시간과 방식에 대해서 스스로 결정할 수 있는 것입니다."
								trigger={<img src="/images/question.png" style={popupBtn} />}
							/>
						</Button>
					</Card.Content>
				</Card>

				<Button
					style={{ backgroundColor: '#d6d2ff' }}
					animated
					onClick={confirmToggle}
					type="submit"
					size="huge"
					disabled={nextVal ? false : true}
					// onClick={onSubmitAction} // Confirm 에러로 임시활성화
				>
					<Button.Content visible>검사시작</Button.Content>
					<Button.Content hidden>
						<Icon name="arrow right" />
					</Button.Content>
				</Button>
				<Confirm
					open={confirm}
					content={`성별 : ${
						user.gender === '100323' ? '남자' : '여자'
					} / 이름 : ${user.name} 님 검사를 시작합니다`}
					confirmButton="검사시작"
					cancelButton="취소"
					onCancel={confirmToggle}
					value="cancel"
					onConfirm={onSubmitAction}
				/>
			</div>
		</div>
	);
};

export default examExample;
