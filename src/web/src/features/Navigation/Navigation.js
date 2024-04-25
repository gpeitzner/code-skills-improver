import "./Navigation.css";

import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import { Code } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import ExitToApp from "@mui/icons-material/ExitToApp";

function Navigation() {
  const [cookie, , removeCookie] = useCookies(["access"]);
  const history = useHistory();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => history.push("/")}
          >
            <Code />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => history.push("/")}
            style={{ cursor: "pointer" }}
          >
            Code Skills Improver
          </Typography>
          {cookie["access"] !== undefined && (
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => {
                removeCookie("access");
                setTimeout(() => history.push("/"), 1000);
              }}
              color="inherit"
            >
              <ExitToApp />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navigation;
