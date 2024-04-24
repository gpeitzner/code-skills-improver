import "./Solver.css";

import {
  Box,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";

import problemImage from "../../assets/problem_image.jpg";
import testsImage from "../../assets/tests_image.jpg";
import { Check, Error, PlayCircle } from "@mui/icons-material";
import AceEditor from "react-ace";
import { useState, useEffect } from "react";
import "ace-builds/webpack-resolver";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { useCookies } from "react-cookie";

function Solver() {
  const { id } = useParams();
  const [problem, setProblem] = useState({});
  const [unitTests, setUnitTests] = useState([]);
  const [code, setCode] = useState("");
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [cookie] = useCookies(["access"]);
  const [passedTests, setPassedTests] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getMasterData = async () => {
      try {
        const problemData = await axios.post(
          `${API_URL}/query/get-problem-by-id`,
          { problem_id: id },
          { cancelToken: source.token }
        );
        setProblem(problemData.data.rows[0]);
        const unitTestsData = await axios.post(
          `${API_URL}/query/get-unit-tests-by-problem-id`,
          {
            problem_id: id,
          },
          { cancelToken: source.token }
        );
        setUnitTests(unitTestsData.data.rows);
        const passedUnitTestsData = await axios.post(
          `${API_URL}/query/get-unit-tests-results-by-user`,
          {
            _user_id: cookie["access"]._user_id,
            problem_id: id,
          },
          { cancelToken: source.token }
        );

        const score =
          (passedUnitTestsData.data.rows.length /
            unitTestsData.data.rows.length) *
          100;
        setScore(Math.ceil(score));

        setPassedTests(passedUnitTestsData.data.rows);
        const problemSolutionData = await axios.post(
          `${API_URL}/query/get-user-problem-solution`,
          {
            _user_id: cookie["access"]._user_id,
            problem_id: id,
          },
          { cancelToken: source.token }
        );
        if (problemSolutionData.data.rows.length > 0)
          return setCode(problemSolutionData.data.rows[0].code);
        setCode(problemData.data.rows[0].base_code);
      } catch (error) {}
    };
    getMasterData();
    return () => {
      source.cancel();
    };
  }, [id, cookie]);

  const handleRun = async () => {
    let date = new Date();
    date.setHours(date.getHours() - 6);
    setTerminalOutput([
      date.toISOString().replace("T", " ").replace("Z", "").split(".")[0],
    ]);
    await axios.post(`${API_URL}/query/delete-user-unit-tests`, {
      _user_id: cookie["access"]._user_id,
      problem_id: problem.problem_id,
    });
    await axios.post(`${API_URL}/query/delete-problem-solution`, {
      _user_id: cookie["access"]._user_id,
      problem_id: problem.problem_id,
    });
    for (let i = 0; i < unitTests.length; i++) {
      try {
        const unitTest = unitTests[i];
        const baseCode = code.concat("\n").concat(unitTest.code);
        const codeExecutionResponse = await axios.post(
          `${API_URL}/external/execution`,
          { baseCode: baseCode }
        );
        setTerminalOutput((prevState) =>
          prevState.concat(`${codeExecutionResponse.data.message}`)
        );
        if (codeExecutionResponse.data.message === unitTest.output) {
          await axios.post(`${API_URL}/crud/_user_unit_test`, {
            _user_id: cookie["access"]._user_id,
            unit_test_id: unitTest.unit_test_id,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
    const passedUnitTestsData = await axios.post(
      `${API_URL}/query/get-unit-tests-results-by-user`,
      {
        _user_id: cookie["access"]._user_id,
        problem_id: id,
      }
    );
    setPassedTests(passedUnitTestsData.data.rows);

    const unitTestsData = await axios.post(
      `${API_URL}/query/get-unit-tests-by-problem-id`,
      {
        problem_id: id,
      }
    );

    const score =
      (passedUnitTestsData.data.rows.length / unitTestsData.data.rows.length) *
      100;
    setScore(Math.ceil(score));

    await axios.post(`${API_URL}/crud/_user_problem`, {
      _user_id: cookie["access"]._user_id,
      problem_id: problem.problem_id,
      code: code,
    });
  };

  return (
    <div className="Solver">
      <Box sx={{ flexGrow: 1, width: "100%", heigth: "90vh" }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
            sx={{ height: "45vh" }}
          >
            <Card sx={{ height: "100%" }}>
              <CardHeader title="Problem" />
              <CardMedia component="img" height="100" image={problemImage} />
              <CardContent>
                <Typography variant="h6" component="div">
                  {problem.title}
                </Typography>
                <Typography variant="body1">{problem.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
            sx={{ height: "45vh" }}
          >
            <AceEditor
              style={{ height: "90%", width: "100%" }}
              placeholder="Place your solution here..."
              mode="python"
              theme="monokai"
              name="basic-code-editor"
              onChange={(currentCode) => setCode(currentCode)}
              fontSize={14}
              value={code}
            />
            <Button
              sx={{ width: "100%" }}
              variant="contained"
              color="success"
              endIcon={<PlayCircle />}
              onClick={handleRun}
            >
              Run
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
            sx={{ height: "45vh" }}
          >
            <Card sx={{ height: "100%" }}>
              <CardHeader title="Tests" />
              <CardMedia component="img" height="100" image={testsImage} />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Input</TableCell>
                        <TableCell>Output</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {unitTests.map((row, i) => (
                        <TableRow
                          key={i}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {i + 1}
                          </TableCell>
                          <TableCell>{row.input}</TableCell>
                          <TableCell>{row.output}</TableCell>
                          <TableCell>
                            {passedTests.find(
                              (passedTest) =>
                                passedTest.unit_test_id === row.unit_test_id
                            ) ? (
                              <Check />
                            ) : (
                              <Error />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  style={{ marginTop: "10px" }}
                >
                  <Chip label={`Score: ${score}`} color="primary" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={6}
            xl={6}
            sx={{ height: "45vh" }}
          >
            <Card
              sx={{ height: "100%", backgroundColor: "black", color: "white" }}
            >
              <CardHeader title="Terminal" />
              <CardContent>
                <List style={{ maxHeight: "30vh", overflow: "auto" }}>
                  {terminalOutput.map((output, i) => (
                    <ListItem variant="body1" key={i}>
                      <ListItemText>
                        {`runtime@codeskillsimprover:~$ ${output}`}
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Solver;
