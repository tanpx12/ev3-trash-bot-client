import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CircleIcon from "@mui/icons-material/Circle";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import NorthWestIcon from "@mui/icons-material/NorthWest";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import SouthWestIcon from "@mui/icons-material/SouthWest";
import { Box, Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { AlertSuccessProp } from "./Noti";
import { ButtonGroup } from "@mui/material";
const useStyles = makeStyles({
  root: {
    backgroundColor: "#f4ffff",
    "& .MuiSvgIcon-root ": {
      height: "60px",
    },
  },
});

function App() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [circleColor, setCircleColor] = useState("green");
  const [mode, setMode] = useState("m");
  const direction = [
    { icon: <NorthWestIcon />, direction: 0 },
    { icon: <ArrowUpwardIcon />, direction: 3 },
    { icon: <NorthEastIcon />, direction: 0 },
    { icon: <ArrowBackIcon />, direction: 1 },
    { icon: <CircleIcon />, direction: 5 },
    { icon: <ArrowForwardIcon />, direction: 2 },
    { icon: <SouthWestIcon />, direction: 0 },
    { icon: <ArrowDownwardIcon />, direction: 4 },
    { icon: <SouthEastIcon />, direction: 0 },
  ];

  async function handleRequest(req) {
    await axios
      .post(`http://192.168.2.12:5000/controller?command=${req}`)
      .then((res) => console.log(res));
  }

  return (
    <Box
      className={classes.root}
      sx={{
        height: "600px",
        padding: "2px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "16px",
      }}
      border="2px solid blue"
    >
      <Grid sx={{ height: "400px", width: "400px" }} container>
        {direction.map((item) => {
          return (
            <Grid item xs={4}>
              <Box
                sx={{ height: "100%" }}
                display="flex"
                justifyContent="center"
              >
                {item ? (
                  <Button
                    onClick={() => handleRequest(item.direction)}
                    variant="outlined"
                    sx={{ width: "100%", height: "100%" }}
                  >
                    {item.icon}
                  </Button>
                ) : (
                  <Box></Box>
                )}
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Box pt={3}>
        <ButtonGroup>
          <Button
            onClick={() => setMode("m")}
            variant={mode === "m" ? "contained" : "outlined"}
          >
            Manual
          </Button>
          <Button
            onClick={() => setMode("a")}
            variant={mode === "a" ? "contained" : "outlined"}
          >
            Auto
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}

export default App;
