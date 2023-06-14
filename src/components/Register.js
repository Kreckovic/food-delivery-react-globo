import { useState} from 'react'
import './Register.css'
import{auth} from '../firebase-config.js'
import { createUserWithEmailAndPassword } from "firebase/auth"

export const Register = () => {

    const [registerEmail, setregisterEmail] = useState("");
    const [registerPassword, setregisterPassword] = useState("");

    const register = async () =>{

        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
            console.log(user)
        } catch (error) {
            console.log(error.message)
        }

        

    }

    return(
        <div className='registerPage'>
            <h1 className='registerTitle'> Register PAGE </h1>
                <div className='registerForm'>   
                    <h5> Your email</h5>
                    <input type='text' onChange={(event) => setregisterEmail(event.target.value)}  placeholder='your email'></input>
                    <h5> Your password</h5>
                    <input type='password' onChange={(event) => setregisterPassword(event.target.value)}  placeholder='password'></input>
                    <h5> Repeat password</h5>
                    <input type='password' placeholder='repeat password'></input>
                </div>
            <button className='dugme' onClick={register}> Sign me up </button>
        </div>
    )
}