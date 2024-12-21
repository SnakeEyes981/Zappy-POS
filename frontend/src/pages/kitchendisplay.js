import Kitchen from "../components/kitchen"
import Navbar from "../components/navbar"
export default function home(params) {
    return (
        <main className="background-image sm:min-h-screen min-h-dvh w-screen p-2 sm:p-4 font-nunito overflow-auto flex flex-col gap-y-2">
            <div className="navbar bg-transparent">
                <Navbar role = 'admin'/>
            </div>
            <div className="menu bg-stone-900 w-full p-2 sm:p-5 rounded-xl md:gap-x-5 md:gap-y-0 gap-y-8">
                <Kitchen />
            </div>
        </main>
    )
};