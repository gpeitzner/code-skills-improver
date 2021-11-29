import {
	Button,
	TextField,
	Box,
	Divider,
	TextareaAutosize,
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

	const [search, setSearch] = useState("");
	const [problem, setProblem] = useState(problemInitialState);
	const [baseCode, setBaseCode] = useState("");

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
				<Divider sx={{ marginBottom: "20px" }}>Unit Tests</Divider>
				<Button
					variant="contained"
					sx={{ width: "100%", marginBottom: "20px" }}
					onClick={handleSubmit}
					color="success"
				>
					{problem.problem_id === 0 ? "SAVE" : "UPDATE"}
				</Button>
			</Box>
		</div>
	);
}

export default Problem;
