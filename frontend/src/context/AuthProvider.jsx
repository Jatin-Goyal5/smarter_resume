import React, { useEffect,useState } from 'react';
import axios from 'axios';
export const AuthContext = React.createContext(); 

export function AuthProvider ({children}){
    const [currentUser,setCurrentUser] =useState(localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null);
    
   async function login(email,password){
        try{
            let response = await axios.post("http://localhost:5000/user/login", {"email":email,"password":password})
            console.log(response);
            if(response){
                let user = response.data;
                    localStorage.removeItem("user");
                    setCurrentUser(user);
                    localStorage.setItem("user", JSON.stringify(user));
               
                
            }else{
                alert("failed auth");
                return;
            }
            
        }catch(err){
            console.log(err);
            alert("failed auth");
        }
    }
    async function signUp(email,password){
        try{
            let response = await axios.post("http://localhost:5000/user/signup", {"email":email,"password":password})
            console.log(response);
            if(response){
                let user = response.data;
                    localStorage.removeItem("user");
                    setCurrentUser(user);
                    localStorage.setItem("user", JSON.stringify(user));
               
            }else{
                alert("failed auth");
                return;
            }
            
        }catch(err){
            console.log(err);
            alert("failed auth");
        }
        
    }
    function signOut(){
      setCurrentUser(null);
      localStorage.removeItem("user");
    }

    async function addSkill(name , rating){
        try{
            let response = await axios.post("http://localhost:5000/skill",{name:name, rating: rating},
            {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': currentUser.data.token,
                }
            }
            )
            console.log(response);
          }catch(err){
              console.log(err);
          }
    }

    async function addProject(title , description, skills){
        try{
            let response = await axios.post("http://localhost:5000/project",{title:title, description: description, skills: skills},
            {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': currentUser.data.token,
                }
            }
            )
            console.log(response);
          }catch(err){
              console.log(err);
          }
    }

    

    async function  getDetail(endPoint){
        try{
            console.log(currentUser);
            let response = await axios.get(`http://localhost:5000/${endPoint}`,{
                headers: {
                'Content-Type': 'application/json',
                'Authorization': currentUser.data.token,
                }
            });
            console.log(response);
            return response.data.data;
        }catch(err){
            console.log(err);
        }
    }

    async function updateUser(obj){
        try{
            
            let response = await axios.put("http://localhost:5000/user",obj,
            {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': currentUser.data.token,
                }
            }
            )
            console.log(response);
          }catch(err){
              console.log(err);
          }
    }
    
    
    useEffect(()=>{
        console.log(currentUser);
    },[currentUser]);

    let values ={
        currentUser: currentUser,
        login:login,
        signOut:signOut,
        signUp :signUp,
        addSkill: addSkill,
        addProject: addProject,
        updateUser: updateUser,
        getDetail: getDetail,
    }

    return (<AuthContext.Provider value={values}>
        {children}
    </AuthContext.Provider>);

}