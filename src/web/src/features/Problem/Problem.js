import {
	Button,
	TextField,
	Box,
	Divider,
	TextareaAutosize,
	Grid,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../utils/config";
import "./Problem.css";
import AceEditor from "react-ace";

function Problem() {
	const problemInitialState = {
		problem_id: 0,
		title: "",
		description: "",
		base_code: "",
		status: true,
	};

	const unitTestInitialState = {
		code: "",
		input: "",
		output: "",
	};

	const [search, setSearch] = useState("");
	const [problem, setProblem] = useState(problemInitialState);
	const [currentUnitTest, setCurrentUnitTest] = useState(unitTestInitialState);
	const [unitTests, setUnitTests] = useState([]);

	const searchRequest = async (title) => {
		try {
			const response = await axios.post(
				`${API_URL}/query/get-problem-by-title`,
				{ title: title }
			);
			return [response.data.rows[0], null];
		} catch (error) {
			return [null, error];
		}
	};

	const searchUnitTests = async (problem_id) => {
		try {
			const response = await axios.post(
				`${API_URL}/query/get-unit-tests-by-problem-id`,
				{ problem_id: problem_id }
			);
			return [response.data.rows, null];
		} catch (error) {
			return [null, error];
		}
	};

	const saveRequest = async (problem, unitTests) => {
		try {
			const response = await axios.post(`${API_URL}/crud/problem`, problem);
			const problem_id = response.data.data[0].problem_id;
			for (let i = 0; i < unitTests.length; i++) {
				let unitTest = unitTests[i];
				delete unitTest.unit_test_id;
				unitTest.problem_id = problem_id;
				await axios.post(`${API_URL}/crud/unit_test`, unitTest);
			}
			return [response.data.data[0], null];
		} catch (error) {
			return [null, error];
		}
	};

	const updateRequest = async (problem, unitTests) => {
		try {
			const response = await axios.put(`${API_URL}/crud/problem`, {
				filter: {
					problem_id: problem.problem_id,
				},
				new: problem,
			});
			const problem_id = response.data.data[0].problem_id;
			await axios.post(`${API_URL}/query/delete-unit-tests`, {
				problem_id: problem_id,
			});
			for (let i = 0; i < unitTests.length; i++) {
				let unitTest = unitTests[i];
				delete unitTest.unit_test_id;
				unitTest.problem_id = problem_id;
				await axios.post(`${API_URL}/crud/unit_test`, unitTest);
			}
			return [response.data.data[0], null];
		} catch (error) {
			return [null, error];
		}
	};

	const handleSearch = async () => {
		if (search === "") {
			setProblem({ ...problem, ...problemInitialState, title: search });
			setUnitTests([]);
			setCurrentUnitTest(unitTestInitialState);
			return;
		}
		const [searchData] = await searchRequest(search);
		if (!searchData) {
			setProblem({ ...problem, ...problemInitialState, title: search });
			setUnitTests([]);
			setCurrentUnitTest(unitTestInitialState);
			return;
		}
		const [unitTestsData] = await searchUnitTests(searchData.problem_id);
		if (unitTestsData) setUnitTests(unitTestsData);
		setProblem({ ...problem, ...searchData });
	};

	const handleSubmit = async () => {
		if (problem.problem_id === 0) {
			if (problem.title === "") return;
			if (problem.description === "") return;
			if (problem.base_code === "") return;
			if (unitTests.length === 0) return;
			let problemData = problem;
			let unitTestsData = unitTests;
			delete problemData.problem_id;
			const [saveData] = await saveRequest(problemData, unitTestsData);
			if (!saveData) return;
			setProblem({ ...problem, ...saveData });
			return;
		}
		let problemData = problem;
		let unitTestsData = unitTests;
		const [updateData] = await updateRequest(problemData, unitTestsData);
		if (!updateData) return;
		setProblem({ ...problem, ...updateData });
	};

	const handleCreateUnitTest = async () => {
		if (currentUnitTest.input === "") return;
		if (currentUnitTest.output === "") return;
		if (currentUnitTest.code === "") return;
		const actualUnitTest = { ...currentUnitTest };
		setUnitTests([...unitTests, { ...actualUnitTest }]);
		setCurrentUnitTest(unitTestInitialState);
	};

	const handleProblemStatus = async () => {
		let problemData = problem;
		let unitTestsData = unitTests;
		problemData.status = !problemData.status;
		const [updateData] = await updateRequest(problemData, unitTestsData);
		if (!updateData) return;
		setProblem({ ...problem, ...updateData });
	};

	return (
		<div className="Problem">
			<Box component="form" sx={{ width: "50vw" }}>
				<TextField
					sx={{ width: "100%", marginBottom: "10px" }}
					id="search-title"
					label="Title"
					variant="outlined"
					type="text"
					onInput={(e) => {
						setSearch(e.target.value.toString());
						setProblem({ ...problem, title: e.target.value.toString() });
					}}
				/>
				<Button
					variant="contained"
					sx={{ width: "100%", marginBottom: "20px" }}
					onClick={handleSearch}
				>
					Search
				</Button>
				<Divider sx={{ marginBottom: "20px" }}>Problem Info</Divider>
				<TextareaAutosize
					style={{ width: "100%", marginBottom: "10px" }}
					placeholder="Description"
					minRows={3}
					value={problem.description}
					onInput={(e) =>
						setProblem({ ...problem, description: e.target.value.toString() })
					}
				/>
				<AceEditor
					style={{ height: "20vh", width: "100%", marginBottom: "20px" }}
					placeholder="Base code"
					mode="python"
					theme="monokai"
					name="basic-code-editor"
					onChange={(currentCode) =>
						setProblem({ ...problem, base_code: currentCode })
					}
					fontSize={14}
					value={problem.base_code}
				/>
				{unitTests.map((unitTest, i) => (
					<div key={i}>
						<Divider sx={{ marginBottom: "20px" }}>{`Unit Test #${
							i + 1
						}`}</Divider>

						<Grid container spacing={2}>
							<Grid item xs={12} sm={12} lg={6} xl={6}>
								<TextField
									sx={{ width: "100%" }}
									label="Input"
									variant="outlined"
									type="text"
									onInput={(e) => {
										setUnitTests((prevState) => {
											let currentUnitTests = [...prevState];
											currentUnitTests[i].input = e.target.value.toString();
											return currentUnitTests;
										});
									}}
									value={unitTest.input}
								/>
							</Grid>
							<Grid item xs={12} sm={12} lg={6} xl={6}>
								<TextField
									sx={{ width: "100%", marginBottom: "10px" }}
									label="Output"
									variant="outlined"
									type="text"
									onInput={(e) => {
										setUnitTests((prevState) => {
											let currentUnitTests = [...prevState];
											currentUnitTests[i].output = e.target.value.toString();
											return currentUnitTests;
										});
									}}
									value={unitTest.output}
								/>
							</Grid>
						</Grid>
						<AceEditor
							style={{ height: "10vh", width: "100%", marginBottom: "20px" }}
							placeholder="Base code"
							mode="python"
							theme="monokai"
							name="basic-code-editor"
							onChange={(currentCode) =>
								setUnitTests((prevState) => {
									let currentUnitTests = [...prevState];
									currentUnitTests[i].code = currentCode;
									return currentUnitTests;
								})
							}
							fontSize={14}
							value={unitTest.code}
						/>
						<Button
							variant="contained"
							sx={{ width: "100%", marginBottom: "20px" }}
							onClick={() =>
								setUnitTests((prevState) => {
									let currentUnitTests = [...prevState];
									return currentUnitTests.filter((_, index) => index !== i);
								})
							}
							color="error"
						>
							{`DELETE UNIT TEST #${i + 1}`}
						</Button>
					</div>
				))}
				<Divider sx={{ marginBottom: "20px" }}>New Unit Test</Divider>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} lg={6} xl={6}>
						<TextField
							sx={{ width: "100%" }}
							id="current-unit-test-input"
							label="Input"
							variant="outlined"
							type="text"
							onInput={(e) =>
								setCurrentUnitTest({
									...currentUnitTest,
									input: e.target.value.toString(),
								})
							}
							value={currentUnitTest.input}
						/>
					</Grid>
					<Grid item xs={12} sm={12} lg={6} xl={6}>
						<TextField
							sx={{ width: "100%", marginBottom: "10px" }}
							id="current-unit-test-output"
							label="Output"
							variant="outlined"
							type="text"
							onInput={(e) =>
								setCurrentUnitTest({
									...currentUnitTest,
									output: e.target.value.toString(),
								})
							}
							value={currentUnitTest.output}
						/>
					</Grid>
				</Grid>
				<AceEditor
					style={{ height: "10vh", width: "100%", marginBottom: "20px" }}
					placeholder="Base code"
					mode="python"
					theme="monokai"
					name="basic-code-editor"
					onChange={(currentCode) =>
						setCurrentUnitTest({ ...currentUnitTest, code: currentCode })
					}
					fontSize={14}
					value={currentUnitTest.code}
				/>
				<Button
					variant="contained"
					sx={{ width: "100%", marginBottom: "20px" }}
					onClick={handleCreateUnitTest}
					color="secondary"
				>
					CREATE UNIT TEST
				</Button>
				<Divider sx={{ marginBottom: "20px" }}>Actions</Divider>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} lg={6} xl={6}>
						<Button
							variant="contained"
							sx={{ width: "100%" }}
							onClick={handleSubmit}
							color="success"
						>
							{problem.problem_id === 0 ? "SAVE PROBLEM" : "UPDATE PROBLEM"}
						</Button>
					</Grid>
					{problem.problem_id !== 0 && (
						<Grid item xs={12} sm={12} lg={6} xl={6}>
							<Button
								variant="contained"
								sx={{ width: "100%", marginBottom: "20px" }}
								onClick={handleProblemStatus}
								color="warning"
							>
								{problem.status ? "DISABLE" : "ACTIVATE"}
							</Button>
						</Grid>
					)}
				</Grid>
			</Box>
		</div>
	);
}

export default Problem;
