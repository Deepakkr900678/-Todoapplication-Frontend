import React,{ useState } from 'react'
import Timer from './timer'
export default function Table(props) {
  const{data,token}=props
  const[oneStart,setOneStart]=useState(false)
  
  return (
    <div>
      <table>
        <thead>
          <th>Activity</th>
          <th>Status</th>
          <th>Time taken</th>
          <th>Action</th>
        </thead>
      <tbody>
        {data.map(x=>{
          return(
            <tr>
              <td>{x.activity}</td>
              <td>{x.status}</td>
              {x.status!=="Completed"?<Timer data={x}oneStart={oneStart}setOneStart={setOneStart} token={token}/>:<><td>{x.timetaken}</td><td> </td></>}
            </tr>
          )
        })}
      </tbody>
      </table>
    </div>
  )
}
