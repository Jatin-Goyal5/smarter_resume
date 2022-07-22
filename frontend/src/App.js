
import './App.css';
import { AuthContext, AuthProvider } from './context/AuthProvider';
import Signup from './component/SignUp/signup';
import Login from './component/Login/login';
import Dashboard from './component/Dashboard/dashboard';
import { BrowserRouter as Router, Route, Switch ,Redirect} from "react-router-dom";
import { useContext } from 'react';


function App() {
  return (
    <AuthProvider>
   
    <Switch>
      <PrivateRoute  exact path ="/dashboard" comp = {Dashboard} ></PrivateRoute>      
       <Route path ="/signup" component = {Signup} exact></Route>
      <Route  path="/login" component = {Login} exact></Route>
      <Route  path="/" component = {Login} exact></Route>
    </Switch>
  </AuthProvider>
  );
}

function PrivateRoute(props){

  let { comp: Component ,path} = props;

  let {currentUser} = useContext(AuthContext);
  return currentUser?
  (<Route path={path} component={Component}></Route>):(
  <Redirect to="/login"></Redirect>);


}

export default App;
