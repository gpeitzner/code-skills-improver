import "./Login.css";

import { Box, TextField, Button } from "@mui/material";

function Login() {
	return (
		<div className="Login">
			<Box component="form" sx={{ width: "40vh" }}>
				<TextField
					sx={{ width: "100%", marginBottom: "10px" }}
					id="login-email"
					label="Email"
					variant="outlined"
					type="email"
				/>
				<TextField
					sx={{ width: "100%", marginBottom: "15px" }}
					id="login-password"
					label="Password"
					variant="outlined"
					type="password"
				/>
				<Button variant="contained" sx={{ width: "100%" }}>
					Login
				</Button>
			</Box>
		</div>
	);
}

export default Login;
