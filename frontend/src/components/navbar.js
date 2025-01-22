import logo from "../assets/Artboard 1.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
    const { auth, logout } = useAuth();
    const { role } = auth;

    function dropdown() {
        const dropdownBtn = document.getElementById("dropdownBtn");
        dropdownBtn.style.visibility = dropdownBtn.style.visibility === "hidden" ? "visible" : "hidden";
    }
    
    return (
        <>
            <nav className="text-white flex md:flex-row flex-col md:gap-y-0 gap-y-4 justify-between items-center">
                <div className="imageContainer">
                    <img className="w-12" src={logo} alt="Logo" />
                </div>
                <div className="bg-transparent border-teal-400 border sm:rounded-full rounded-lg flex sm:flex-row flex-col justify-between gap-x-2 md:w-auto w-full">
                    <NavLink to="/control-panel" className={({isActive}) => `${isActive ? 'navbarLinkActive' : 'navbarLink'} ${role === 'admin' ? 'block' : 'hidden'}`}><i className="fa-solid mr-2 fa-lock"></i>cPanel</NavLink>
                    <NavLink to="/home" className={({isActive}) => `${isActive ? 'navbarLinkActive' : 'navbarLink'} ${role === 'cashier' || role === 'admin' ? 'block' : 'hidden'}`}><i className="fa-solid mr-2 fa-house-chimney"></i>Home</NavLink>
                    <NavLink to="/orders" className={({isActive}) => `${isActive ? 'navbarLinkActive' : 'navbarLink'} ${role === 'cashier' || role === 'admin' ? 'block' : 'hidden'}`}><i className="fa-regular mr-2 fa-clipboard"></i>Orders</NavLink>
                    <NavLink to="/kitchen" className={({isActive}) => `${isActive ? 'navbarLinkActive' : 'navbarLink'} ${role === 'kitchen' || role === 'admin' ? 'block' : 'hidden'}`}><i className="fa-solid mr-2 fa-fire-burner"></i>Kitchen</NavLink>
                </div>
                <div className="relative bg-transparent border-teal-400 border sm:rounded-full rounded-lg md:w-auto w-full">
                    <button onClick={() => {dropdown()}} className="navbarLink w-full"><i className="fa-solid mr-2 fa-user"></i>Account</button>
                    <button id="dropdownBtn" onClick={logout} className="invisible py-2 z-10 absolute inset-x-2 top-10 bg-amber-300 text-black rounded-full">Logout</button>
                </div>
            </nav>
        </>
    )
};
