import "./Stats.css";

import React, { useEffect, useState } from "react";

import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { Bar } from "react-chartjs-2";

import {
  getProblems,
  getUsers,
  getProblemUnitTests,
  getUserUnitTests,
} from "./Service";

function Stats() {
  const [filter, setFilter] = useState("Problem");
  const [values, setValues] = useState([]);
  const [value, setValue] = useState({ title: "", email: "" });
  const [metadata, setMetadata] = useState([]);
  const [graphData, setGraphData] = useState([]);

  const barGraphData = {
    labels: ["Min", "Avg", "Max"],
    datasets: [
      {
        label: "Score",
        data: graphData ?? [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    if (filter === "Problem") {
      if (value.problem_id) {
        getProblemStats(value).then((metadata) => setMetadata(metadata));
      }
    } else {
      if (value._user_id) {
        getUserStats(value).then((metadata) => setMetadata(metadata));
      }
    }
  }, [value, filter]);

  useEffect(() => {
    const fetchData = async () => {
      if (filter === "Problem") {
        const problems = await getProblems();
        setValues(problems);
      } else {
        const users = await getUsers();
        setValues(users);
      }
    };
    fetchData();
  }, [filter]);

  const getOptions = () => {
    if (filter === "Problem") {
      return values.map((problem) => ({
        label: problem.title,
        id: problem.problem_id,
      }));
    } else {
      return values.map((user) => ({
        label: user.email,
        id: user._user_id,
      }));
    }
  };

  const getUserStats = async (value) => {
    let metadata = [];

    if (value._user_id) {
      const problems = await getProblems();

      for (const problem of problems) {
        const problemUnitTests = await getProblemUnitTests(problem.problem_id);
        const userUnitTests = await getUserUnitTests(
          value._user_id,
          problem.problem_id
        );

        let passedTests = 0;
        for (const userUnitTest of userUnitTests) {
          const problemUnitTest = problemUnitTests.find(
            (unitTest) => unitTest.unit_test_id === userUnitTest.unit_test_id
          );
          if (userUnitTest.result === problemUnitTest.result) {
            passedTests++;
          }
        }

        const score = (passedTests / problemUnitTests.length) * 100;
        metadata.push({
          ...problem,
          passedTests: `${passedTests}/${problemUnitTests.length}`,
          score,
        });
      }
    }

    const minScore = Math.min(...metadata.map((problem) => problem.score));
    const averageScore =
      metadata.reduce((acc, curr) => acc + curr.score, 0) / metadata.length;
    const maxScore = Math.max(...metadata.map((problem) => problem.score));
    setGraphData([minScore, averageScore, maxScore]);

    return metadata;
  };

  const getProblemStats = async (value) => {
    let metadata = [];

    if (value.problem_id) {
      const problemUnitTests = await getProblemUnitTests(value.problem_id);
      const users = await getUsers();

      for (const user of users) {
        const userUnitTests = await getUserUnitTests(
          user._user_id,
          value.problem_id
        );

        let passedTests = 0;
        for (const userUnitTest of userUnitTests) {
          const problemUnitTest = problemUnitTests.find(
            (unitTest) => unitTest.unit_test_id === userUnitTest.unit_test_id
          );
          if (userUnitTest.result === problemUnitTest.result) {
            passedTests++;
          }
        }

        const score = (passedTests / problemUnitTests.length) * 100;
        metadata.push({
          ...user,
          passedTests: `${passedTests}/${problemUnitTests.length}`,
          score,
        });
      }
    }

    const minScore = Math.min(...metadata.map((user) => user.score));
    const averageScore =
      metadata.reduce((acc, curr) => acc + curr.score, 0) / metadata.length;
    const maxScore = Math.max(...metadata.map((user) => user.score));

    setGraphData([minScore, averageScore, maxScore]);

    return metadata;
  };

  return (
    <div className="Stats">
      <Box component={"form"} sx={{ width: "60vw" }}>
        <FormControl fullWidth>
          <InputLabel id="select-input-label">Filter by</InputLabel>
          <Select
            labelId="select-label"
            id="select-id"
            value={filter}
            label="Age"
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value={"Problem"}>Problem</MenuItem>
            <MenuItem value={"User"}>User</MenuItem>
          </Select>
        </FormControl>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={getOptions()}
          sx={{ width: "100%", marginBottom: "20px", marginTop: "20px" }}
          renderInput={(params) => <TextField {...params} label="Values" />}
          value={filter === "Problem" ? value.title : value.email}
          onChange={(_, value) => {
            if (!value) return;

            if (filter === "Problem") {
              const currentProblem = values.find(
                (problem) => problem.problem_id === value.id
              );
              setValue(currentProblem);
            } else {
              const currentUser = values.find(
                (user) => user._user_id === value.id
              );
              setValue(currentUser);
            }
          }}
        />
        {value && metadata && (
          <>
            <Bar data={barGraphData} />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      {filter === "Problem" ? "User" : "Problem"}
                    </TableCell>
                    <TableCell align="right">Passed Unit Tests</TableCell>
                    <TableCell align="right">Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filter === "User"
                    ? metadata.map((problem, i) => (
                        <TableRow
                          key={i}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {problem.title}
                          </TableCell>
                          <TableCell align="right">
                            {problem.passedTests}
                          </TableCell>
                          <TableCell align="right">{problem.score}</TableCell>
                        </TableRow>
                      ))
                    : metadata.map((user, i) => (
                        <TableRow
                          key={i}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {user.email}
                          </TableCell>
                          <TableCell align="right">
                            {user.passedTests}
                          </TableCell>
                          <TableCell align="right">{user.score}</TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </div>
  );
}

export default Stats;
