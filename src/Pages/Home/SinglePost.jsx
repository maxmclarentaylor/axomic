import React, {useState}from 'react'
import { Comments } from './Comments'

export const SinglePost = (props) => {

    const [authorsName, updateAuthorsName] = useState("")
    const [comments, updateComments] = useState(props.comments)
    const [postNumber, updatePostsNumber] = useState(2)

        return(
            <div style={{margin: "3rem"}}>
                 <div style={{marginBottom: "2rem", fontWeight: "bold"}}>
                    {"Post Registration Number:" + " " + props.postRegister}
                </div>
                <div style={{marginBottom: "2rem", fontWeight: "bold"}}>
                    {"Title:" + " " + props.title}
                </div>
                <div style={{marginBottom: "2rem"}}>
                    {props.body}
                </div>
                <div style={{marginBottom: "2rem"}}>
                    {"Author:" + " " + props.name}
                </div>
                <div>Posts</div>
                {comments && comments.map((value, index) => {
                    if(index < postNumber){
                      return <Comments key={value[1]}commentValue={value}/>
                    }
                })}
            </div>
        )
}




