import "./User.css";
import { useState, useEffect } from "react";

import {
  Box,
  TextField,
  Button,
  Divider,
  Select,
  MenuItem,
  FormControl,
  Autocomplete,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import Alert from "../../components/Alert/Index";

import { get, save, update, _delete } from "./Service";
import { validateUser } from "./Utils";

/**
 * Initial state for the user.
 *
 * @typedef {Object} UserInitialState
 * @property {number} _user_id - The user ID.
 * @property {number} user_type_id - The user type ID.
 * @property {string} first_name - The user's first name.
 * @property {string} last_name - The user's last name.
 * @property {string} phone - The user's phone number.
 * @property {string} address - The user's address.
 * @property {string} email - The user's email address.
 * @property {Date|null} born_date - The user's date of birth (or null if unknown).
 * @property {string} password - The user's password.
 */
const userInitialState = {
  _user_id: 0,
  user_type_id: 0,
  first_name: "",
  last_name: "",
  phone: "",
  address: "",
  email: "",
  born_date: null,
  password: "",
};

function User() {
  const [user, setUser] = useState(userInitialState);
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState(null);

  /**
   * Handles the selection of an attribute.
   *
   * @param {Event} event - The event object.
   * @param {string} attribute - The attribute to be updated.
   */
  const handleSelect = (event, attribute) => {
    setUser({ ...user, [attribute]: parseInt(event.target.value.toString()) });
  };

  /**
   * Handles saving a user.
   *
   * @param {Object} user - The user object to be saved.
   * @param {Function} setAlert - The function to set the alert message.
   * @returns {Promise<void>} - A promise that resolves when the user is saved.
   */
  const handleSave = async (user, setAlert) => {
    setAlert(null);

    if (!validateUser(user, setAlert)) return;
    let userData = user;
    delete userData._user_id;

    const saveData = await save(userData);
    if (!saveData)
      return setAlert({
        type: "error",
        message: "Error saving user",
      });
    setUser(saveData);

    const users = await get();
    setUsers(users);

    setAlert({
      type: "success",
      message: "User saved successfully",
    });
  };

  /**
   * Handles the update of a user.
   *
   * @param {Object} user - The user object to be updated.
   * @param {Function} setAlert - The function to set the alert message.
   * @returns {Promise<void>} - A promise that resolves when the update is complete.
   */
  const handleUpdate = async (user, setAlert) => {
    setAlert(null);

    if (!validateUser(user, setAlert)) return;
    const userData = user;
    const updateData = await update(userData);
    if (!updateData)
      return setAlert({ type: "error", message: "Error updating user" });
    setUser(updateData);

    const users = await get();
    setUsers(users);

    setAlert({
      type: "success",
      message: "User updated successfully",
    });
  };

  /**
   * Deletes a user and updates the user list.
   * @param {Object} user - The user object to be deleted.
   * @param {Function} setAlert - The function to set the alert message.
   * @returns {Promise<void>} - A promise that resolves when the user is deleted and the user list is updated.
   */
  const handleDelete = async (user, setAlert) => {
    setAlert(null);

    const userData = user;
    const deleteData = await _delete(userData);
    if (!deleteData)
      return setAlert({ type: "error", message: "Error deleting user" });
    setUser(userInitialState);

    const users = await get();
    setUsers(users);

    setAlert({
      type: "success",
      message: "User deleted successfully",
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await get();
        setUsers(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="User">
      <Box component="form" sx={{ width: "60vw" }}>
        <Autocomplete
          disablePortal
          id="combo-box"
          options={users?.map((user) => ({
            label: user.email,
            id: user._user_id,
          }))}
          sx={{ width: "100%", marginBottom: "10px" }}
          renderInput={(params) => <TextField {...params} label="Email" />}
          value={user.email}
          onChange={(_, value) => {
            if (!value) return;

            const currentUser = users.find(
              (user) => user._user_id === value.id
            );
            setUser(currentUser);
          }}
          onInputChange={(_, value) => {
            setUser({ ...userInitialState, email: value });
          }}
        />

        <Divider sx={{ marginBottom: "20px" }}>User Info</Divider>
        <Select
          sx={{ width: "100%", marginBottom: "10px" }}
          id="user-type-select"
          value={user.user_type_id}
          onChange={(e) => handleSelect(e, "user_type_id")}
        >
          <MenuItem value={0}>Choose type ...</MenuItem>
          <MenuItem value={1}>Administrator</MenuItem>
          <MenuItem value={2}>Student</MenuItem>
        </Select>
        <TextField
          sx={{ width: "100%", marginBottom: "10px" }}
          id="user-first-name"
          label="Firstname"
          variant="outlined"
          type="text"
          onInput={(e) =>
            setUser({ ...user, first_name: e.target.value.toString() })
          }
          value={user.first_name}
        />
        <TextField
          sx={{ width: "100%", marginBottom: "10px" }}
          id="user-last-name"
          label="Lastname"
          variant="outlined"
          type="text"
          onInput={(e) =>
            setUser({ ...user, last_name: e.target.value.toString() })
          }
          value={user.last_name}
        />
        <TextField
          sx={{ width: "100%", marginBottom: "10px" }}
          id="user-phone"
          label="Phone"
          variant="outlined"
          type="text"
          onInput={(e) =>
            setUser({ ...user, phone: e.target.value.toString() })
          }
          value={user.phone}
        />
        <TextField
          sx={{ width: "100%", marginBottom: "10px" }}
          id="user-address"
          label="Address"
          variant="outlined"
          type="text"
          onInput={(e) =>
            setUser({ ...user, address: e.target.value.toString() })
          }
          value={user.address}
        />
        <FormControl sx={{ width: "100%", marginBottom: "10px" }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Born date"
              value={user.born_date}
              onChange={(value) => setUser({ ...user, born_date: value })}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormControl>
        <TextField
          sx={{ width: "100%", marginBottom: "10px" }}
          id="user-password"
          label="Password"
          variant="outlined"
          type="password"
          onInput={(e) =>
            setUser({ ...user, password: e.target.value.toString() })
          }
          value={user.password}
        />
        {user._user_id === 0 && (
          <Button
            variant="contained"
            sx={{ width: "100%", marginBottom: "20px", marginTop: "20px" }}
            onClick={() => handleSave(user, setAlert)}
            color="success"
          >
            {"SAVE"}
          </Button>
        )}
        {user._user_id !== 0 && (
          <Button
            variant="contained"
            sx={{ width: "100%", marginBottom: "20px", marginTop: "20px" }}
            onClick={() => handleUpdate(user, setAlert)}
            color="secondary"
          >
            {"UPDATE"}
          </Button>
        )}
        {user._user_id !== 0 && (
          <Button
            variant="contained"
            sx={{ width: "100%", marginBottom: "20px" }}
            onClick={() => handleDelete(user, setAlert)}
            color="error"
          >
            {"DELETE"}
          </Button>
        )}
        <Alert {...alert} />
      </Box>
    </div>
  );
}

export default User;
