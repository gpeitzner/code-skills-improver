import "./Solver.css";

import {
	Box,
	Grid,
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	Typography,
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Button,
	List,
	ListItem,
	ListItemText,
} from "@mui/material";

import problemImage from "../../assets/problem_image.jpg";
import testsImage from "../../assets/tests_image.jpg";
import { Check, Error, PlayCircle } from "@mui/icons-material";
import AceEditor from "react-ace";
import { useState, useEffect } from "react";
import "ace-builds/webpack-resolver";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils/config";

function Solver() {
	const { id } = useParams();
	const [problem, setProblem] = useState({});
	const [unitTests, setUnitTests] = useState([]);
	const [code, setCode] = useState("");
	const [terminalOutput, setTerminalOutput] = useState([]);

	useEffect(() => {
		const source = axios.CancelToken.source();
		const getMasterData = async () => {
			try {
				const problemData = await axios.post(
					`${API_URL}/query/get-problem-by-id`,
					{ problem_id: id },
					{ cancelToken: source.token }
				);
				setProblem(problemData.data.rows[0]);
				setCode(problemData.data.rows[0].base_code);
				const unitTestsData = axios.post(
					`${API_URL}/query/get-unit-tests-by-problem-id`,
					{
						problem_id: id,
					},
					{ cancelToken: source.token }
				);
				setUnitTests(unitTestsData.data.rows);
			} catch (error) {}
		};
		getMasterData();
		return () => {
			source.cancel();
		};
	}, [id]);

	const handleRun = async () => {
		let date = new Date();
		date.setHours(date.getHours() - 6);
		setTerminalOutput([
			date.toISOString().replace("T", " ").replace("Z", "").split(".")[0],
		]);
		for (let i = 0; i < unitTests.length; i++) {
			try {
				const unitTest = unitTests[i];
				const baseCode = code.concat("\n").concat(unitTest.code);
				const codeExecutionResponse = await axios.post(
					`${API_URL}/external/execution`,
					{ baseCode: baseCode }
				);
				setTerminalOutput((prevState) =>
					prevState.concat(`${codeExecutionResponse.data.message}`)
				);
				if (codeExecutionResponse.data.message === unitTest.output) {
					console.log("[FLAG]", unitTest.unit_test_id);
				}
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<div className="Solver">
			<Box sx={{ flexGrow: 1, width: "100%", heigth: "90vh" }}>
				<Grid container spacing={2}>
					<Grid
						item
						xs={12}
						sm={12}
						md={12}
						lg={6}
						xl={6}
						sx={{ height: "45vh" }}
					>
						<Card sx={{ height: "100%" }}>
							<CardHeader title="Problem" />
							<CardMedia component="img" height="100" image={problemImage} />
							<CardContent>
								<Typography variant="h6" component="div">
									{problem.title}
								</Typography>
								<Typography variant="body1">{problem.description}</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={12}
						lg={6}
						xl={6}
						sx={{ height: "45vh" }}
					>
						<AceEditor
							style={{ height: "90%", width: "100%" }}
							placeholder="Place your solution here..."
							mode="python"
							theme="monokai"
							name="basic-code-editor"
							onChange={(currentCode) => setCode(currentCode)}
							fontSize={14}
							value={code}
						/>
						<Button
							sx={{ width: "100%" }}
							variant="contained"
							color="success"
							endIcon={<PlayCircle />}
							onClick={handleRun}
						>
							Run
						</Button>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={12}
						lg={6}
						xl={6}
						sx={{ height: "45vh" }}
					>
						<Card sx={{ height: "100%" }}>
							<CardHeader title="Tests" />
							<CardMedia component="img" height="100" image={testsImage} />
							<CardContent>
								<TableContainer component={Paper}>
									<Table
										sx={{ minWidth: 650 }}
										size="small"
										aria-label="a dense table"
									>
										<TableHead>
											<TableRow>
												<TableCell>#</TableCell>
												<TableCell>Input</TableCell>
												<TableCell>Output</TableCell>
												<TableCell>Status</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{unitTests.map((row, i) => (
												<TableRow
													key={i}
													sx={{
														"&:last-child td, &:last-child th": { border: 0 },
													}}
												>
													<TableCell component="th" scope="row">
														{row.number}
													</TableCell>
													<TableCell>{row.input}</TableCell>
													<TableCell>{row.output}</TableCell>
													<TableCell>{true ? <Check /> : <Error />}</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							</CardContent>
						</Card>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={12}
						lg={6}
						xl={6}
						sx={{ height: "45vh" }}
					>
						<Card
							sx={{ height: "100%", backgroundColor: "black", color: "white" }}
						>
							<CardHeader title="Terminal" />
							<CardContent>
								<List style={{ maxHeight: "30vh", overflow: "auto" }}>
									{terminalOutput.map((output, i) => (
										<ListItem variant="body1" key={i}>
											<ListItemText>
												{`runtime@codeskillsimprover:~$ ${output}`}
											</ListItemText>
										</ListItem>
									))}
								</List>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
}

export default Solver;
