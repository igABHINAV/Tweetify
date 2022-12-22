import React from 'react'
import AuthContext from '../context/ConTexT'
import { useContext, useState, useEffect } from 'react'
const YourPosts = () => {
    const [note, setnote] = useState([])
    let { authTokens, username } = useContext(AuthContext)
    const url = `http://127.0.0.1:8000/note/${username}`
    useEffect(() => {
        getnote()
      }, [])
    const getnote = async () => {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        if (response.status === 200) {
            setnote(data)
        }
        else {
            alert('Something went  wrong !')
        }
    }

    return (
        <div className='container'>
            <h1 className='text-center'>Your Posts </h1>

            {note.map((items) => {
                return (
                    <>

                        <div className='container text-center' style={{"width":"600px"}}>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">{items.username}</h5>
                                    <p className="card-text">{items.message}</p>
                                    <p className="card-text"><small className="text-muted">Last updated {items.date}</small></p>
                                </div>
                            </div>
                        </div>

                    </>

                )


            })}
        </div>
    )
}

export default YourPosts

