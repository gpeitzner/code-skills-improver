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
		status: false,
		timestamp: "",
	};

	const [search, setSearch] = useState("");
	const [user, setUser] = useState(userInitialState);

	const handleSearch = async () => {
		console.log("[SEARCH]", search);
		console.log("[USER]", user);
	};

	const handleSelect = (event, attribute) => {
		setUser({ ...user, [attribute]: parseInt(event.target.value.toString()) });
	};

	return (
		<div className="User">
			<Box component="form" sx={{ width: "50vw"}}>
				<TextField
					sx={{ width: "100%", marginBottom: "10px" }}
					id="search-email"
					label="Email"
					variant="outlined"
					type="email"
					onInput={(e) => setSearch(e.target.value.toString())}
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
				/>
				<Button
					variant="contained"
					sx={{ width: "100%", marginBottom: "20px" }}
					onClick={handleSearch}
				>
					Save
				</Button>
			</Box>
		</div>
	);
}

export default User;
