import "./AdminHome.css";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Box } from "@mui/material";

function AdminHome() {
	const { email } = useParams();

	useEffect(() => console.log(email), [email]);

	return (
		<div className="AdminHome">
			<Box component="div" sx={{ display: "inline" }}>
				<p>{`¡Welcome back ${email}!`}</p>
			</Box>
		</div>
	);
}

export default AdminHome;
