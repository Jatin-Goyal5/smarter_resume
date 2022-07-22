import React, { Component, useContext, useEffect, useState } from "react";
import {
  Paper,
  Typography,
} from "@material-ui/core";
import { Rating } from "@mui/material";

export default function Skill({skill, index}) {
  console.log(skill);
    return <Paper className="greeting" key={index} style={{    
        backgroundColor:"whitesmoke" ,
        padding: "1rem",
        textAlign: 'center',
        margin:"1rem",
        color: "#00000"}}>
   <Typography  button>
       {skill.name}
   </Typography>
    <Rating
      value={skill.rating}
      readOnly
    />
</Paper>;

}