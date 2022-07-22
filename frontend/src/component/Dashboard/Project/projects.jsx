import React, {  useContext, useEffect ,useState} from "react";
import { Box, Button, Chip, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, Input, MenuItem, OutlinedInput, Select, TextField, Typography
} from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { SearchOutlined } from "@material-ui/icons";
import { AuthContext } from "../../../context/AuthProvider";
import Project from "./project";
export default function Projects() {
const [open, setOpen] = useState(false);
const [skill, setSkill] = useState([]);
const [projectname, setProjectname] = useState("");
const [projectdescription, setProjectdescription] = useState("");
const { addProject, getDetail } = useContext(AuthContext);
const [projects, setProjects] = useState([]);
const [availableSkills , setAvailableskills] = useState([]);
const [showSearch , setShowsearch] = useState(false);
const [searchProject , setSearchProject] = useState('');
let [filteredProject,setFilteredProject]=useState([]);

const handleChange = (event) => {
  const {
    target: { value },
  } = event;
  setSkill(typeof value === "string" ? value.split(",") : value);
};

  useEffect(() => {
    (async()=>{
      let data = await getDetail('project');
      let skillsResponse = await getDetail('skill');
      skillsResponse = skillsResponse.map((data)=>{
        return data.name;
      })
      setAvailableskills(skillsResponse);
      console.log(skillsResponse);
      setProjects(data);  
    })();
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (e)=>{
    setSearchProject(e.target.value);
    if(e.target.value===""){
      setShowsearch(false);
      setFilteredProject([]);
    }
    else {
      setShowsearch(true);
      filteredProject = projects.filter(
        (data) => {
          return data
            .title
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) 
           
        }
      );
      setFilteredProject(filteredProject);
    }
  }


  const handleAddProject = async () => {
    try {
      setOpen(false);
      if (projectname.length === 0) {
        return;
      }
      await addProject(projectname, projectdescription, skill);
      let data = await getDetail("project");
      setProjects(data);
      setProjectname("");
      setProjectdescription("");
      setSkill([]);
    } catch (err) {}
  };



  return (
    <Container style={{display:"flex", flexDirection:"column" , padding:"5rem",gap:"2rem"}}>
      <Box style={{display:"flex",gap:"2rem"}}>
        <TextField
          variant="filled"
          value={searchProject}
          onChange={handleSearch}
          placeholder="Search for Project"
          style={{ width: "50%", borderRadius: "5rem" }}
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
          Add Project
        </Button>
        <Dialog onClose={handleClose} fullWidth  open={open}>
          <DialogTitle style={{width:"80%", display:"flex",justifyContent:"space-between"}}> Add a New Project
            <IconButton
             style={{
              position: "absolute",
              marginLeft: "22rem",
            }}
              onClick={handleClose}
              ><CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers style={{
              display: "flex",
              flexDirection: "column",
              color: "red",
              fontWeight:"bolder",
              gap: "0.5rem"
            }}
            ><Typography variant="h6">Project Title</Typography>
           <TextField 
            type="text"
            variant="filled"
            style={{borderRadius:"0rem 5rem 5rem 5rem"}}
            placeholder="Enter your project title"  
            InputProps={{ disableUnderline: true }}
              name="title"
              autoFocus
              value={projectname}
              onChange={(e) => {
                setProjectname(e.target.value);
              }}
            /><Typography variant="h6">Project Description</Typography>
             <TextField 
              type="text"
              variant="filled"
              multiline
              minRows={4}
              style={{borderRadius:"0rem 5rem 5rem 5rem",wordBreak:"break-word" }}
              InputProps={{ disableUnderline: true }} 
              placeholder="Enter your project description"
              id="description"
              name="description"
              autoFocus
              value={projectdescription}
              onChange={(e) => {
                setProjectdescription(e.target.value);
              }}
            />
            <Typography variant="h6">Add Project Skills</Typography>
            <FormControl sx={{ m: 4 ,p:1}}>
                <Select
                  multiple
                  value={skill}
                  onChange={handleChange}
                  input={<OutlinedInput/>}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}>
                  { availableSkills && availableSkills.map((data) => (
                    <MenuItem key={data} value={data}>
                      {data}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleAddProject} variant="contained" style={{backgroundColor:"red"}}>
              Save changes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <div>
        {
          (showSearch?
            filteredProject: projects).map((data, index) => {
            return (
              <Project project={data} index={index}></Project>
            );
          })}
      </div>
    </Container>
  );
}
