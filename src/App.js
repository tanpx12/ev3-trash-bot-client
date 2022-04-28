import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CircleIcon from "@mui/icons-material/Circle";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import NorthWestIcon from "@mui/icons-material/NorthWest";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import SouthWestIcon from "@mui/icons-material/SouthWest";
import { Box, Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { AlertSuccessProp } from "./Noti";

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
  const direction = [
    <NorthWestIcon />,
    <ArrowUpwardIcon
      onClick={() => {
        handleRequest(1);
        enqueueSnackbar("Forward", AlertSuccessProp);
      }}
    />,
    <NorthEastIcon />,
    <ArrowBackIcon />,
    <CircleIcon sx={{ color: circleColor }} />,
    <ArrowForwardIcon />,
    <SouthWestIcon />,
    <ArrowDownwardIcon />,
    <SouthEastIcon />,
  ];
  const keydownHandler = (e) => {
    switch (e.keyCode) {
      case 37:
        console.log("left key pressed");
        handleRequest(1);
        break;
      case 38:
        console.log("forward key pressed");
        handleRequest(3);
        break;
      case 39:
        console.log("right key pressed");
        handleRequest(2);
        break;
      case 40:
        console.log("back key pressed");
        handleRequest(4);
        break;
      default:
        break;
    }
  };

  async function handleRequest(req) {
    await axios
      .post("http://localhost:5000/command", { direction: req })
      .then((res) => console.log(res));
  }
  useEffect(() => {
    document.addEventListener("keydown", keydownHandler, false);
    return () => document.removeEventListener("keydown", () => {}, false);
  }, []);

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
                    variant="outlined"
                    sx={{ width: "100%", height: "100%" }}
                  >
                    {item}
                  </Button>
                ) : (
                  <Box></Box>
                )}
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Box fullWidth sx={{marginTop: "20px"}}>
        <Box>
          <Button
            variant="contained"
            sx={{ width: "50%", height: "80px", backgroundColor: "#009ab0"}}
          >
            <h3>MANUAL MODE</h3>
          </Button>
          <Button
            variant="outlined"
            sx={{ width: "50%", height: "80px"}}
          >
            <RestoreFromTrashIcon sx={{ color: "green" }} />
          </Button>
        </Box>
        <Button
          variant="outlined"
          sx={{ width: "100%", height: "80px", marginTop: "12px", backgroundColor: "#128a08", color: "#cfbca6" }}
        >
          <h3>AUTO MODE</h3>
        </Button>
      </Box>
    </Box>
  );
}

export default App;
