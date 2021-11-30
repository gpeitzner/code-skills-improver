import "./Login.css";

import { Box, TextField, Button, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { useCookies } from "react-cookie";

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
	const [cookie, setCookie] = useCookies(["access"]);

	const handleInput = (e, attribute) => {
		setUserCredentials({
			...userCredentials,
			[attribute]: e.target.value.toString(),
		});
	};

	useEffect(() => {
		if (cookie["access"] !== undefined) {
			if (cookie["access"].user_type_id === 1)
				return history.push("/adminHome");
			history.push("/studentHome");
		}
	}, [cookie, history]);

	const loginRequest = async () => {
		try {
			const response = await axios.post(`${API_URL}/query/login`, {
				email: userCredentials.email,
				password: userCredentials.password,
			});
			return [response.data, null];
		} catch (error) {
			return [null, error];
		}
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
		const [loginData] = await loginRequest();
		if (!loginData) return;
		if (loginData.rows.length === 0) return;
		setCookie("access", loginData.rows[0], { path: "/" });
		if (loginData.rows[0].user_type_id === 1) return history.push("/adminHome");
		history.push("/studentHome");
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
