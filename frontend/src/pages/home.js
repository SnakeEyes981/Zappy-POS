import Navbar from "../components/navbar"
import Menu from "../components/menu"
export default function home() {
    return (
        <main className="background-image sm:min-h-screen min-h-dvh w-screen p-2 sm:p-4 font-nunito overflow-auto flex flex-col gap-y-2">
            <div className="navbar bg-transparent">
                <Navbar />
            </div>
            <div className="menu grid grid-cols-12 bg-gradient-to-tl from-teal-400 to-yellow-200 w-full p-3 rounded-xl md:gap-x-5 lg:gap-y-0 gap-y-8">
                <Menu />
            </div>
        </main>
    )
};
