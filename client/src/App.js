import React from "react";
import { Typography, AppBar } from "@mui/material";
import { makeStyles } from "@mui/styles"

import VideoPlayer from "./components/VideoPlayer";
import Options from "./components/Options";
import Notifications from "./components/Notifications";
import { red } from "@mui/material/colors";
// const GlobalCss = withStyles({
//   '@global': {
//     '.MuiAppBar-root': {
//       background: 'transparent',
//       boxShadow: 'none'
//     }
//   }
// })(() => null)

const useStyles=makeStyles((theme)=>({
  
  appBar: {

    borderRadius: 35,
    margin: '30px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    marginLeft:'2em',
    marginRight:'2em',
    // padding:'1em',

    // border: '82px solid black',
    backgroundColor: 'red'
    
  },
  
head:{
  width:'50%',
  backgroundColor:'#043c62',
  // backgroundColor:'red',
  textAlign:'center',
  color:'#4f9a91'
// color:'red'
},
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
}));

const App = () => {
  const classes=useStyles();

  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position="static" color="transparent" elevation={0} >
        <Typography className={classes.head} variant="h2" align="center">
          Video Chat{" "}
        </Typography>
      </AppBar>
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </div>
  );
};

export default App;
