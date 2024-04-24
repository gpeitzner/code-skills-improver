import "./Problem.css";
import React, { useEffect, useState } from "react";

import {
  Button,
  TextField,
  Box,
  Divider,
  TextareaAutosize,
  Grid,
  Autocomplete,
} from "@mui/material";
import AceEditor from "react-ace";

import Alert from "../../components/Alert/Index";

import { get, getUnitTests, save, update, _delete } from "./Service";

/**
 * Initial state for the problem.
 *
 * @typedef {Object} ProblemInitialState
 * @property {number} problem_id - The ID of the problem.
 * @property {string} title - The title of the problem.
 * @property {string} description - The description of the problem.
 * @property {string} base_code - The base code for the problem.
 * @property {boolean} status - The status of the problem.
 */

/**
 * Initial state for the problem.
 *
 * @type {ProblemInitialState}
 */
const problemInitialState = {
  problem_id: 0,
  title: "",
  description: "",
  base_code: "",
  status: true,
};

/**
 * Initial state for unit test.
 * @typedef {Object} UnitTestInitialState
 * @property {string} code - The code for the unit test.
 * @property {string} input - The input for the unit test.
 * @property {string} output - The expected output for the unit test.
 */

/**
 * Initial state for unit test.
 * @type {UnitTestInitialState}
 */
const unitTestInitialState = {
  code: "",
  input: "",
  output: "",
};

