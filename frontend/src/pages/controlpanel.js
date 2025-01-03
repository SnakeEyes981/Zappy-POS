import Navbar from "../components/navbar"
export default function ControlPanel(params) {

    return (
        <main className="background-image sm:min-h-screen min-h-dvh w-screen p-2 sm:p-4 font-nunito overflow-auto flex flex-col gap-y-2">
            <div className="navbar bg-transparent">
                <Navbar role = 'admin'/>
            </div>
            <div className="p-2 sm:p-4 grid grid-cols-12 gap-y-4 md:gap-y-2 gap-x-4 content-start bg-gradient-to-tl from-teal-400 to-yellow-200 w-full rounded-xl h-screen sm:h-[88vh]">
                <div className="col-span-12">
                    <h3 className="font-bold text-3xl text-center">Control Panel</h3>
                </div>
                <div className="col-span-12 md:col-span-4 lg:col-span-2">
                    <div className="flex flex-col gap-y-3 items-center">
                        <button className="p-3 text-start rounded-xl font-bold border border-stone-950 w-full text-black hover:bg-stone-950 hover:text-white transition">Employees Management</button>
                        <button className="p-3 text-start rounded-xl font-bold border border-stone-950 w-full text-black hover:bg-stone-950 hover:text-white transition">Track Sales</button>
                        <button className="p-3 text-start rounded-xl font-bold border border-stone-950 w-full text-black hover:bg-stone-950 hover:text-white transition">Customize Menu</button>
                        <button className="p-3 text-start rounded-xl font-bold border border-stone-950 w-full text-black hover:bg-stone-950 hover:text-white transition">Orders Analytics</button>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-8 lg:col-span-10 rounded-xl h-full overflow-auto pr-1 custom-scroll">
                    <div className="w-full h-full rounded-xl">
                        <div className="grid grid-cols-12 gap-y-2 md:gap-3">
                            <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-stone-950 rounded-xl text-white p-4">
                                <h5 className="font-light text-2xl text-start">Hassan Yaseen</h5>
                                <p className="font-semibold text-start">Role: Employee</p>
                                <p className="font-semibold text-start">Age: 23</p>
                                <button className="bg-white text-stone-950 font-semibold hover:bg-transparent border border-transparent hover:border-white hover:text-white w-full rounded-lg p-1 mt-4">Edit<i className="ml-1 fa-solid text-sm fa-pen"></i></button>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-stone-950 rounded-xl text-white p-4">
                                <h5 className="font-light text-2xl text-start">Hassan Yaseen</h5>
                                <p className="font-semibold text-start">Role: Employee</p>
                                <p className="font-semibold text-start">Age: 23</p>
                                <button className="bg-white text-stone-950 font-semibold hover:bg-transparent border border-transparent hover:border-white hover:text-white w-full rounded-lg p-1 mt-4">Edit<i className="ml-1 fa-solid text-sm fa-pen"></i></button>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-stone-950 rounded-xl text-white p-4">
                                <h5 className="font-light text-2xl text-start">Hassan Yaseen</h5>
                                <p className="font-semibold text-start">Role: Employee</p>
                                <p className="font-semibold text-start">Age: 23</p>
                                <button className="bg-white text-stone-950 font-semibold hover:bg-transparent border border-transparent hover:border-white hover:text-white w-full rounded-lg p-1 mt-4">Edit<i className="ml-1 fa-solid text-sm fa-pen"></i></button>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-stone-950 rounded-xl text-white p-4">
                                <h5 className="font-light text-2xl text-start">Hassan Yaseen</h5>
                                <p className="font-semibold text-start">Role: Employee</p>
                                <p className="font-semibold text-start">Age: 23</p>
                                <button className="bg-white text-stone-950 font-semibold hover:bg-transparent border border-transparent hover:border-white hover:text-white w-full rounded-lg p-1 mt-4">Edit<i className="ml-1 fa-solid text-sm fa-pen"></i></button>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-stone-950 rounded-xl text-white p-4">
                                <h5 className="font-light text-2xl text-start">Hassan Yaseen</h5>
                                <p className="font-semibold text-start">Role: Employee</p>
                                <p className="font-semibold text-start">Age: 23</p>
                                <button className="bg-white text-stone-950 font-semibold hover:bg-transparent border border-transparent hover:border-white hover:text-white w-full rounded-lg p-1 mt-4">Edit<i className="ml-1 fa-solid text-sm fa-pen"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
};