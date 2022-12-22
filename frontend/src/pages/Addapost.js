import React from 'react'
import AuthContext from '../context/ConTexT'
import { useContext, useState } from 'react'
const Addapost = () => {
    let { username, authTokens } = useContext(AuthContext)
    let [body, usebody] = useState("")
    let [tags,settags]=useState("")


    let addData = async () => {
        let response = await fetch('http://127.0.0.1:8000/notes/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + String(authTokens.access)
            },
            body: JSON.stringify({ message: body, username: username , tags:tags })
        })
        let data = await response.json()
        console.log(data)
        if (response.status === 200) {
            console.log('saved successfully')
        }
    }


    const bodyonchange = (e) => {
        usebody(e.target.value)
    }

    const tagsonchange = (e) => {
        settags(e.target.value)
    }

    return (
        <div className='container'>
            <h1> Add Your Post !!</h1>
            



            <div className="card">
                <div className="card-header">
                    TweeTiE !!!
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p><div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Please enter your Tweetie : </label>
                            <textarea class="form-control" value={body} onChange={bodyonchange} id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div></p>
                        <br/>
                        <p><div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Please enter '#' tags , if any : </label>
                            <textarea class="form-control" value={tags} onChange={tagsonchange} id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div></p>
                        <footer className="blockquote-footer"> by  <cite title="Source Title">{username}</cite></footer>
                    </blockquote>
                </div>
            </div>
            <br/>
            <button onClick={addData} className='btn btn-warning'>submit</button>

        </div>
    )
}
// username,message
export default Addapost
