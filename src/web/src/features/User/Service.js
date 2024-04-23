import axios from "axios";

import { API_URL } from "../../utils/config";


/**
 * Retrieves user data from the server.
 * @returns {Promise<Array>} A promise that resolves to an array of user data.
 */
const get = async () => {
  try {
    const response = await axios.get(`${API_URL}/crud/_user`);
    return response.data;
  } catch (error) {
    return [];
  }
};


/**
 * Saves a user by making a POST request to the API.
 * @param {Object} user - The user object to be saved.
 * @returns {Promise<Object>} A promise that resolves to the saved user object.
 * @throws {Error} If an error occurs during the save operation.
 */
const save = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/crud/_user`, user);
    return response.data.data[0];
  } catch (error) {
    return error;
  }
};


/**
 * Updates a user in the database.
 * @param {Object} user - The user object to be updated.
 * @returns {Object|null} - The updated user object if the update was successful, or null if there was an error.
 */
const update = async (user) => {
  try {
    const response = await axios.put(`${API_URL}/crud/_user`, {
      filter: {
        _user_id: user._user_id,
      },
      new: user,
    });
    return response.data.data[0];
  } catch (error) {
    return null;
  }
};


/**
 * Deletes a user from the server.
 * @param {Object} user - The user object to be deleted.
 * @returns {Promise<boolean|null>} - A promise that resolves to true if the user is deleted successfully, or null if there is an error.
 */
const _delete = async (user) => {
  try {
    await axios.delete(`${API_URL}/crud/log`, {
      data: { _user_id: user._user_id },
    });
    await axios.delete(`${API_URL}/crud/_user_unit_test`, {
      data: { _user_id: user._user_id },
    });
    await axios.delete(`${API_URL}/crud/_user`, {
      data: { _user_id: user._user_id },
    });

    return true;
  } catch (error) {
    return null;
  }
};

export { get, save, update, _delete };
