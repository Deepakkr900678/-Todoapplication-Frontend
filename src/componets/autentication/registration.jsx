import React,{useState} from 'react'
import {Link,useNavigate} from "react-router-dom"
export default function Registration() {
    
    const nav=useNavigate()
    const[form,setform]=useState({email:"",password:"",conform:""})
    const eventhandler=(e)=>{
        e.preventDefault()
        console.log(form)
        if(form.password!==form.conform){
            alert("password doesn't match")
        }else{
            fetch("http://localhost:3500/register",{
                method:"POST",
                headers:{
                "Accept":"application/json",
                "Content-Type":"application/json" 
               },
               body:JSON.stringify({email:form.email,password:form.password})
            }).then(x=>x.json()).then(y=>{
                if(y.status==="sucess"){
                    alert(y.message)
                    nav("/login")
                }else{
                    alert(y.message)
                }
            })
        }
    }
  return (
    <div className='parent'>
        <div className="container">
            <h1>REGISTER</h1>
            <form onSubmit={eventhandler}>
                <div>
                    <input type="email" required placeholder='EMAIL@GMAIL.COM' onChange={(e)=>setform({...form,email:e.target.value})}/>
                </div>
                <div>
                    <input type="password" required placeholder='PASSWORD'onChange={(e)=>setform({...form,password:e.target.value})}/>
                </div>
                <div>
                    <input type="password" required placeholder='CONFORM PASSWORD'onChange={(e)=>setform({...form,conform:e.target.value})}/>
                </div>
                <button type="submit">
                    REGISTER
                </button>
            </form>
            Already a user?<Link to="/login">LOGIN</Link>
        </div>
    </div>
  )
}
