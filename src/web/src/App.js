import "./App.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navigation from "./features/Navigation/Navigation";
import AdminHome from "./features/AdminHome/AdminHome";
import Login from "./features/Login/Login";
import StudentHome from "./features/StudentHome/StudentHome";
import Solver from "./features/Solver/Solver";
import User from "./features/User/User";
import Problem from "./features/Problem/Problem";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
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
					<Route exact path="/solver">
						<Solver />
					</Route>
					<Route exact path="/user">
						<User />
					</Route>
					<Route exact path="/problem">
						<Problem />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
