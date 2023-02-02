import React,{ useEffect,useState } from 'react'
import{useNavigate}from "react-router-dom"
import Table from './Table'
export default function Home(props) {
    const nav=useNavigate()
    const[add,setadd]=useState(false)
    const[activity,setactivity]=useState("")
    const[data,setdata]=useState([])

    const{email,token,settoken}=props
    useEffect(()=>{
        fetch("http://localhost:3500/home",{
                method:"GET",
                headers:{
                "Accept":"application/json",
                "Content-Type":"application/json" ,
                "Authorization":token
               }
              
            }).then(x=>x.json()).then(y=>{
                if(y.status==="sucess"){
                setdata(y.data)
            }
                else{
                    alert(y.message)
                }
            })
    },[])
    
    const handelfun=(e)=>{
        e.preventDefault()
        console.log(activity)
        fetch("http://localhost:3500/home",{
                method:"POST",
                headers:{
                "Accept":"application/json",
                "Content-Type":"application/json" ,
                "Authorization":token
               },
               body:JSON.stringify({status:"Pending",timetaken:" ",activity:activity})
            }).then(x=>x.json()).then(y=>{
                console.log(y);
                setdata([...data,{status:"Pending",timetaken:" ",activity:activity}])
            })
    }
  return (
    <div className='homeconatiner'>
        <div className='header'>{email}</div>
        <div className='bottom'>
            <div className='nav'>
                <h1>TODOLIST</h1>
                <h3>HISTORY</h3>
                <div>
                    <button onClick={()=>{
                        settoken("")
                        alert("logout")
                        nav("/login")

                    }}>Logout</button>
                </div>
            </div>
            <div className='timercontent'>
                <div className='add'>
                    <div>
                    {add?<form onSubmit={handelfun}>
                        <input type="text" placeholder='activity' onChange={(e)=>{setactivity(e.target.value);}}/>
                        <button type="submit">Add</button>
                        <button onClick={()=>setadd(!add)}>close</button></form>:<></>}
                    </div>
                    <div>
                        <button onClick={()=>setadd(!add)}>Add Activity</button>
                    </div>
                </div>
                <div>
                    <Table data={data} token={token}/>
                </div>
                
            </div>
        </div>

    </div>
  )
}
