import React,{ useEffect,useState } from 'react'

export default function Timer(props) {
  const{oneStart,setOneStart,data,token}=props
    const[sec,setsec]=useState(0)
    const[min,setmin]=useState(0)
    const[isrunning,setrunning]=useState(false)
    
    useEffect(()=>{
        if(isrunning){
            setTimeout(()=>{
                 setsec(pre=>pre+1)
                 if(sec===59){
                    setsec(0)
                    setmin('min'+1)
                 }
             },1000)
            }
    },[isrunning,sec])
   
  const funStart=()=>{
   if(oneStart)
   alert("other task is running")
   else{
    setOneStart(true)
     setrunning(true)
     data.status="Ongoing"
  }
}
const funStop=()=>{
  fetch(`http://localhost:3500/home/${data._id}`,{
    method:"PUT",
    headers:{
    "Accept":"application/json",
    "Content-Type":"application/json" ,
    "Authorization":token
   },
   body:JSON.stringify({timetaken:`${min}:${sec}`,status:"Completed"})
}).then((x)=>x.json()).then(y=>{
    if(y.status!=="sucess"){
      alert(y.message)
    }
})
}
  return (
    <>
    <td>
    <div>{min>9?min:"0"+min}:{sec>9?sec:"0"+sec}</div>
    </td>
    <td>{!isrunning? <button style={data.status==="Completed"?{display:"none"}:{display:"inline"}} onClick={()=>funStart()}>start</button>:<>
    <button style={data.status==="Completed"?{display:"none"}:{display:"inline"}} onClick={()=>{setrunning(!isrunning);setOneStart(!oneStart)}}>pause</button>
    <button style={data.status==="Completed"?{display:"none"}:{display:"inline"}} onClick={()=>{setrunning(false);
      setOneStart(false);
      data.status="Completed"
      funStop()
      data.timetaken=`${min}:${sec}`
      }}>stop</button>
    </>
    }
    </td>
    </>
    
  )
}

