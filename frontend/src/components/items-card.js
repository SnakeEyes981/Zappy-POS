
export default function Itemscard(params) {
    return (
        <>
        <div className="relative col-span-3 lg:col-span-1 bg-white rounded-3xl p-0.5">
            <div className="flex md:flex-row flex-col lg:justify-between items-center">
                <div className="item-image rounded-3xl overflow-hidden w-full lg:w-32 md:w-96 h-32 bg-red-500">
                    <img className="object-cover h-full w-full bg-teal-500 object-center"  src="https://t3.ftcdn.net/jpg/02/52/38/80/360_F_252388016_KjPnB9vglSCuUJAumCDNbmMzGdzPAucK.jpg" alt="" />
                </div>
                <div className="item-info flex flex-col w-full lg:w-auto px-4 py-2 gap-y-8">
                    <div className="">
                        <div className="flex justify-between">
                            <h5 className="category font-medium text-stone-700">Burgers</h5>
                            <p className="price font-bold text-stone-800">$10.00</p>
                        </div>
                        <div className="">
                            <h5 className="name text-stone-900 sm:text-lg font-black">Grilled Cheese Burger</h5>
                        </div>
                    </div>
                    <div className="flex justify-start">
                        <div className="flex items-center gap-x-6">
                            <button className="p-1 w-6 h-6 rounded-full bg-stone-600 text-white inline-flex items-center justify-center"><i className="text-sm fa-solid fa-minus"></i></button>
                            <span className="font-black text-lg cursor-no-drop text-stone-600">0</span>
                            <button className="p-1 w-6 h-6 rounded-full bg-stone-600 text-white inline-flex items-center justify-center"><i className="text-sm fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute -right-1 -bottom-1">
                <button className="w-10 h-10 rounded-full bg-stone-950 hover:bg-stone-800 transition text-white"><i className="fa-solid fa-plus text-xl"></i></button>
            </div>
        </div>
        </>
    );
};
