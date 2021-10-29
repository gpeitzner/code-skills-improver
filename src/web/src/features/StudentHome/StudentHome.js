import "./StudentHome.css";

import {
	Box,
	Grid,
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	Typography,
	Button,
	LinearProgress,
} from "@mui/material";
import { Try } from "@mui/icons-material";

import problemImage from "../../assets/problem_image.jpg";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function LinearProgressWithLabel(props) {
	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Box sx={{ width: "100%", mr: 1 }}>
				<LinearProgress variant="determinate" {...props} />
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography variant="body2" color="text.secondary">{`${Math.round(
					props.value
				)}%`}</Typography>
			</Box>
		</Box>
	);
}

LinearProgressWithLabel.propTypes = {
	/**
	 * The value of the progress indicator for the determinate and buffer variants.
	 * Value between 0 and 100.
	 */
	value: PropTypes.number.isRequired,
};

function StudentHome() {
	const [progress, setProgress] = useState(10);

	useEffect(() => {
		const timer = setInterval(() => {
			setProgress((prevProgress) =>
				prevProgress >= 100 ? 10 : prevProgress + 10
			);
		}, 800);
		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div className="StudentHome">
			<Box sx={{ flexGrow: 1, width: "100%", heigth: "90vh" }}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
						<Box sx={{ height: "100%" }}>
							<Card sx={{ height: "40vh" }}>
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
							<Box sx={{ width: "100%", mt: "10px", mb: "10px" }}>
								<LinearProgressWithLabel value={progress} />
							</Box>
							<Button
								sx={{ width: "100%" }}
								variant="contained"
								endIcon={<Try />}
								color="success"
							>
								TRY
							</Button>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
}

export default StudentHome;
