import {  TextField ,Container ,Checkbox,FormControlLabel, Button, Typography} from '@material-ui/core';
import {React, useContext, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import './login.css';
const Login = (props) => {
    const {login}= useContext(AuthContext);
    const [email, setEmail]= useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();
    
    const handleLogin = (e) => {
        try {
          e.preventDefault();
          if(email.length === 0 || email.password === 0){
            alert(`email or password can't be null`);
            return;
          }else if(email.includes('@') === false){
            alert(`email should contain @gmail.com`);
              return;
          }
          
          login(email, password).then(()=>{
            history.push("/dashboard");
          });
        } catch (err) {
         console.log(err);
        }
      };
    return <>
       <Container maxWidth="xs" className='form'>
       <Typography component="h1" variant="h5">
            Sign in
          </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              variant="outlined"
              name="email"
              autoFocus
              value={email} 
              onChange={(e) => { setEmail(e.target.value); }} 
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
          <Typography>Don't have an account <Link to="/signup"> signup</Link></Typography>
       </Container>

      {/* </div> */}
    </>;
}

export default Login;