import {  TextField ,Container ,Checkbox,FormControlLabel, Button, Typography} from '@material-ui/core';
import {React, useContext, useState} from 'react';
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from '../../context/AuthProvider';
import './signup.css';
const Signup = (props) => {

    const {signUp}= useContext(AuthContext);
    const [email, setEmail]= useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const history = useHistory();
    const handleSignup = async (e) => {
        try {
          if(password  != confirmPassword){
            alert('password not match confirm password');
            return;
          }else if(email.includes('@') == false){
            alert('email must be correct');
            return;
          }
          await signUp(email, password);
          history.push("/dashboard");
        } catch (err) {
         console.log(err);
        }
      };
    return <>
     
       <Container maxWidth="xs" className='form'>
       <Typography  variant="h5">
            Sign Up
          </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              variant="outlined"
              label="Email Address"
              value={email} 
              onChange={(e) => { setEmail(e.target.value); }} 
              name="email"
              autoFocus
            />
             <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              variant="outlined"
              label="Password"
              type="password"
              id="password"
              value={password} 
              onChange={(e) => { setPassword(e.target.value); }} 
            />
            <TextField
              margin="normal"
              required
              fullWidth
              variant="outlined"
              name="confirmPassword"
              label="confirmPassword"
              type="password"
              id="confirmPassword"
              value={confirmPassword} 
              onChange={(e) => { setConfirmPassword(e.target.value); }} 
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSignup}
            >
              Sign up
            </Button>
            <Typography>Already have an account yet ? <Link to="/login"> Sign In here</Link></Typography>

       </Container>
    </>;
}


export default Signup;