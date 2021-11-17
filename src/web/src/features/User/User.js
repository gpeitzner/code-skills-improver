import "./User.css";

import {
	Box,
	TextField,
	Button,
	Divider,
	Select,
	MenuItem,
	FormControl,
} from "@mui/material";
import { useState } from "react";

import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import axios from "axios";
import { API_URL } from "../../utils/config";

function User() {
	const userInitialState = {
		_user_id: 0,
		user_type_id: 0,
		first_name: "",
		last_name: "",
		phone: "",
		address: "",
		email: "",
		born_date: null,
		password: "",
	};

	const [search, setSearch] = useState("");
	const [user, setUser] = useState(userInitialState);

	const searchRequest = async (email) => {
		try {
			const response = await axios.post(`${API_URL}/query/get-user-by-id`, {
				email: email,
			});
			return [response.data.rows[0], null];
		} catch (error) {
			return [null, error];
		}
	};

	const handleSearch = async () => {
		if (search === "") return;
		const [searchData] = await searchRequest(search);
		if (!searchData) {
			setUser({ ...user, ...userInitialState });
			return;
		}
		setUser({ ...user, ...searchData, email: search });
	};

	const handleSelect = (event, attribute) => {
		setUser({ ...user, [attribute]: parseInt(event.target.value.toString()) });
	};

	const saveRequest = async (user) => {
		try {
			const response = await axios.post(`${API_URL}/crud/_user`, user);
			return [response.data.data[0], null];
		} catch (error) {
			return [null, error];
		}
	};

	const updateRequest = async (user) => {
		try {
			const response = await axios.put(`${API_URL}/crud/_user`, {
				filter: {
					email: user.email,
				},
				new: user,
			});
			return [response.data.data[0], null];
		} catch (error) {
			return [null, error];
		}
	};

	const handleSubmit = async () => {
		if (user._user_id === 0) {
			if (user.email === "") return;
			if (user.user_type_id === 0) return;
			if (user.first_name === "") return;
			if (user.last_name === "") return;
			if (user.phone === "") return;
			if (user.address === "") return;
			if (user.born_date === "") return;
			if (user.password === "") return;
			let userData = user;
			delete userData._user_id;
			const [saveData] = await saveRequest(userData);
			if (!saveData) return;
			setUser({ ...user, ...saveData });
			return;
		}
		const userData = user;
		const [updateData] = await updateRequest(userData);
		if (!updateData) return;
		console.log(updateData);
		setUser({ ...user, ...updateData });
	};

	return (
		<div className="User">
			<Box component="form" sx={{ width: "50vw" }}>
				<TextField
					sx={{ width: "100%", marginBottom: "10px" }}
					id="search-email"
					label="Email"
					variant="outlined"
					type="email"
					onInput={(e) => {
						setSearch(e.target.value.toString());
						setUser({ ...user, email: e.target.value.toString() });
					}}
				/>
				<Button
					variant="contained"
					sx={{ width: "100%", marginBottom: "20px" }}
					onClick={handleSearch}
				>
					Search
				</Button>
				<Divider sx={{ marginBottom: "20px" }}>User Info</Divider>
				<Select
					sx={{ width: "100%", marginBottom: "10px" }}
					id="user-type-select"
					value={user.user_type_id}
					onChange={(e) => handleSelect(e, "user_type_id")}
				>
					<MenuItem value={0}>Choose type ...</MenuItem>
					<MenuItem value={1}>Administrator</MenuItem>
					<MenuItem value={2}>Student</MenuItem>
				</Select>
				<TextField
					sx={{ width: "100%", marginBottom: "10px" }}
					id="user-first-name"
					label="Firstname"
					variant="outlined"
					type="text"
					onInput={(e) =>
						setUser({ ...user, first_name: e.target.value.toString() })
					}
					value={user.first_name}
				/>
				<TextField
					sx={{ width: "100%", marginBottom: "10px" }}
					id="user-last-name"
					label="Lastname"
					variant="outlined"
					type="text"
					onInput={(e) =>
						setUser({ ...user, last_name: e.target.value.toString() })
					}
					value={user.last_name}
				/>
				<TextField
					sx={{ width: "100%", marginBottom: "10px" }}
					id="user-phone"
					label="Phone"
					variant="outlined"
					type="text"
					onInput={(e) =>
						setUser({ ...user, phone: e.target.value.toString() })
					}
					value={user.phone}
				/>
				<TextField
					sx={{ width: "100%", marginBottom: "10px" }}
					id="user-address"
					label="Address"
					variant="outlined"
					type="text"
					onInput={(e) =>
						setUser({ ...user, address: e.target.value.toString() })
					}
					value={user.address}
				/>
				<FormControl sx={{ width: "100%", marginBottom: "10px" }}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DatePicker
							label="Born date"
							value={user.born_date}
							onChange={(value) => setUser({ ...user, born_date: value })}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>
				</FormControl>
				<TextField
					sx={{ width: "100%", marginBottom: "10px" }}
					id="user-password"
					label="Password"
					variant="outlined"
					type="password"
					onInput={(e) =>
						setUser({ ...user, password: e.target.value.toString() })
					}
					value={user.password}
				/>
				<Button
					variant="contained"
					sx={{ width: "100%", marginBottom: "20px" }}
					onClick={handleSubmit}
				>
					{user._user_id === 0 ? "SAVE" : "UPDATE"}
				</Button>
			</Box>
		</div>
	);
}

export default User;
