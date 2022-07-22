import React, { Component, useContext, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { Box, Button, Container, IconButton, OutlinedInput, TextareaAutosize, TextField, Typography } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import { AuthContext } from '../../context/AuthProvider';
import { Edit, SaveOutlined } from '@material-ui/icons';
import { useEffect } from 'react';
export default function Profile(){
    const [email , setEmail] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [contact , setContact] = useState('');
    const [about, setAbout] = useState('');
    const {updateUser, getDetail} = useContext(AuthContext);
    const [edit,setEdit] = useState(true);

    useEffect(()=>{
        (async()=>{
          let response = await getDetail('user');
          setEmail(response.email);
          setContact(response.contact);
          setName(response.name);
          setLocation(response.location);
          setAbout(response.about);
        })()
    },[]);

    const handleSaveUser = async ()=>{
        try{
            let obj = {
                name:name,
                location: location,
                email: email,
                contact: contact,
                about: about,
            }
            await updateUser(obj);
        }catch(err){
            console.log(err);
        }
    }
    const handleEdit= ()=>{
        setEdit(!edit);
        console.log(!edit);
    }
    return <Container style={{display:"flex", flexDirection:"column" , gap:"2rem"}}>
        <Box style={{ display:"flex",padding:"1rem",gap:"5rem", alignItems :"center" ,color: "#00000", minHeight:"12rem",  }}>
            <Avatar sx={{ width: 100, height: 100 ,backgroundColor:"red"}}>{name&& name[0]}</Avatar>
            {edit? <div style={{width:"80%"}}>
                <Typography variant='h4' style={{fontSize:"1.5rem",fontWeight:"bold", marginTop:"1rem"}} >{name}</Typography>
                <Typography>{location}</Typography>
                </div>:
                <div style={{display:"flex", flexDirection:"column",width:"60%"}}>
                <TextField value={name} onChange={(e)=>setName(e.target.value)}></TextField>
                <TextField value={location} onChange={(e)=>setLocation(e.target.value)}></TextField>
                </div>}
            <IconButton color="primary" onClick={handleEdit} style={{}}>
                {edit? <EditIcon></EditIcon>: <SaveOutlined></SaveOutlined>}
            </IconButton>
        </Box>
        
        <Box style={{width:"80%" ,display:"flex", flexDirection:"column", gap:"1rem",fontWeight:"bold" ,color:"red"}}>
        <Typography variant="h5" style={{fontWeight:"bold"}} >Email address</Typography>
        <TextField 
            type="email"
            variant="filled"
            style={{borderRadius:"0rem 5rem 5rem 5rem"}} 
            placeholder="Enter your email address" 
            InputProps={{ disableUnderline: true }}
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email} 
              readOnly 
            />
        <Typography variant="h5" style={{fontWeight:"bold"}}  >Contact</Typography>
        <TextField 
            variant="filled"
            style={{borderRadius:"0rem 5rem 5rem 5rem"}} 
            placeholder="Enter your contact" 
            InputProps={{ disableUnderline: true }}
            id="contact"
            type="number"
            name="contact"
            autoComplete="contact"
            autoFocus
            value={contact} 
            onChange={(e) => { setContact(e.target.value); }} 
        />
            <Typography variant="h5" style={{fontWeight:"bold"}}>About Me</Typography>
            <TextField 
              type="text"
              variant="filled"
              multiline
                minRows={7}
                InputProps={{ disableUnderline: true }}
                aria-label="empty textarea"
            
                placeholder="Tell me about yourself"
                value={about}
                onChange={(e)=>{setAbout(e.target.value)}}    
            />
        <Button variant="contained" style={{backgroundColor :"red" , width:"5rem"}} onClick= {handleSaveUser}> Save </Button>
        </Box>
    </Container>;
}