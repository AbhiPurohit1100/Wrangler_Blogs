import { Link, useNavigate } from "react-router-dom"
import { Avatar } from "./blogCard"
import { handleLogout } from "../../pages/logOut"


export const Appbar=()=>{
    const navigate = useNavigate()
    return <div className="border-b flex justify-between px-3 py-3 h-15">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">
            <div className="font-bold font-sans text-xl ">Medium</div>
            
        
        </Link>
        <div>
            <Link to={'/publish'}>
            
        <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">New</button>
        </Link>
            <button onClick={() => handleLogout(navigate)} style={{ border: "none", background: "none", padding: 0, cursor: "pointer" }}>
                    <Avatar size="big" name="Abhinav" />
            </button>
          
        </div>

    </div>
}