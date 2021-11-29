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
	{
		name: "get-problem-by-title",
		dml: "SELECT * FROM problem WHERE title = $1",
	},
	{
		name: "delete-unit-tests",
		dml: "DELETE FROM unit_test WHERE problem_id = $1",
	},
	{
		name: "get-unit-tests-by-problem-id",
		dml: "SELECT * FROM unit_test WHERE problem_id = $1",
	},
];

export default querys;
