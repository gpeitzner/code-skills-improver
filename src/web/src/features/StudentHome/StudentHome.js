import "./StudentHome.css";

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
} from "@mui/material";

import problemImage from "../../assets/problem_image.jpg";
import testsImage from "../../assets/tests_image.jpg";
import { Check, Error } from "@mui/icons-material";

function StudentHome() {
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

	return (
		<div className="StudentHome">
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
						<p>Item 2</p>
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
						<p>Item 4</p>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
}

export default StudentHome;
