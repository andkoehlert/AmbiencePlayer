import React, { useState} from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase'
const SignUp = ({isAuthenticated}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential)
        }).catch(() => {
console.log("error")        })
    }


    
  if (isAuthenticated) {
    console.log('Not authenticated. Redirecting or showing a message...');

    return <p>You are not authorized to access this page.</p>;
    
  }
  return (
    <div className="sign-in-container flex justify-content justify-end py-20">
        <form onSubmit={signUp}>
            <h1>Create an account</h1>
            <input type="email" 
                placeholder="Enter your email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}/>
                
            <input type="password" 
                placeholder="enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                />
            <button type="submit">Sign up</button>
        </form>
    </div>
  )
}

export default SignUp