import Kitchen from "../components/kitchen"
import Navbar from "../components/navbar"
export default function home(params) {
    return (
        <main className="background-image sm:min-h-screen min-h-dvh w-screen p-2 sm:p-4 font-nunito overflow-auto flex flex-col gap-y-2">
            <div className="navbar bg-transparent">
                <Navbar />
            </div>
            <div className="menu bg-gradient-to-tr from-teal-400 to-yellow-200 w-full p-2 sm:p-3 rounded-xl">
                <Kitchen />
            </div>
        </main>
    )
};