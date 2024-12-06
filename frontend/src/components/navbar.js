import logo from "../assets/Artboard 1.png"
import { NavLink } from "react-router-dom"
export default function navbar(params) {
    return (
        <>
            <nav className="text-white flex md:flex-row flex-col md:gap-y-0 gap-y-4 justify-between items-center">
                <div className="imageContainer">
                    <img className="w-12" src={logo} alt="Logo" />
                </div>
                <div className="flex md:flex-row flex-col md:gap-y-0 gap-y-4 md:w-auto w-full">
                    <div className="bg-stone-800 border-stone-600 border-2 sm:rounded-full rounded-lg flex sm:flex-row flex-col justify-between gap-x-6">
                        <NavLink to="/home" className={({isActive}) => (isActive ? 'navbarLink bg-sky-300 text-stone-900' : 'navbarLink')}><i className="fa-solid mr-2 fa-house-chimney"></i>Home</NavLink>
                        <NavLink to="/menu" className={({isActive}) => (isActive ? 'navbarLink bg-sky-300 text-stone-900' : 'navbarLink')}><i className="fa-solid mr-2 fa-bars"></i>Menu</NavLink>
                        <NavLink to="/orders" className={({isActive}) => (isActive ? 'navbarLink bg-sky-300 text-stone-900' : 'navbarLink')}><i className="fa-regular mr-2 fa-clipboard"></i>Orders</NavLink>
                    </div>
                    <div className="md:block hidden w-2 bg-red-500 self-center border border-stone-600"></div>
                    <div className="bg-stone-800 border-stone-600 border-2 sm:rounded-full rounded-lg">
                        <button className="navbarLink w-full"><i className="fa-regular mr-2 fa-user"></i>Account</button>
                    </div>
                </div>
            </nav>
        </>
    )
};