function Problem() {
  const [problems, setProblems] = useState([]);
  const [problem, setProblem] = useState(problemInitialState);
  const [unitTests, setUnitTests] = useState([]);
  const [currentUnitTest, setCurrentUnitTest] = useState(unitTestInitialState);

  const [problemAlert, setProblemAlert] = useState(null);
  const [unitTestAlert, setUnitTestAlert] = useState(null);

  /**
   * Handles the creation of a new unit test.
   *
   * @param {Object} currentUnitTest - The current unit test object.
   * @param {Function} setAlert - The function to set the alert message.
   * @returns {Promise<void>} - A promise that resolves when the unit test is created.
   */
  const handleCreateUnitTest = async (currentUnitTest, setAlert) => {
    setAlert(null);

    if (currentUnitTest.input === "")
      return setAlert({ type: "error", message: "Input is required" });
    if (currentUnitTest.output === "")
      return setAlert({ type: "error", message: "Output is required" });
    if (currentUnitTest.code === "")
      return setAlert({ type: "error", message: "Code is required" });

    const actualUnitTest = { ...currentUnitTest };
    setUnitTests([...unitTests, { ...actualUnitTest }]);

    setCurrentUnitTest(unitTestInitialState);
  };

  /**
   * Saves the problem and unit tests, and updates the state accordingly.
   * @param {Object} problem - The problem object to be saved.
   * @param {Array} unitTests - An array of unit tests.
   * @param {Function} setAlert - A function to set the alert state.
   * @returns {Promise<void>} - A promise that resolves when the save operation is complete.
   */
  const handleSave = async (problem, unitTests, setAlert) => {
    setAlert(null);

    if (problem.title === "")
      return setAlert({ type: "error", message: "Title is required" });
    if (problem.description === "")
      return setAlert({ type: "error", message: "Description is required" });
    if (problem.base_code === "")
      return setAlert({ type: "error", message: "Base code is required" });
    if (unitTests.length === 0)
      return setAlert({ type: "error", message: "Unit tests are required" });

    for (let i = 0; i < unitTests.length; i++) {
      let currentUnitTest = unitTests[i];
      if (currentUnitTest.input === "")
        return setAlert({
          type: "error",
          message: `Input is required in unit test #${i + 1}}`,
        });
      if (currentUnitTest.output === "")
        return setAlert({
          type: "error",
          message: `Output is required in unit test #${i + 1}}`,
        });
      if (currentUnitTest.code === "")
        return setAlert({
          type: "error",
          message: `Code is required in unit test #${i + 1}}`,
        });
    }

    delete problem.problem_id;
    const saveData = await save(problem, unitTests);
    if (!saveData)
      return setAlert({
        type: "error",
        message: "Error saving problem",
      });
    setProblem(saveData);

    const updatedUnitTests = await getUnitTests(saveData.problem_id);
    setUnitTests(updatedUnitTests);

    const problems = await get();
    setProblems(problems);

    setAlert({
      type: "success",
      message: "Problem saved successfully",
    });
  };

  /**
   * Updates a problem with the provided data.
   *
   * @param {Object} problem - The problem object to be updated.
   * @param {Array} unitTests - An array of unit tests for the problem.
   * @param {Function} setAlert - A function to set the alert message.
   * @returns {Promise<void>} - A promise that resolves when the problem is updated.
   */
  const handleUpdate = async (problem, unitTests, setAlert) => {
    setAlert(null);

    if (problem.title === "")
      return setAlert({ type: "error", message: "Title is required" });
    if (problem.description === "")
      return setAlert({ type: "error", message: "Description is required" });
    if (problem.base_code === "")
      return setAlert({ type: "error", message: "Base code is required" });
    if (unitTests.length === 0)
      return setAlert({ type: "error", message: "Unit tests are required" });

    for (let i = 0; i < unitTests.length; i++) {
      let currentUnitTest = unitTests[i];
      if (currentUnitTest.input === "")
        return setAlert({
          type: "error",
          message: `Input is required in unit test #${i + 1}`,
        });
      if (currentUnitTest.output === "")
        return setAlert({
          type: "error",
          message: `Output is required in unit test #${i + 1}`,
        });
      if (currentUnitTest.code === "")
        return setAlert({
          type: "error",
          message: `Code is required in unit test #${i + 1}`,
        });
    }

    const updateData = await update(problem, unitTests);
    if (!updateData)
      return setAlert({ type: "error", message: "Error updating problem" });
    setProblem(updateData);

    const updatedUnitTests = await getUnitTests(updateData.problem_id);
    setUnitTests(updatedUnitTests);

    const problems = await get();
    setProblems(problems);

    setAlert({
      type: "success",
      message: "Problem updated successfully",
    });
  };

  /**
   * Handles the deletion of a problem.
   *
   * @param {Object} problem - The problem to be deleted.
   * @param {Array} unitTests - The unit tests associated with the problem.
   * @param {Function} setAlert - The function to set the alert message.
   * @returns {Promise<void>} - A promise that resolves when the deletion is complete.
   */
  const handleDelete = async (problem, unitTests, setAlert) => {
    setAlert(null);

    const deleteData = await _delete(problem, unitTests);
    if (!deleteData)
      return setAlert({ type: "error", message: "Error deleting problem" });
    setProblem(problemInitialState);
    setUnitTests([]);
    setCurrentUnitTest(unitTestInitialState);

    const problems = await get();
    setProblems(problems);

    setAlert({
      type: "success",
      message: "Problem deleted successfully",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const problems = await get();
      setProblems(problems);
    };
    fetchData();
  }, []);

  return (
    <div className="Problem">
      <Box component="form" sx={{ width: "60vw" }}>
        <Autocomplete
          disablePortal
          id="combo-box"
          options={problems?.map((problem) => ({
            label: problem.title,
            id: problem.problem_id,
          }))}
          sx={{ width: "100%", marginBottom: "10px" }}
          renderInput={(params) => <TextField {...params} label="Problem" />}
          value={problem.title}
          onChange={async (_, value) => {
            if (!value) return;

            const currentProblem = problems.find(
              (problem) => problem.problem_id === value.id
            );
            setProblem(currentProblem);

            const unitTests = await getUnitTests(currentProblem.problem_id);
            setUnitTests(unitTests);
          }}
          onInputChange={(_, value) => {
            setProblem({ ...problemInitialState, title: value });
            setUnitTests([]);
          }}
        />

        <Divider sx={{ marginBottom: "20px" }}>Problem Info</Divider>
        <TextareaAutosize
          style={{ width: "100%", marginBottom: "10px" }}
          placeholder="Description"
          minRows={3}
          value={problem.description}
          onInput={(e) =>
            setProblem({ ...problem, description: e.target.value.toString() })
          }
        />
        <AceEditor
          style={{ height: "20vh", width: "100%", marginBottom: "20px" }}
          placeholder="Base code"
          mode="python"
          theme="monokai"
          name="basic-code-editor"
          onChange={(currentCode) =>
            setProblem({ ...problem, base_code: currentCode })
          }
          fontSize={14}
          value={problem.base_code}
        />
        {unitTests.map((unitTest, i) => (
          <div key={i}>
            <Divider sx={{ marginBottom: "20px" }}>{`Unit Test #${
              i + 1
            }`}</Divider>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} lg={6} xl={6}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Input"
                  variant="outlined"
                  type="text"
                  onInput={(e) => {
                    setUnitTests((prevState) => {
                      let currentUnitTests = [...prevState];
                      currentUnitTests[i].input = e.target.value.toString();
                      return currentUnitTests;
                    });
                  }}
                  value={unitTest.input}
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={6} xl={6}>
                <TextField
                  sx={{ width: "100%", marginBottom: "10px" }}
                  label="Output"
                  variant="outlined"
                  type="text"
                  onInput={(e) => {
                    setUnitTests((prevState) => {
                      let currentUnitTests = [...prevState];
                      currentUnitTests[i].output = e.target.value.toString();
                      return currentUnitTests;
                    });
                  }}
                  value={unitTest.output}
                />
              </Grid>
            </Grid>
            <AceEditor
              style={{ height: "10vh", width: "100%", marginBottom: "20px" }}
              placeholder="Base code"
              mode="python"
              theme="monokai"
              name="basic-code-editor"
              onChange={(currentCode) =>
                setUnitTests((prevState) => {
                  let currentUnitTests = [...prevState];
                  currentUnitTests[i].code = currentCode;
                  return currentUnitTests;
                })
              }
              fontSize={14}
              value={unitTest.code}
            />
            <Button
              variant="contained"
              sx={{ width: "100%", marginBottom: "20px" }}
              onClick={() =>
                setUnitTests((prevState) => {
                  let currentUnitTests = [...prevState];
                  return currentUnitTests.filter((_, index) => index !== i);
                })
              }
              color="error"
            >
              {`DELETE UNIT TEST #${i + 1}`}
            </Button>
          </div>
        ))}
        <Divider sx={{ marginBottom: "20px" }}>New Unit Test</Divider>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} lg={6} xl={6}>
            <TextField
              sx={{ width: "100%" }}
              id="current-unit-test-input"
              label="Input"
              variant="outlined"
              type="text"
              onInput={(e) =>
                setCurrentUnitTest({
                  ...currentUnitTest,
                  input: e.target.value.toString(),
                })
              }
              value={currentUnitTest.input}
            />
          </Grid>
          <Grid item xs={12} sm={12} lg={6} xl={6}>
            <TextField
              sx={{ width: "100%", marginBottom: "10px" }}
              id="current-unit-test-output"
              label="Output"
              variant="outlined"
              type="text"
              onInput={(e) =>
                setCurrentUnitTest({
                  ...currentUnitTest,
                  output: e.target.value.toString(),
                })
              }
              value={currentUnitTest.output}
            />
          </Grid>
        </Grid>
        <AceEditor
          style={{ height: "10vh", width: "100%", marginBottom: "20px" }}
          placeholder="Base code"
          mode="python"
          theme="monokai"
          name="basic-code-editor"
          onChange={(currentCode) =>
            setCurrentUnitTest({ ...currentUnitTest, code: currentCode })
          }
          fontSize={14}
          value={currentUnitTest.code}
        />
        <Button
          variant="contained"
          sx={{ width: "100%", marginBottom: "20px" }}
          onClick={() =>
            handleCreateUnitTest(currentUnitTest, setUnitTestAlert)
          }
          color="primary"
        >
          CREATE UNIT TEST
        </Button>
        <Alert {...unitTestAlert} />
        <Divider sx={{ marginBottom: "20px" }}>Actions</Divider>
        {problem.problem_id === 0 && (
          <Button
            variant="contained"
            sx={{ width: "100%", marginBottom: "20px", marginTop: "20px" }}
            onClick={() => handleSave(problem, unitTests, setProblemAlert)}
            color="success"
          >
            {"SAVE"}
          </Button>
        )}
        {problem.problem_id !== 0 && (
          <Button
            variant="contained"
            sx={{ width: "100%", marginBottom: "20px", marginTop: "20px" }}
            onClick={() => handleUpdate(problem, unitTests, setProblemAlert)}
            color="secondary"
          >
            {"UPDATE"}
          </Button>
        )}
        {problem.problem_id !== 0 && (
          <Button
            variant="contained"
            sx={{ width: "100%", marginBottom: "20px" }}
            onClick={() => handleDelete(problem, unitTests, setProblemAlert)}
            color="error"
          >
            {"DELETE"}
          </Button>
        )}
        <Alert {...problemAlert} />
        <Divider style={{ marginBottom: 100 }} />
      </Box>
    </div>
  );
}

export default Problem;
