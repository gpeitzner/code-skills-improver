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
  {
    name: "get-problem-by-id",
    dml: "SELECT * FROM problem WHERE problem_id = $1",
  },
  {
    name: "login",
    dml: "SELECT * FROM _user WHERE email = $1 AND password = $2",
  },
  {
    name: "get-unit-tests-results-by-user",
    dml: `
			SELECT 
				_user_unit_test.unit_test_id 
			FROM 
				_user_unit_test 
			INNER JOIN
				unit_test ON unit_test.unit_test_id = _user_unit_test.unit_test_id
			INNER JOIN
				problem ON problem.problem_id = unit_test.problem_id
			WHERE 
				_user_unit_test._user_id = $1 AND
				problem.problem_id = $2
		`,
  },
  {
    name: "delete-user-unit-tests",
    dml: `
			DELETE FROM 
				_user_unit_test 
			WHERE
				_user_unit_test.unit_test_id IN 
					(SELECT 
						_user_unit_test.unit_test_id 
					FROM 
						_user_unit_test 
					INNER JOIN
						unit_test ON unit_test.unit_test_id = _user_unit_test.unit_test_id
					INNER JOIN
						problem ON problem.problem_id = unit_test.problem_id
					WHERE 
						_user_unit_test._user_id = $1 AND
						problem.problem_id = $2)
				AND
				_user_unit_test._user_id = $1
		`,
  },
  {
    name: "delete-problem-solution",
    dml: "DELETE FROM _user_problem WHERE _user_problem._user_id = $1 AND _user_problem.problem_id = $2",
  },
  {
    name: "get-user-problem-solution",
    dml: "SELECT code FROM _user_problem WHERE _user_problem._user_id = $1 AND _user_problem.problem_id = $2",
  },
];

export default querys;
