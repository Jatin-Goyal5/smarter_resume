import React, { Component, useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { SearchOutlined } from "@material-ui/icons";
import { Rating } from "@mui/material";
import { AuthContext } from "../../../context/AuthProvider";
import Skill from "./skill";

export default function Skills() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(1);
  const [skillname, setSkillname] = useState("");
  const { addSkill, getDetail } = useContext(AuthContext);
  const [item, setItems] = useState([]);
  const [showSearch , setShowsearch] = useState(false);
  const [searchSkill , setSearchSkill] = useState('');
  let [filteredSkill,setFilteredSkill]=useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (e)=>{
    setSearchSkill(e.target.value);
    if(e.target.value===""){
      setShowsearch(false);
      setFilteredSkill([]);
    }
    else {
      setShowsearch(true);
      filteredSkill = item.filter(
        (data) => {
          return data
            .name
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) 
           
        }
      );
      setFilteredSkill(filteredSkill);
    }
  }
  

  useEffect(() => {
    async function skiller() {
      let data = await getDetail("skill");
      setItems(data);
    }
    skiller();
    // items= data.data;
  }, []);

  const handleAddSkill = async () => {
    try {
      setOpen(false);
      await addSkill(skillname, value);
      let data = await getDetail("skill");
      setItems(data);
      setSkillname("");
      setValue(1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container style={{display:"flex", flexDirection:"column" , padding:"5rem",gap:"2rem"}}>
      <Box style={{display:"flex",gap:"2rem"}}>
        <TextField
          id="standard-bare"
          variant="filled"
          placeholder="Search for Skill"
          value ={searchSkill}
          onChange={handleSearch}
          style={{ width: "80%" }}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchOutlined />
              </IconButton>
            ),
          }}
        />
        <Button
          variant="contained"
          style={{ height: "3rem", color: "white", background: "red" }}
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add Skill
        </Button>
        <Dialog fullWidth onClose={handleClose} open={open}>
          <DialogTitle>
            ADD SKILL
            <IconButton
              aria-label="close"
              onClick={handleClose}
              style={{
                position: "absolute",
                marginLeft: "25rem",
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                color: "red",
                gap: "1rem",
                fontWeight: "bold",
              }}
            >
              <Typography variant="h6">Skill</Typography>
              <OutlinedInput
                style={{ borderRadius: "0rem 2rem 2rem 2rem" }}
                placeholder="Enter your skill"
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                value={skillname}
                onChange={(e) => {
                  setSkillname(e.target.value);
                }}
              />
              <Typography>How Would you like to rate yourself?</Typography>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleAddSkill} variant="contained">
              Save changes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {
          (showSearch?
           filteredSkill && filteredSkill: item && item).map((data, index) => {
          return (
            <Grid item xs={6}>
              <Skill skill={data} index={index}></Skill>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
