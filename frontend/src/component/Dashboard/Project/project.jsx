import { Card, Chip, Paper, TextField, Typography } from '@material-ui/core';
import React, { Component } from 'react'
export default function Project({project,index}){
    return  <Paper key={index}
                style={{ 
                  backgroundColor:"whitesmoke" ,
                  color: "#00000",
                  width: "80%",
                  display: "flex",
                  flexDirection: "column",
                  padding: "2%",
                  borderRadius: "1rem",
                  flexWrap:"true",
                  margin: "2%",
                  gap:"1rem"
                }}>
                <Typography variant='h4' style={{fontSize:"2rem", fontWeight:"bold" }}>
                  {project.title}
                </Typography>
                <Typography  style={{wordWrap:"break-word"}}>
                  {project.description}
                </Typography>
                <div>
                {project.skills &&
                  project.skills.map((data) => {
                    return (
                      <Chip
                        style={{
                          color: "red",
                          width: "10%",
                          margin: "0.2rem",
                          border:"solid"
                        }}
                        label={data}
                        variant="outlined"
                      />
                    );
                  })}
                </div>
              </Paper>
    ;
}