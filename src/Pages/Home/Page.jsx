import React, {useState} from 'react'
import { SinglePost } from './SinglePost'



export const Page = (props) => {
    return(
    props.dataValues.map((value, index) => {
                
        return <SinglePost key={value[1]} title={value[0].title} name={value[0].name} body={value[0].body} comments={value[0].comments} postRegister={value[3]}/> 
    })     
    )
}
