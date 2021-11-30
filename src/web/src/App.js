import "./App.css";

import { Switch, Route } from "react-router-dom";
import Navigation from "./features/Navigation/Navigation";
import AdminHome from "./features/AdminHome/AdminHome";
import Login from "./features/Login/Login";
import StudentHome from "./features/StudentHome/StudentHome";
import Solver from "./features/Solver/Solver";
import User from "./features/User/User";
import Problem from "./features/Problem/Problem";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useHistory } from "react-router";

function App() {
	const [cookie] = useCookies(["access"]);
	const history = useHistory();

	useEffect(() => {
		if (cookie["access"] === undefined) {
			history.push("/");
		}
	}, [cookie, history]);

	return (
		<div className="App">
			<Navigation />
			<Switch>
				<Route exact path="/">
					<Login />
				</Route>
				<Route exact path="/adminHome">
					<AdminHome />
				</Route>
				<Route exact path="/studentHome">
					<StudentHome />
				</Route>
				<Route exact path="/solver/:id">
					<Solver />
				</Route>
				<Route exact path="/user">
					<User />
				</Route>
				<Route exact path="/problem">
					<Problem />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
