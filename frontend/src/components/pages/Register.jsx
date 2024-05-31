import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"
import Logo from "../assets/logo.svg"
import "../../../src/index.css"
import { useState,useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
  
export const Register = () => {
    const navigate = useNavigate()

    const [form ,setForm]  = useState({username:"",email:"",password:"",confirmPassword:""})
    
    useEffect(()=> {
        if (localStorage.getItem("chat-app-user")) {
            navigate("/")
        }
    },[])


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (await handleValidation()) {
            try {
                const {password,username,email} = form;
            const response = await axios.post(registerRoute,{
                username,
                password,
                email,
            });

            // After i got response from the Backend i need to write this code....
            if (response.data.status === false) {
                toast.error(response.data.msg,toastOptions)
            }
            if (response.data.status === true) {
                localStorage.setItem("chat-app-user",JSON.stringify(response.user))
                navigate("/")
            }
            }catch(error) {
            console.log(`${error}`)
            }
        }
    }

    const toastOptions = {
        position : "bottom-right",
        autoClose: 8000,
        pauseOnHover : true,
        draggable: true,
        theme:"dark",
    }

    const handleValidation = () => {
        const {username,email,password,confirmPassword} = form
        if (password !== confirmPassword) {
            toast.error("password and confirm password should be same " ,toastOptions)
            return false
        } else if (username.length < 4) {
            toast.error ( "Username should be equal or greater than 4 characters",toastOptions)
            return false
        } else if (password.length < 4) {
            toast.error("Password should be equal or  greater than 8 characters",toastOptions)
        return false
        }
        else if (email === ""){
            toast("Email required",toastOptions)
        }
        return true

        

    }


    const handleChange = (event) => {
        const {name,value}= event.target
        setForm({...form,[name]: value})
    }

    
    return (
        <>
        <FormContainer>

        <form onSubmit={(event)=>{handleSubmit(event)}}>
            <div className="brand">
                <LogoImg src={Logo} alt="Logo" />
                <h1>snappy</h1>

            </div>  
                <input type="text"
                placeholder="Username"
                name="username"
                // className="form-control"
                onChange={(e)=>handleChange(e)}/>

                <input type="email"
                placeholder="Email"
                name="email"
                onChange={(e)=>handleChange(e)}/>

                <input type="password"
                placeholder="Password"
                name="password"
                onChange={(e)=>handleChange(e)}/>

                <input type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={(e)=>handleChange(e)}/>

                <button type="submit">Create User</button>
                <span>Already have an account  <Link to="/login">Login</Link></span>
            
                </form>
        </FormContainer>
        <ToastContainer/>
        </>
    )
}   



const FormContainer = styled.div`
    height: 100vh;
    width:100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap:1rem;
    align-items:center;
    background-color : #131324;
    .brand {
        display:flex;
        align-items: center;
        gap:1rem;
        justify-content:center;
        img {
            height:5rem;
        }
    }
    h1 {
        color: white;
        text-transform : uppercase;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color:#00000076;
        border-radius:2rem;
        padding : 3rem 5rem;
        input {
            background-color : transparent;
            padding : 1rem;
            border : 0.1rem solid #4e0eff;
            border-radius : 0.4rem; 
            color : white;
            width : 100%;
            font-size : 1rem;
            &:focus {
                border : #997af0 0.1rem solid;
                outline : none;


            }

        }
    
    }
    button {
        background-color  : #9971f0;
        color : white;
        padding : 1rem 2rem;
        border-radius: 1rem;
        border : none;
        font-weight: bold;
        font-size: 1rem;
        text-transform:  uppercase;
        transition: o.5s ease-in-out;
        &:hover{
            background-color : #4e0eff;
        }

    }
    span  {
        color : white;
        text-tranform: uppercase;
    }
    a {
        color : #4e0eff;
        text-decoration: none;
    }
    

`;


const LogoImg = styled.img`
{
    height: 20vh;
    width : 20vw;
    background-color: white;
    cursor : pointer;

}`
