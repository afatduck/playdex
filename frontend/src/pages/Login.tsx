import { useCallback, useState, type ChangeEvent, type FormEvent } from "react"
import { useUserDispatch, useUserState } from "../UserState";
import { Link, redirect, useNavigate } from "react-router-dom";
import postLogin from "../requests/postLogin";

function LoginPage() {

    if (useUserState()) throw redirect('/')

    const userDispatch = useUserDispatch() 
    const navigate = useNavigate()

    const [input, setInput] = useState({
        username: "",
        password: ""
    })

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget; 

        setInput(input => {
            return  {
                ...input,
                [name]: value
            }
        })
    }, [setInput])

    const handleSubmit = useCallback((e: FormEvent) => {
        e.preventDefault()

        if (!input.username || !input.password) return

        postLogin(input.username, input.password).then(res => {
            if (res.success) {
                userDispatch({
                    type: "LOGIN",
                    payload: res.data
                })
                navigate("/")
                return
            }
            alert(res.detail)
        })
    }, [input, userDispatch, navigate])

    return <div className="flex gap-4 flex-col">
        <h1>E bok bok</h1>
        <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="username"
            value={input.username} onChange={handleChange} />
            <input type="password" name="password" placeholder="password"
            value={input.password} onChange={handleChange} />
            <button type="submit" className="bg-emerald-300">Login</button>
        </form>
        <Link to={"/register"} className="underline">A nemam racuna!</Link>
    </div>
}

export default LoginPage