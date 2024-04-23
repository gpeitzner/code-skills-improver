import axios from "axios";

import { API_URL } from "../../utils/config";

/**
 * Retrieves the problem data from the server.
 * @returns {Promise<Array>} A promise that resolves to an array of problem data.
 */
const get = async () => {
  try {
    const response = await axios.get(`${API_URL}/crud/problem`);
    return response.data;
  } catch (error) {
    return [];
  }
};

/**
 * Retrieves the unit tests for a given problem ID.
 *
 * @param {number} problem_id - The ID of the problem.
 * @returns {Promise<Array>} - A promise that resolves to an array of unit tests.
 */
const getUnitTests = async (problem_id) => {
  try {
    const response = await axios.post(
      `${API_URL}/query/get-unit-tests-by-problem-id`,
      { problem_id: problem_id }
    );
    return response.data.rows;
  } catch (error) {
    return error;
  }
};

/**
 * Saves a problem and its associated unit tests.
 *
 * @param {Object} problem - The problem object to be saved.
 * @param {Array} unitTests - An array of unit tests associated with the problem.
 * @returns {Promise<Object>} - A promise that resolves to the saved problem object.
 * @throws {Error} - If there is an error while saving the problem or unit tests.
 */
const save = async (problem, unitTests) => {
  try {
    const response = await axios.post(`${API_URL}/crud/problem`, problem);
    const problem_id = response.data.data[0].problem_id;
    for (let i = 0; i < unitTests.length; i++) {
      let unitTest = unitTests[i];
      delete unitTest.unit_test_id;
      unitTest.problem_id = problem_id;
      await axios.post(`${API_URL}/crud/unit_test`, unitTest);
    }
    return response.data.data[0];
  } catch (error) {
    return error;
  }
};

/**
 * Updates a problem and its associated unit tests.
 * @param {Object} problem - The problem object to be updated.
 * @param {Array} unitTests - An array of unit tests associated with the problem.
 * @returns {Promise<Object>} - A promise that resolves to the updated problem object.
 */
const update = async (problem, unitTests) => {
  try {
    const response = await axios.put(`${API_URL}/crud/problem`, {
      filter: {
        problem_id: problem.problem_id,
      },
      new: problem,
    });
    const problem_id = response.data.data[0].problem_id;
    await axios.post(`${API_URL}/query/delete-unit-tests`, {
      problem_id: problem_id,
    });

    for (let i = 0; i < unitTests.length; i++) {
      let unitTest = unitTests[i];
      delete unitTest.unit_test_id;
      unitTest.problem_id = problem_id;
      await axios.post(`${API_URL}/crud/unit_test`, unitTest);
    }
    return response.data.data[0];
  } catch (error) {
    return error;
  }
};

/**
 * Deletes a problem and its associated unit tests from the server.
 * @param {Object} problem - The problem object to be deleted.
 * @param {Array} unitTests - An array of unit tests associated with the problem.
 * @returns {Promise<boolean|null>} - A promise that resolves to true if the deletion is successful, null otherwise.
 */
const _delete = async (problem, unitTests) => {
  try {
    for (let i = 0; i < unitTests.length; i++) {
      let unitTest = unitTests[i];
      await axios.delete(`${API_URL}/crud/_user_unit_test`, {
        data: { unit_test_id: unitTest.unit_test_id },
      });
    }
    await axios.post(`${API_URL}/query/delete-unit-tests`, {
      problem_id: problem.problem_id,
    });
    await axios.delete(`${API_URL}/crud/problem`, {
      data: { problem_id: problem.problem_id },
    });
    return true;
  } catch (error) {
    return null;
  }
};

export { get, getUnitTests, save, update, _delete };
