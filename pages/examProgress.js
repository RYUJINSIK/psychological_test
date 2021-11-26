import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/Router';
import ProgressBar from '../components/ProgressBar';
import 'semantic-ui-css/semantic.min.css';
import { Button, Card, Popup } from 'semantic-ui-react';
import axios from 'axios';
import { allowedStatusCodes } from 'next/dist/lib/load-custom-routes';

const examExample = () => {
	const router = useRouter();
	const [question, setQuestion] = useState([]);
	const [lastKey, setLastKey] = useState('');
	const [startNum, setStartNum] = useState(1);
	const [endNum, setEndNum] = useState(5);
	const [percent, setPercent] = useState({});
	const [answer, setAnswer] = useState({});

	const [nextKey, setNextKey] = useState(false);
	const [endKey, setEndKey] = useState(false);
	const [visibleNext, setVisibleNext] = useState('block');
	const [visibleEnd, setVisibleEnd] = useState('none');

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

	let perVal = 100 / question.length;
	perVal = parseFloat(
		(Math.round((perVal + Number.EPSILON) * 100) / 100).toFixed(2),
	);

	useEffect(() => {
		readQuestion();
	}, []);

	const onClickBtnType = (e) => {
		if (e.target.value === 'next') {
			if (endNum >= question.length) {
			} else {
				setStartNum(startNum + 5);
				setEndNum(endNum + 5);
			}
			setNextKey(false);
		} else if (e.target.value === 'prev') {
			if (startNum !== 1) {
				setStartNum(startNum - 5);
				setEndNum(endNum - 5);
			}
			setNextKey(true);
		} else if (e.target.value === 'end') {
			localStorage.setItem('answerData', JSON.stringify(answer));
			router.push('/examFinish');
		}
	};

	const onClickAnswer = useCallback(
		(id, _key, e) => {
			setLastKey(`${id}_${_key}`);

			setQuestion((question) =>
				question.map((data) =>
					data.qitemNo === id
						? {
								...data,
								[`${id}_${_key}`]: true,
								[`${id}_percent`]: true,
						  }
						: { ...data, [`${id}_${_key}`]: false, [`${id}_percent`]: false },
				),
			);

			setPercent({ ...percent, [id]: perVal });
			setAnswer({
				...answer,
				[id]:
					_key === 'leftAnswer' ? `B${id}=${id * 2 - 1}` : `B${id}=${2 * id}`,
			});
		},
		[question],
	);

	useEffect(() => {
		if (endNum === 30) {
			setVisibleEnd('block');
			setVisibleNext('none');
		} else {
			setVisibleEnd('none');
			setVisibleNext('block');
		}
	}, [endNum]);

	useEffect(() => {
		if (Object.values(percent).length === question.length) {
			setEndKey(true);
		}
	}, [percent]);

	useEffect(() => {
		const unAnswer = {
			leftAnswer: 'rightAnswer',
			rightAnswer: 'leftAnswer',
		};
		const [id, key] = lastKey.split('_');
		setQuestion(
			question.map((data) =>
				data[lastKey]
					? {
							...data,
							[`${id}_${unAnswer[key]}`]: false,
					  }
					: { ...data },
			),
		);
		question.map((data) => {
			if (
				[17, 35, 53, 71, 89].includes(
					Math.floor(
						Object.values(percent).reduce((_i, _value) => _i + _value, 0),
					),
				)
			) {
				setNextKey(true);
			}
		});
	}, [lastKey]);

	const cardStyle = {
		width: '100%',
		fontSize: '1.2em',
		alignItems: 'center',
		margin: '0.4em 0',
	};

	const popupBtn = {
		width: '20px',
		height: '20px',
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

	if (endNum === 30) {
		displayNextBtn = {
			display: 'none',
		};
	}
	const displayNextBtn = {
		display: visibleNext,
		backgroundColor: '#d6d2ff',
	};
	const displayEndBtn = {
		display: visibleEnd,
		backgroundColor: '#d6d2ff',
	};

	return (
		<div style={wrapper}>
			<div style={mainDiv}>
				<ProgressBar
					message="검사진행"
					percent={
						Object.values(percent).length &&
						Math.floor(
							Object.values(percent).reduce(
								(_i, _value) => (_i + _value > 99 ? 100 : _i + _value),
								0,
							),
						)
					}
				/>
				{question.length &&
					question.map((data) => {
						if (data.qitemNo >= startNum && data.qitemNo <= endNum) {
							return (
								<Card key={data.qitemNo} style={cardStyle}>
									<Card.Content>
										<Card.Description>
											Q{data.qitemNo}. {data.question}
										</Card.Description>
									</Card.Content>
									<Card.Content extra>
										<Button
											color={
												data[`${data.qitemNo}_leftAnswer`] ? 'blue' : 'white'
											}
											size="small"
											onClick={() =>
												onClickAnswer(data.qitemNo, 'leftAnswer', event)
											}
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
											color={
												data[`${data.qitemNo}_rightAnswer`] ? 'blue' : 'white'
											}
											size="small"
											onClick={() =>
												onClickAnswer(data.qitemNo, 'rightAnswer', event)
											}
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
							);
						}
					})}
				<div style={{ width: '100%' }}>
					<Button
						size="big"
						floated="left"
						content="이전"
						style={{ backgroundColor: '#d6d2ff' }}
						disabled={startNum === 1 ? true : false}
						icon="left arrow"
						labelPosition="left"
						value="prev"
						onClick={onClickBtnType}
					/>
					<Button
						size="big"
						floated="right"
						content="다음"
						style={displayNextBtn}
						disabled={nextKey ? false : true}
						icon="right arrow"
						labelPosition="right"
						value="next"
						onClick={onClickBtnType}
					/>
					<Button
						size="big"
						floated="right"
						content="검사종료"
						display="none"
						style={displayEndBtn}
						icon="check circle outline"
						labelPosition="right"
						value="end"
						disabled={Object.values(answer).length === 28 ? false : true}
						onClick={onClickBtnType}
					/>
				</div>
			</div>
		</div>
	);
};

export default examExample;
