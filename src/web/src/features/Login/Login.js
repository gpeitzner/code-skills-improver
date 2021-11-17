import "./Login.css";

import { Box, TextField, Button, Alert } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Login() {
	const [userCredentials, setUserCredentials] = useState({
		email: "",
		password: "",
	});
	const [alertNotification, setAlertNofication] = useState({
		type: "",
		message: "",
		show: false,
	});
	const history = useHistory();

	const handleInput = (e, attribute) => {
		setUserCredentials({
			...userCredentials,
			[attribute]: e.target.value.toString(),
		});
	};

	const handleLogin = async () => {
		if (userCredentials.email === "") {
			displayNotification("error", "Enter your email address", true);
			return;
		}
		if (userCredentials.password === "") {
			displayNotification("error", "Enter your password", true);
			return;
		}
		if (alertNotification.show) {
			displayNotification("", "", false);
		}
		if (
			userCredentials.email === "admin" &&
			userCredentials.password === "admin"
		) {
			history.push(`adminHome`);
			return;
		}
		if (
			userCredentials.email === "student" &&
			userCredentials.password === "student"
		) {
			history.push(`studentHome`);
			return;
		}
	};

	const displayNotification = (type, message, show) => {
		setAlertNofication({
			...alertNotification,
			type: type,
			message: message,
			show: show,
		});
	};

	return (
		<div className="Login">
			<Box component="form" sx={{ width: "40vh" }}>
				<TextField
					sx={{ width: "100%", marginBottom: "10px" }}
					id="login-email"
					label="Email"
					variant="outlined"
					type="email"
					onInput={(e) => handleInput(e, "email")}
				/>
				<TextField
					sx={{ width: "100%", marginBottom: "15px" }}
					id="login-password"
					label="Password"
					variant="outlined"
					type="password"
					onInput={(e) => handleInput(e, "password")}
				/>
				{alertNotification.show && (
					<Alert
						severity={alertNotification.type}
						sx={{ marginBottom: "15px" }}
					>
						{alertNotification.message}
					</Alert>
				)}
				<Button
					variant="contained"
					sx={{ width: "100%" }}
					onClick={handleLogin}
				>
					Login
				</Button>
			</Box>
		</div>
	);
}

export default Login;
