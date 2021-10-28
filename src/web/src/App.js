import "./App.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navigation from "./features/Navigation/Navigation";
import AdminHome from "./features/AdminHome/AdminHome";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Navigation />
				<Switch>
					<Route exact path="/adminHome">
						<AdminHome />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
