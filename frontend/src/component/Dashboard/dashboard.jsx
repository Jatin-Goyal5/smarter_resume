import React ,{useEffect, useState}from 'react';
import { ListItem,Paper,List, ListItemIcon, Grid, Divider} from '@material-ui/core';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import Skills from '../Dashboard/skills/skills';
import Project from './Project/projects';
import Report from './report';
import Profile from './profile';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { ExitToApp } from '@material-ui/icons';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

export default function Dashboard() {
    const [selected, setSelected] = useState('0');
    const {currentUser,signOut} = useContext(AuthContext);
    const item= [
        {
            id: '0',
            title: 'My Profile',
            component:<Profile></Profile>,
            icon: <AccountBoxIcon></AccountBoxIcon>
        },
        {
            id: '1',
            title: 'My Skills',
            component: <Skills></Skills>,
            icon: <SignalCellularAltIcon></SignalCellularAltIcon>
        },
        {
            id: '2',
            title: 'My Projects',
            component: <Project></Project>,
            icon:<CreditCardIcon></CreditCardIcon>
        },
        {
            id: '3',
            title: 'My Report',
            component: <Report></Report>,
            icon: <AssessmentIcon></AssessmentIcon>
        }

    ]
const changeSelect =(idx)=>{
    setSelected(idx);
    
}

useEffect(()=>{
    console.log(selected);
    console.log(currentUser);
}, [selected])

  return <Grid container >
       <Grid item xs={3} style={{ backgroundColor: "whitesmoke",borderRadius:"2rem" , marginRight:"1rem",boxSizing: "border-box",display:"flex",flexDirection:"column",minHeight:"100vh",alignItems:"space-between" }}>
            <List  style={{color:"#00000",display:"flex",position:"sticky",flexDirection:"column", width:"100%", marginTop:"5rem", alignItems:"center"}}>
                { item.map((data, index) => {
                    return (<div onClick={()=>{changeSelect(index)}} key={index}>
                    <ListItem key={index}  button selected= {index== selected? true:false} >
                    <ListItemIcon>
                        {data.icon}
                        </ListItemIcon>
                        {data.title}
                    </ListItem>
                </div>);
                })}
                
            </List>
            <div style={{color:"#00000",display:"flex", justifyContent:"center",marginTop: "100%" ,marginLeft:"28%"}}
                onClick={signOut}
            >
                <ListItem button ><ListItemIcon><ExitToApp></ExitToApp></ListItemIcon> Sign OUT</ListItem>
            </div>
           
       </Grid>
       <Grid  item xs={8} style={{borderRadius:"2rem", }}>
            {item[selected].component}
       </Grid>
    </Grid>
}
