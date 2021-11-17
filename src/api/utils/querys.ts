import { Query } from "../models/query";

const querys: Query[] = [
	{
		name: "get-all-employees",
		dml: "SELECT * FROM employee",
	},
	{
		name: "get-user-by-id",
		dml: "SELECT * FROM _user WHERE email = $1",
	},
];

export default querys;
