import axios from "axios";

import { API_URL } from "../../utils/config";

const getProblems = async () => {
  try {
    const response = await axios.get(`${API_URL}/crud/problem`);
    return response.data;
  } catch (error) {
    return null;
  }
};

const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/crud/_user`);
    return response.data;
  } catch (error) {
    return null;
  }
};

const getProblemUnitTests = async (problemId) => {
  try {
    const response = await axios.post(
      `${API_URL}/query/get-unit-tests-by-problem-id`,
      { problem_id: problemId }
    );
    return response.data.rows;
  } catch (error) {
    return null;
  }
};

const getUserUnitTests = async (userId, problemId) => {
  try {
    const response = await axios.post(
      `${API_URL}/query/get-unit-tests-results-by-user`,
      { _user_id: userId, problem_id: problemId }
    );
    return response.data.rows;
  } catch (error) {
    return null;
  }
};

export { getProblems, getUsers, getProblemUnitTests, getUserUnitTests };
