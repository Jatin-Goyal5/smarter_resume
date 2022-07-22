import { Avatar, Box, Button, Container, Grid, Typography } from '@material-ui/core';
import { ShareOutlined } from '@material-ui/icons';
import React, { Component, useCallback, useEffect, useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import Project from './Project/project';
import Skill from './skills/skill';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
export default function Report(){
    const [user , setUser] = useState({});
    const {getDetail} = useContext(AuthContext);
    useEffect(()=>{
        (async()=>{
            let user = await getDetail('user');
            let skills = await getDetail("skill");
            let projects = await getDetail('project');
            user= {
                ...user,
                skills:skills,
                projects: projects,
            }
            console.log(user);
            setUser(user)
        })()
    },[])
    const handleCaptureClick = useCallback(async () => {
        const downloadElement =
        document.getElementById('download');
      if (!downloadElement) return;
  
      const copieddownloadElement = downloadElement.cloneNode(
        true
      );
      copieddownloadElement.style.position = 'fixed';
      copieddownloadElement.style.right = '100%';
      copieddownloadElement.style.height = 'auto';
      document.body.append(copieddownloadElement);
      const canvas = await html2canvas(copieddownloadElement);
      copieddownloadElement.remove();
      const dataURL = canvas.toDataURL('image/png');
      downloadjs(dataURL, 'download.png', 'image/png');
      }, []);
    
    return <div  style={{width:"80%" , margin:"2rem",gap:"1rem"}}>
        <Box style={{gap:"0.5rem" , color:"red", display:"flex" ,justifyContent:"space-between"}}>
           <Typography variant='h4' style={{fontSize:"1.5rem",fontWeight:"bold", color:"red" ,marginTop:"1rem"}}>  My Report </Typography>
            <div style={{gap:"2rem", display:"flex"}}>
            <Button variant="outlined" onClick={{}}>
                Share
                <ShareOutlined></ShareOutlined>
            </Button>
            <Button variant="contained" onClick={handleCaptureClick}>
                Download
               <FileDownloadOutlinedIcon></FileDownloadOutlinedIcon>
            </Button>
            </div>
        </Box>
        <div id="download">
        <Box style={{ display:"flex",padding:"1rem",gap:"2rem", alignItems :"center" ,color: "#00000" , minHeight:"12rem" ,width:"100%" }}>
        <Avatar style={{width:"8rem",height:"8rem"}}>{user.name && user.name[0]}</Avatar>
            <div style={{display:"flex", justifyContent:"space-between",flexDirection:"column", width:"100%"}}>
                <Typography variant='h4' style={{fontSize:"2rem",fontWeight:"bold" ,marginTop:"1rem"}}>{user.name}</Typography>
                <Typography variant='h4' style={{fontSize:"1rem", color:"red" }}>{user.location}</Typography>
                <div style={{display:"flex", justifyContent:"space-between", width:"80%"}}>
                <Typography variant='h4' style={{fontSize:"1rem"}}>{user.email}</Typography>
                <Typography variant='h4' style={{fontSize:"1rem",}}>{user.contact}</Typography>
                </div>

            </div>
        </Box>
        <Typography variant='h4' style={{fontSize:"1rem", color:"red" ,margin:"1rem"}}>About Me</Typography>
        <Box style={{  backgroundColor:"whitesmoke" ,color: "#00000", minHeight:"12rem" ,padding:"1rem",borderRadius:"2rem",wordWrap:"break-word" }}>
            {user.about}
        </Box>
        <Typography variant='h4' style={{fontSize:"2rem", fontWeight:"bold",margin:"1rem"}}>Skills</Typography>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {
           
            user.skills && user.skills.map((data,index)=>{
                return (
                    <Grid item xs={6}>
                      <Skill skill={data} index={index}></Skill>
                    </Grid>
                  );
            })
        }
        </Grid>
        <Typography variant='h4' style={{fontSize:"2rem", fontWeight:"bold",margin:"1rem" }}>Projects</Typography>
        <div>
        {
        user.projects && user.projects.map((data, index) => {
            return (
              <Project project={data} index={index}></Project>
            );
          })}
      </div>
    </div>
    </div>;
}