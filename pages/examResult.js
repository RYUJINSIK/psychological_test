import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/Router';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import {
	Button,
	Icon,
	Label,
	Message,
	Table,
	Segment,
} from 'semantic-ui-react';
import { CategoryScale } from 'chart.js';

Chart.register(CategoryScale);

const Result = () => {
	const router = useRouter();

	let user = {};
	let parseAnswer = {};
	if (typeof window !== 'undefined') {
		user = JSON.parse(localStorage.getItem('userData'));
		parseAnswer = JSON.parse(localStorage.getItem('answerData'));
	}

	const [result, setResult] = useState();
	const [jobResult, setJobResult] = useState();
	const [majorResult, setMajorResult] = useState();
	const [examResult, setExamResult] = useState({});
	const [init, setInit] = useState(false);
	const [chartData, setChartData] = useState({
		labels: [
			'능력발휘',
			'자율성',
			'보수',
			'안정성',
			'사회적 인정',
			'사회봉사',
			'자기계발',
			'창의성',
		],
		datasets: [
			{
				label: '직업가치관 결과',
				backgroundColor: '#f0f8ff',
				borderColor: '#01a1ec',
				borderWidth: 1,
				data: [],
			},
		],
	});

	const questionInfo = {
		1: '능력발휘',
		2: '자율성',
		3: '보수',
		4: '안정성',
		5: '사회적 인정',
		6: '사회봉사',
		7: '자기계발',
		8: '창의성',
	};

	const postQuestion = async (user, answer) => {
		axios
			.post(
				'http://www.career.go.kr/inspct/openapi/test/report',
				{
					apikey: 'd5e325d9aa4d7bf73c995f0ea0568d31', // apiKey
					qestrnSeq: 6, // 검사번호 : (6)직업가치관검사
					trgetSe: 100209, // 대상 변수 (일반)
					name: user.name, // 이름
					gender: user.gender, // 성별
					startDtm: user.date, // 검사일자
					answers: answer, // 답변
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			)
			.then(({ data }) => {
				console.log(data.RESULT);
				setExamResult(data.RESULT);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		let text = '';
		Object.values(parseAnswer).map((data) => {
			text += `${data} `;
		});
		postQuestion(user, text);
	}, []);

	useEffect(() => {
		if (examResult.url !== undefined) {
			console.log('in');
			dataSetting();
		}
	}, [examResult]);

	const dataSetting = async () => {
		const seq = examResult.url.split('=')[1];
		console.log(seq);

		const { data } = await axios.get(
			`https://www.career.go.kr/inspct/api/psycho/report?seq=${seq}`,
		);

		const score = data.result.wonScore.split(' ').filter((x) => x);

		const scoreResult = score.map((x) => {
			const split_data = x.split('=');
			return { num: split_data[0], value: parseInt(split_data[1]) };
		});

		setChartData(() => {
			let chartVal = { ...chartData };
			chartVal.datasets[0].data = scoreResult.map((x) => {
				return x.value;
			});
			return chartVal;
		});

		const filterNumber = scoreResult
			.filter(
				(arr, index, callback) =>
					index === callback.findIndex((t) => t.value === arr.value),
			)
			.sort((a, b) => b.value - a.value);

		setResult(filterNumber);
		console.log(filterNumber);
		const [value1, value2] = [filterNumber[0].num, filterNumber[1].num];

		const jobList = await axios.get(
			`https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${value1}&no2=${value2}`,
		);
		const majorList = await axios.get(
			`https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=${value1}&no2=${value2}`,
		);

		setJobResult(() => {
			const jobObject = { 1: [], 2: [], 3: [], 4: [], 5: [] };
			console.log(jobList.data);
			jobList.data.forEach((nowArr) => {
				jobObject[nowArr[2]].push(nowArr[1]);
			});
			return jobObject;
		});
		console.log(jobResult);
		setMajorResult(() => {
			const majorObject = {
				0: [],
				1: [],
				2: [],
				3: [],
				4: [],
				5: [],
				6: [],
				7: [],
			};
			majorList.data.forEach((nowArr) => {
				if (nowArr[2] !== 0) {
					majorObject[0].push(nowArr[1]);
				}
				majorObject[nowArr[2]].push(nowArr[1]);
			});
			return majorObject;
		});
		setInit(true);
	};

	const onSubmitAction = (e) => {
		localStorage.clear();
		router.push('/');
	};

	const wrapper = {
		padding: '20px',
		justifyContent: 'center',
		alignItems: 'flex-start',
		minHeight: '100vh',
		display: 'flex',
	};

	const mainDiv = {
		width: '50%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	};

	const ribbon = {
		backgroundColor: '#e6e6fa',
	};

	const tHeader = {
		backgroundColor: '#f0f8ff',
	};

	const startBtnColor = {
		backgroundColor: '#d6d2ff',
	};

	if (init) {
		return (
			<div style={wrapper}>
				<div style={mainDiv}>
					<h1>직업가치관검사 결과표</h1>
					<Table celled>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell style={tHeader}>이름</Table.HeaderCell>
								<Table.HeaderCell style={tHeader}>성별</Table.HeaderCell>
								<Table.HeaderCell style={tHeader}>검사일</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							<Table.Row>
								<Table.Cell>{user.name}</Table.Cell>
								<Table.Cell>
									{user.gender === '100323' ? '남자' : '여자'}
								</Table.Cell>
								<Table.Cell>
									{new Date().toLocaleString('kor').slice(0, 14)}
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>

					<h2>직업가치관결과</h2>

					<Table celled>
						<p>
							<br />
							{'  '}직업생활과 관련하여{user.name}님은{' '}
							{questionInfo[result[0].num]}
							(와)과 {questionInfo[result[1].num]}(을)를 가장 중요하게
							생각합니다.
							<br />
							<br />
							{'  '}반면에 {questionInfo[result[result.length - 1].num]},{' '}
							{questionInfo[result[result.length - 2].num]}은 상대적으로 덜
							중요하게 생각합니다.
							<br />
							<br />
						</p>
					</Table>

					<Bar
						data={chartData}
						width={'100px'}
						height={'50px'}
						options={{
							maintainAspectRatio: true,
						}}
					/>

					<h2>가치관과 관련이 높은 직업</h2>

					<Table celled>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell colSpan="2">
									<Message info header="종사자 평균 학력별" />
								</Table.HeaderCell>
							</Table.Row>
							<Table.Row>
								<Table.HeaderCell style={tHeader}>분야</Table.HeaderCell>
								<Table.HeaderCell style={tHeader}>직업</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							{jobResult[1].length !== 0 ? (
								<Table.Row>
									<Table.Cell>
										<Label ribbon style={ribbon}>
											중졸이하
										</Label>
									</Table.Cell>
									<Table.Cell>{jobResult[1].join(' ')}</Table.Cell>
								</Table.Row>
							) : (
								``
							)}
							{jobResult[2].length !== 0 ? (
								<Table.Row>
									<Table.Cell>
										<Label ribbon style={ribbon}>
											고졸
										</Label>
									</Table.Cell>
									<Table.Cell>{jobResult[2].join(' ')}</Table.Cell>
								</Table.Row>
							) : (
								``
							)}
							{jobResult[3].length !== 0 ? (
								<Table.Row>
									<Table.Cell>
										<Label ribbon style={ribbon}>
											전문대졸
										</Label>
									</Table.Cell>
									<Table.Cell>{jobResult[3].join(' ')}</Table.Cell>
								</Table.Row>
							) : (
								``
							)}
							{jobResult[4].length !== 0 ? (
								<Table.Row>
									<Table.Cell>
										<Label ribbon style={ribbon}>
											대졸
										</Label>
									</Table.Cell>
									<Table.Cell>{jobResult[4].join(' ')}</Table.Cell>
								</Table.Row>
							) : (
								``
							)}
							{jobResult[5].length !== 0 ? (
								<Table.Row>
									<Table.Cell>
										<Label ribbon style={ribbon}>
											대학원졸
										</Label>
									</Table.Cell>
									<Table.Cell>{jobResult[5].join(' ')}</Table.Cell>
								</Table.Row>
							) : (
								``
							)}
						</Table.Body>
					</Table>
					<Table celled>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell colSpan="2">
									<Message info header="종사자 평균 전공별" />
								</Table.HeaderCell>
							</Table.Row>

							<Table.Row>
								<Table.HeaderCell style={tHeader}>분야</Table.HeaderCell>
								<Table.HeaderCell style={tHeader}>직업</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							{majorResult[0].length !== 0 ? (
								<Table.Row>
									<Table.Cell>
										<Label ribbon style={ribbon}>
											계열무관
										</Label>
									</Table.Cell>
									<Table.Cell>{majorResult[0].join(' ')}</Table.Cell>
								</Table.Row>
							) : (
								``
							)}

							{majorResult[1].length !== 0 ? (
								<Table.Row>
									<Table.Cell>
										<Label ribbon style={ribbon}>
											인문
										</Label>
									</Table.Cell>
									<Table.Cell>{majorResult[1].join(' ')}</Table.Cell>
								</Table.Row>
							) : (
								``
							)}
							{majorResult[2].length !== 0 ? (
								<Table.Row>
									<Table.Cell>
										<Label ribbon style={ribbon}>
											사회
										</Label>
									</Table.Cell>
									<Table.Cell>{majorResult[2].join(' ')}</Table.Cell>
								</Table.Row>
							) : (
								``
							)}
							{majorResult[3].length !== 0 ? (
								<Table.Row>
									<Table.Cell>
										<Label ribbon style={ribbon}>
											교육
										</Label>
									</Table.Cell>
									<Table.Cell>{majorResult[3].join(' ')}</Table.Cell>
								</Table.Row>
							) : (
								``
							)}
							{majorResult[4].length !== 0 ? (
								<Table.Row>
									<Table.Cell>
										<Label ribbon style={ribbon}>
											공학
										</Label>
									</Table.Cell>
									<Table.Cell>{majorResult[4].join(' ')}</Table.Cell>
								</Table.Row>
							) : (
								``
							)}
							{majorResult[5].length !== 0 ? (
								<Table.Row>
									<Table.Cell>
										<Label ribbon style={ribbon}>
											자연
										</Label>
									</Table.Cell>
									<Table.Cell>{majorResult[5].join(' ')}</Table.Cell>
								</Table.Row>
							) : (
								``
							)}
							{majorResult[6].length !== 0 ? (
								<Table.Row>
									<Table.Cell>
										<Label ribbon style={ribbon}>
											의학
										</Label>
									</Table.Cell>
									<Table.Cell>{majorResult[6].join(' ')}</Table.Cell>
								</Table.Row>
							) : (
								``
							)}
							{majorResult[7].length !== 0 ? (
								<Table.Row>
									<Table.Cell>
										<Label ribbon style={ribbon}>
											예체능
										</Label>
									</Table.Cell>
									<Table.Cell>{majorResult[7].join(' ')}</Table.Cell>
								</Table.Row>
							) : (
								``
							)}
						</Table.Body>
					</Table>
					<Button style={startBtnColor} animated onClick={onSubmitAction}>
						<Button.Content visible>다시검사하기</Button.Content>
						<Button.Content hidden>
							<Icon name="backward" />
						</Button.Content>
					</Button>
				</div>
			</div>
		);
	} else {
		return <Segment loading />;
	}
};

export default Result;
