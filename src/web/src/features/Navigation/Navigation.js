import "./Navigation.css";

import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import { Code } from "@mui/icons-material";

function Navigation() {
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
					>
						<Code />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Code Skills Improver
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default Navigation;
