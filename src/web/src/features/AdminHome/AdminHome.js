import "./AdminHome.css";

import {
	Box,
	CardActionArea,
	Grid,
	Card,
	CardHeader,
	CardContent,
	Typography,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HelpIcon from "@mui/icons-material/Help";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

function AdminHome() {
	return (
		<div className="AdminHome">
			<Box sx={{ flexGrow: 1, width: "100%", heigth: "90vh" }}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
						<Box sx={{ height: "100%" }}>
							<Card sx={{ height: "40vh" }}>
								<CardActionArea sx={{ height: "100%" }}>
									<CardHeader title="Users" />
									<CardContent>
										<Box>
											<PeopleAltIcon sx={{ fontSize: "75px" }} />
											<Typography variant="h6" component="div">
												Manage Users
											</Typography>
											<Typography variant="body1">
												Shows, creates, updates and deletes users.
											</Typography>
										</Box>
									</CardContent>
								</CardActionArea>
							</Card>
						</Box>
					</Grid>
					<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
						<Box sx={{ height: "100%" }}>
							<Card sx={{ height: "40vh" }}>
								<CardActionArea sx={{ height: "100%" }}>
									<CardHeader title="Problems" />
									<CardContent>
										<Box>
											<HelpIcon sx={{ fontSize: "75px" }} />
											<Typography variant="h6" component="div">
												Manage Problems
											</Typography>
											<Typography variant="body1">
												Shows, creates, updates and deletes problems.
											</Typography>
										</Box>
									</CardContent>
								</CardActionArea>
							</Card>
						</Box>
					</Grid>
					<Grid item xs={12} sm={4} md={4} lg={3} xl={3}>
						<Box sx={{ height: "100%" }}>
							<Card sx={{ height: "40vh" }}>
								<CardActionArea sx={{ height: "100%" }}>
									<CardHeader title="Statistics" />
									<CardContent>
										<Box>
											<QueryStatsIcon sx={{ fontSize: "75px" }} />
											<Typography variant="h6" component="div">
												Show Statistics
											</Typography>
											<Typography variant="body1">
												Shows stats per each problem.
											</Typography>
										</Box>
									</CardContent>
								</CardActionArea>
							</Card>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
}

export default AdminHome;
