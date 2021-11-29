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

	useEffect(() => {
		function getMasterData() {
			axios
				.post(`${API_URL}/query/get-problem-by-id`, { problem_id: id })
				.then((response) => {
					setProblem(response.data.rows[0]);
				});
			axios
				.post(`${API_URL}/query/get-unit-tests-by-problem-id`, {
					problem_id: id,
				})
				.then((response) => {
					setUnitTests(response.data.rows);
				});
		}
		getMasterData();
	}, [id]);

	const handleRun = async () => {
		console.log("RUN");
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
								<Typography variant="body1">
									{"student1@codeskillsimprover:~$ 	whoami"}
								</Typography>
								<Typography variant="body1">{"student1"}</Typography>
								<Typography variant="body1">
									{"student1@codeskillsimprover:~$	ls"}
								</Typography>
								<Typography variant="body1">{"dev"}</Typography>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
}

export default Solver;
