import React, { useEffect, useState } from "react";

import { Alert as MUIAlert, Divider } from "@mui/material";

const Alert = ({ type, message }) => {
  const [render, setRender] = useState(false);

  useEffect(() => {
    if (message !== "") {
      setRender(true);
      let timer = setTimeout(() => {
        setRender(false);
      }, 5000);

      // Cleanup function
      return () => {
        clearTimeout(timer);
      };
    }
  }, [message]);

  return (
    <>
      {render && (
        <>
          <Divider sx={{ marginBottom: "20px" }} />
          <MUIAlert severity={type}>{message}</MUIAlert>
        </>
      )}
    </>
  );
};

Alert.defaultProps = {
  type: "info",
  message: "",
};

export default Alert;
