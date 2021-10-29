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
import { useState } from "react";
import "ace-builds/webpack-resolver";

function Solver() {
	function createData(number, input, output, status) {
		return { number, input, output, status };
	}

	const rows = [
		createData(
			"1",
			`nums = [8, 7, 2, 5, 3, 1]; target = 10;`,
			`Pair found (8, 2) or Pair found (7, 3)`,
			false
		),
		createData(
			"2",
			`nums = [5, 2, 6, 8, 1, 9]; target = 12;`,
			`Pair not found`,
			true
		),
	];

	const [code, setCode] =
		useState(`# Naive method to find a pair in a list with the given sum
	def findPair(nums, target):
	 
		# consider each element except the last
		for i in range(len(nums) - 1):
	 
			# start from the i'th element until the last element
			for j in range(i + 1, len(nums)):
	 
				# if the desired sum is found, print it
				if nums[i] + nums[j] == target:
					print('Pair found', (nums[i], nums[j]))
					return
	 
		# No pair with the given sum exists in the list
		print('Pair not found')
	 
	 
	if __name__ == '__main__':
		nums = [8, 7, 2, 5, 3, 1]
		target = 10
		findPair(nums, target)`);

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
									Find a pair with the given sum in an array
								</Typography>
								<Typography variant="body1">
									Given an unsorted integer array, find a pair with the given
									sum in it.
								</Typography>
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
											{rows.map((row, i) => (
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
													<TableCell>
														{row.status ? <Check /> : <Error />}
													</TableCell>
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
