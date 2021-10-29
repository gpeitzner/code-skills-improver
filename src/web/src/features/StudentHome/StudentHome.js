import "./StudentHome.css";

import {
	Box,
	Grid,
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	Typography,
} from "@mui/material";

import problemImage from "../../assets/problem_image.jpg";

function StudentHome() {
	return (
		<div className="StudentHome">
			<Box sx={{ flexGrow: 1, width: "100%", heigth: "90vh" }}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6} sx={{ height: "45vh" }}>
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
					<Grid item xs={12} md={6}>
						<p>Item 2</p>
					</Grid>
					<Grid item xs={12} md={6}>
						<p>Item 3</p>
					</Grid>
					<Grid item xs={12} md={6}>
						<p>Item 4</p>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
}

export default StudentHome;
