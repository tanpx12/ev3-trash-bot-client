import { Box, Button, Grid } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SouthWestIcon from "@mui/icons-material/SouthWest";
import NorthWestIcon from "@mui/icons-material/NorthWest";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthEastIcon from "@mui/icons-material/SouthEast";
import CircleIcon from "@mui/icons-material/Circle";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const direction = [
    <NorthWestIcon />,
    <ArrowUpwardIcon onClick={() => handleRequest(1)} />,
    <NorthEastIcon />,
    <ArrowBackIcon />,
    <CircleIcon />,
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
    <>
      <Box sx={{ height: "200px", padding: "2px" }} border="2px solid blue">
        <Grid sx={{ height: "100%" }} container>
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
        <Box fullWidth>
          <Button variant="outlined" sx={{ width: "20%", height: "20%", margin: "0 auto" }}>
            <RestoreFromTrashIcon sx={{color: "green"}}/>
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default App;
