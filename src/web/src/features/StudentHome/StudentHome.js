import "./StudentHome.css";

import {
  Box,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Button,
  LinearProgress,
} from "@mui/material";
import { Try } from "@mui/icons-material";

import problemImage from "../../assets/problem_image.jpg";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils/config";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

function StudentHome() {
  const history = useHistory();
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchMasterData = async () => {
      try {
        const response = await axios.get(`${API_URL}/crud/problem`, {
          cancelToken: source.token,
        });
        setProblems(response.data);
      } catch (error) {}
    };
    fetchMasterData();
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <div className="StudentHome">
      <Box sx={{ flexGrow: 1, width: "100%", heigth: "90vh" }}>
        <Grid container spacing={2}>
          {problems.map(
            (problem, i) =>
              problem.status && (
                <Grid item xs={12} sm={4} md={4} lg={3} xl={3} key={i}>
                  <Box sx={{ height: "100%" }}>
                    <Card
                      sx={{ height: "40vh" }}
                      onClick={() =>
                        history.push(`solver/${problem.problem_id}`)
                      }
                    >
                      <CardHeader title="Problem" />
                      <CardMedia
                        component="img"
                        height="100"
                        image={problemImage}
                      />
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {problem.title}
                        </Typography>
                        <Typography variant="body1">
                          {problem.description}
                        </Typography>
                      </CardContent>
                    </Card>
                    {/* <Box sx={{ width: "100%", mt: "10px", mb: "10px" }}>
											<LinearProgressWithLabel value={10} />
										</Box> */}
                    <Button
                      sx={{ width: "100%" }}
                      variant="contained"
                      endIcon={<Try />}
                      color="success"
                      onClick={() =>
                        history.push(`solver/${problem.problem_id}`)
                      }
                    >
                      TRY
                    </Button>
                  </Box>
                </Grid>
              )
          )}
        </Grid>
      </Box>
    </div>
  );
}

export default StudentHome;
