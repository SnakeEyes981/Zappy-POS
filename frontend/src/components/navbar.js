import logo from "../assets/Artboard 1.png"
import { NavLink } from "react-router-dom"
export default function navbar({role}) {
    return (
        <>
            <nav className="text-white flex md:flex-row flex-col md:gap-y-0 gap-y-4 justify-between items-center">
                <div className="imageContainer">
                    <img className="w-12" src={logo} alt="Logo" />
                </div>
                <div className="flex md:flex-row flex-col md:gap-y-0 gap-y-4 md:w-auto md:gap-x-4 gap-x-0 w-full">
                    <div className="bg-stone-800 border-stone-600 border-2 sm:rounded-full rounded-lg flex sm:flex-row flex-col justify-between gap-x-2">
                        <NavLink to="/home" className={({isActive}) => `${isActive ? 'navbarLink' : 'navbarLink'} ${role === 'admin' ? 'block' : 'hidden'}`}><i className="fa-solid mr-2 fa-lock"></i>cPanel</NavLink>
                        <NavLink to="/home" className={({isActive}) => `${isActive ? 'navbarLinkActive' : 'navbarLink'} ${role === 'cashier' || role === 'admin' ? 'block' : 'hidden'}`}><i className="fa-solid mr-2 fa-house-chimney"></i>Home</NavLink>
                        <NavLink to="/orders" className={({isActive}) => `${isActive ? 'navbarLinkActive' : 'navbarLink'} ${role === 'cashier' || role === 'admin' ? 'block' : 'hidden'}`}><i className="fa-regular mr-2 fa-clipboard"></i>Orders</NavLink>
                        <NavLink to="/kitchen" className={({isActive}) => `${isActive ? 'navbarLinkActive' : 'navbarLink'} ${role === 'kitchen' || role === 'admin' ? 'block' : 'hidden'}`}><i className="fa-solid mr-2 fa-fire-burner"></i>Kitchen</NavLink>
                    </div>
                    <div className="bg-stone-800 border-stone-600 border-2 sm:rounded-full rounded-lg">
                        <button className="navbarLink w-full"><i className="fa-solid mr-2 fa-user"></i>Account</button>
                    </div>
                </div>
            </nav>
        </>
    )
};
