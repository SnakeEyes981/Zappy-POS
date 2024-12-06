import Navbar from "../components/navbar"
import Menu from "../components/menu"
export default function home() {
    return (
        <main className="background-image sm:min-h-screen min-h-dvh w-screen p-6 font-nunito overflow-auto flex flex-col gap-y-6">
            <div className="navbar bg-transparent">
                <Navbar />
            </div>
            <div className="menu bg-gradient-to-tl from-teal-400 to-yellow-200  w-full p-2 rounded-xl">
                <Menu />
            </div>
        </main>
    )
};
