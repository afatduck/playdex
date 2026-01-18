import { Link } from "react-router-dom"
import { useUserDispatch, useUserState } from "../UserState"
import { useCallback } from "react"

function Nav() {
    const loggedIn = !!useUserState()

    const userDispatch = useUserDispatch()

    const handleLogout = useCallback(() => {
        userDispatch({
            type: "LOGOUT"
        })
        location.reload()
    }, [userDispatch])

    return <nav className="flex p-3.5 border-b-2 justify-between">
        <Link to={"/"}>
            <h1>
                playdex bebe
            </h1>
        </Link>
        <div className="flex gap-5 underline">
            <Link to={"/games"}>Sve video igre</Link>
            {
                loggedIn && 
                <Link to={"/favorites"}>Tvoje miljene</Link>
            }
            {
                loggedIn ? 
                <button onClick={handleLogout}>Aj bok</button> :
                <Link to={"/login"}>postani nas clan!</Link> 
            }
        </div>
    </nav>
}

export default Nav