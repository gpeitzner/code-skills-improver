import {
	Button,
	TextField,
	Box,
	Divider,
	TextareaAutosize,
	Grid,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
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
	const [baseCode, setBaseCode] = useState("");
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

	const handleSearch = async () => {
		if (search === "") return;
		const [searchData] = await searchRequest(search);
		if (!searchData) {
			setProblem({ ...problem, ...problemInitialState, title: search });
			return;
		}
		setProblem({ ...problem, ...searchData });
	};

	const handleSubmit = async () => {};

	const handleCreateUnitTest = async () => {
		if (currentUnitTest.input === "") return;
		if (currentUnitTest.output === "") return;
		if (currentUnitTest.code === "") return;
		const actualUnitTest = { ...currentUnitTest };
		setUnitTests([...unitTests, { ...actualUnitTest }]);
		setCurrentUnitTest(unitTestInitialState);
	};

	useEffect(() => console.log(unitTests), [unitTests]);

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
					style={{ height: "30vh", width: "100%", marginBottom: "20px" }}
					placeholder="Base code"
					mode="python"
					theme="monokai"
					name="basic-code-editor"
					onChange={(currentCode) => setBaseCode(currentCode)}
					fontSize={14}
					value={baseCode}
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
							sx={{ width: "100%", marginBottom: "20px" }}
							onClick={handleSubmit}
							color="success"
						>
							{problem.problem_id === 0 ? "SAVE PROBLEM" : "UPDATE PROBLEM"}
						</Button>
					</Grid>
					<Grid item xs={12} sm={12} lg={6} xl={6}>
						<Button
							variant="contained"
							sx={{ width: "100%", marginBottom: "20px" }}
							onClick={handleSubmit}
							color="warning"
						>
							{problem.status ? "DISABLE" : "ACTIVATE"}
						</Button>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
}

export default Problem;
