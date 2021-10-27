import { Query } from "../models/query";

const querys: Query[] = [
	{
		name: "get-all-employees",
		dml: "SELECT * FROM employee",
	},
];

export default querys;
