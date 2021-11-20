import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/Router';
import ProgressBar from '../components/ProgressBar';
import 'semantic-ui-css/semantic.min.css';
import { Button, Card, Popup } from 'semantic-ui-react';
import axios from 'axios';

const examExample = () => {
	const [question, setQuestion] = useState([]);

	const readQuestion = async () => {
		const response = await axios(
			'https://www.career.go.kr/inspct/openapi/test/questions',
			{
				params: {
					apikey: 'd5e325d9aa4d7bf73c995f0ea0568d31',
					q: 6,
				},
			},
		);
		setQuestion(response.data.RESULT);
	};
	useEffect(() => {
		readQuestion();
	}, []);

	useEffect(() => {
		console.log(question);
	}, [question]);

	const cardStyle = {
		width: '100%',
		fontSize: '1.3em',
		alignItems: 'center',
	};
	const popupBtn = {
		width: '20px',
		height: '20px',
	};
	const wrapper = {
		padding: '50px',
		justifyContent: 'center',
		alignItems: 'flex-start',
		minHeight: '100vh',
		display: 'flex',
	};
	const mainDiv = {
		width: '80%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	};
	return (
		<div style={wrapper}>
			<div style={mainDiv}>
				<ProgressBar message="검사진행" percent={0} />
				{question.length &&
					question.map((data) => (
						<Card key={data.qitemNo} style={cardStyle}>
							<Card.Content>
								<Card.Description>
									Q{data.qitemNo}. {data.question}
								</Card.Description>
							</Card.Content>
							<Card.Content extra>
								<Button
									color="blue"
									size="large"
									name="a1"
									value="a1"
									// onClick={onClickAnswer}
								>
									{data.answer01} &nbsp;&nbsp;
									<Popup
										content={data.answer03}
										trigger={
											<img src="/images/question.png" style={popupBtn} />
										}
									/>
								</Button>

								<Button
									color="green"
									size="large"
									name="a2"
									value="a2"
									// onClick={onClickAnswer}
								>
									{data.answer02} &nbsp;&nbsp;
									<Popup
										content={data.answer04}
										trigger={
											<img src="/images/question.png" style={popupBtn} />
										}
									/>
								</Button>
							</Card.Content>
						</Card>
					))}
				<div style={{ width: '100%' }}>
					<Button
						size="big"
						floated="left"
						content="이전"
						style={{ backgroundColor: '#FFF5E4' }}
						icon="left arrow"
						labelPosition="left"
					/>
					<Button
						size="big"
						floated="right"
						content="다음"
						style={{ backgroundColor: '#FFF5E4' }}
						icon="right arrow"
						labelPosition="right"
					/>
				</div>
			</div>
		</div>
	);
};

export default examExample;
