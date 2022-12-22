import { createContext, useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()
export default AuthContext

export const AuthProvider = ({ children }) => {
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [userauth, setuserauth] = useState(() => localStorage.getItem('authTokens') ? true : false)
    let [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    
    const useronchange = (e) => {
        setusername(e.target.value)
    }

    const passwordonchange = (e) => {
        setpassword(e.target.value)
    }



    const loginuser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/login/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({ username: username, password: password })
        })
        let data = (await response.json())
        if (response.status === 200) {
            setAuthTokens(data)
            localStorage.setItem('authTokens', JSON.stringify(data))
            console.log(data)
            setuserauth(true)
            navigate('/')
        }
        else {
            alert('something went wrong!')
        }
    }

    

    let signinuser = async () =>{
        const response = await fetch ('http://127.0.0.1:8000/signup/',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({ username: username, password: password })
        })
        let data = await response.json()
        console.log(data)
    }




    let logoutuser = () =>{
        setAuthTokens(null)
        setuserauth(false)
        localStorage.removeItem('authTokens')
    }


    let updateToken = async () =>{
        let response = await fetch ('http://127.0.0.1:8000/refresh/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': authTokens?.refresh })
        })
        let data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data)
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else {
            logoutuser()
        }
        if (loading===true){
            setLoading(false)
        }

    }
    useEffect(() => {

        if (loading) {
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)

    }, [authTokens, loading])

    let contextData={
        username:username,
        password:password,
        setusername:setusername,
        setpassword:setpassword,
        useronchange:useronchange,
        passwordonchange:passwordonchange,
        authTokens:authTokens,
        userauth:userauth,

        loginuser:loginuser,
        signinuser:signinuser,
        logoutuser:logoutuser

    }

    return (
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}

