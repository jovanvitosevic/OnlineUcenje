import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function HomePage(){
   
   const[res,setRes] = useState<any>(undefined)
   useEffect(()=>{
       axios.get("https://uselessfacts.jsph.pl/random.json?language=en",{withCredentials:false}).then(result=>{
           setRes(result.data)

       })

   },[])
   if(!res){
       return null;
   }
   
   return (
       <div>
           <h1>
               Funfact
           </h1>
           <h2>
               {
                   res.text
               }
           </h2>
       </div>
   )
}