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
} from "@mui/material";
import { Try } from "@mui/icons-material";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils/config";

function hashTitleToNumber(title) {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = ((hash << 5) - hash + title.charCodeAt(i)) | 0;
  }
  return (Math.abs(hash) % 15) + 1;
}

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
          {problems.map((problem, i) => {
            const imageNumber = hashTitleToNumber(problem.title);
            const problemImage =
              require(`../../assets/problem${imageNumber}.png`).default;

            return (
              problem.status && (
                <Grid item xs={12} sm={12} md={4} lg={3} xl={3} key={i}>
                  <Box sx={{ height: "100%" }}>
                    <Card
                      sx={{ minHeight: "50vh" }}
                      onClick={() =>
                        history.push(`solver/${problem.problem_id}`)
                      }
                    >
                      <CardHeader title={problem.title} />
                      <CardMedia
                        component="img"
                        height="100"
                        image={problemImage}
                      />
                      <CardContent>
                        <Typography variant="body1">
                          {problem.description}
                        </Typography>
                      </CardContent>
                    </Card>
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
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}

export default StudentHome;
