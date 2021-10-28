import "./App.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navigation from "./features/Navigation/Navigation";
import AdminHome from "./features/AdminHome/AdminHome";
import Login from "./features/Login/Login";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navigation />
				<Switch>
					<Route exact path="/">
						<Login />
					</Route>
					<Route exact path="/adminHome/:email?">
						<AdminHome />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
