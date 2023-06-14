import { NavLink } from 'react-router-dom'
import { onAuthStateChanged, signOut, } from 'firebase/auth';
import {  auth } from '../firebase-config';
import './NavBar.css'
import { useState } from 'react';


export const NavBar = () => {


    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {setUser(currentUser);});


    const logout = async() => {
        await signOut(auth)
      }


      return(
        <div className='navbar'>
        {
            user? (<div>
                <NavLink to={"/"}> Home </NavLink>
              User: {user.email}
              <button onClick={() => logout()}>Logout</button>
            </div>):
            (<div>
               < NavLink to={"/"}> Home </NavLink>
            <NavLink to={"/login"}> Login </NavLink>
            <NavLink to={"/register"}> Register </NavLink>
            </div>)
            }
        

        </div>
       
    )
}
