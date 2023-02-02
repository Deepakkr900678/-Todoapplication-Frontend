import React,{ useState } from 'react'
import {Link,useNavigate} from"react-router-dom"
export default function Login(props) {
    const nav=useNavigate()
    const{settoken,setemail}=props
    const[form,setform]=useState({email:"", password:""})
    const eventhandler=(e)=>{
        e.preventDefault()
        fetch("http://localhost:3500/login",{
            method:"POST",
            headers:{
            "Accept":"application/json",
            "Content-Type":"application/json" 
           },
           body:JSON.stringify(form)
        }).then(x=>x.json()).then(y=>{
            if(y.status==="sucess"){
                setemail(form.email)
                settoken(y.token)
                nav("/home")
            }else{
                alert(y.message)
            }
            })
    }
  return (
    <div className='parent'>
        <div className="container">
            <h1>LOGIN</h1>
            <form onSubmit={eventhandler}>
                <div>
                    <input type="email" required placeholder='EMAIL@GMAIL.COM' onChange={(e)=>setform({...form,email:e.target.value})}/>
                </div>
                <div>
                    <input type="password" required placeholder='PASSWORD'onChange={(e)=>setform({...form,password:e.target.value})}/>
                </div>
                <button type="submit">LOGIN</button>
            </form>
            Need an account?<Link to="/">REGISTER</Link>
        </div>
    </div>
  )
}
