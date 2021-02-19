import React, { useState, useEffect }from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';
import {  v4 as uuidv4  } from 'uuid';
import { SinglePost } from './SinglePost'
import { Comments} from './Comments'
import { Page } from './Page'


import Styles from './Home.module.css';

const GET_POSTS = gql`
    query GetPosts {
        posts {
            data {
                id
                title
                body
            }
        }
    }
`;

function Home() {

    const { loading, error, data } = useQuery(GET_POSTS);

    const [dataValues, updateDataValues] = useState("")
    const [dataNumber, updateDataNumber] = useState(10)
    const [maxNumberOfPages, updateMaxNumberOfPages] = useState(5)
    const [currentPage, currentPageUpdate] = useState(1)

      
    useEffect(() => {
        if(data){
        var posts = data.posts.data
            var finalArray = []
           var arrayToSend = []
            let numberOfPosts = dataNumber
                for(let i=1;i<=5;i++){
                    posts.map((copiedValue, index) => {
                        finalArray.push(copiedValue)
                    })
                }
            finalArray.forEach((value,integer) => {
            
                    value.name = "John Smith"
                    value.comments= [["You should hire Max Taylor", uuidv4()], ["Max Taylor is a great team player", uuidv4()], ["I agree he is great", uuidv4()], ["Don't let him go", uuidv4()]]
                    arrayToSend.push([value, uuidv4(), uuidv4(), integer + 1])
                
            })
            console.log(arrayToSend)
            updateDataValues(arrayToSend)
        }
    },[data])


    return (
        <div className={Styles.home}>
            <div>Total Number of posts possible : 50</div>
            <div style={{display: "flex", marginRight: "1rem"}}>
                How many posts would you like to see?
                <div style={{marginLeft: "1rem",marginRight: "1rem"}}
                onClick={() => {
                    updateDataNumber(10)
                    updateMaxNumberOfPages(5)
                    currentPageUpdate(1)
                }}>10</div>
                <div
                 style={{ marginRight: "1rem"}}
                onClick={() => {
                    updateDataNumber(20)
                    updateMaxNumberOfPages(3)
                    currentPageUpdate(1)
                }}>20</div>
                 <div
                  style={{marginRight: "1rem"}}
                onClick={() => {
                    updateDataNumber(30)
                    updateMaxNumberOfPages(2)
                    currentPageUpdate(1)
                }}>30</div>
                 <div
                  style={{marginRight: "1rem"}}
                onClick={() => {
                    updateDataNumber(50)
                    updateMaxNumberOfPages(1)
                    currentPageUpdate(1)
                }}>50</div>
                
            </div>
            <div>Based on page size, current total number of pages is {maxNumberOfPages}</div>
            <div>Current page is: {currentPage}</div>
            <div style={{display: "flex"}}>Change Page Number:
                <div
                onClick={() =>{
                    var newValue = currentPage + 1
                    if(newValue <= maxNumberOfPages){
                        currentPageUpdate(newValue)
                    }
                }}
                > + </div>
                <div onClick={() =>{
                    var newValue = currentPage - 1
                    if(newValue > 0){
                        currentPageUpdate(newValue)
                    }
                }} > - </div>
            </div>
            <h1>Page {currentPage}</h1>
            {dataValues && dataValues.map((value, index) => {
                let value1 = index * dataNumber
                let value2 = (index + 1) * dataNumber
                var slicedValue = dataValues.slice(value1,value2)
                if(slicedValue.length > 0 && (index + 1) === currentPage){
                    console.log("hit")
                    console.log(slicedValue)
                    return  <Page  key={value[2]} dataValues={slicedValue}/>
                }
            })}
        </div>
    )
}

export default Home;