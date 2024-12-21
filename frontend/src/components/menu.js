import { useState } from "react";
import OrderCard from "./order-card";
import Itemscard from "./items-card";
export default function Menu(params) {
    const [orderNav, setOrderNav] = useState('dineIn')
    const [menuNav, setMenuNav] = useState('all')
    return (
        <>
        <div className="col-span-12 lg:col-span-9 grid grid-cols-12 gap-y-4">
            <div className="grid col-span-12 md:gap-y-0 gap-y-4">
                <div className="col-span-12 w-full">
                    <div className="orderLine">
                        <div className="heading flex md:gap-x-8 md:gap-y-0 gap-y-6 items-center md:flex-row flex-col shrink">
                            <h3 className="text-nowrap font-extrabold text-xl">Order Line</h3>
                            <div className="ordersNavigation w-full flex items-center justify-between md:flex-row flex-col md:gap-y-0 gap-y-4">
                                <div className="bg-white/75 p-0.5 md:rounded-full rounded-3xl flex gap-x-4 md:flex-row flex-col md:gap-y-0 gap-y-4 md:w-auto w-full">
                                    <button onClick={() => setOrderNav('dineIn')} className={`${orderNav === 'dineIn' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Dine In</button>
                                    <button onClick={() => setOrderNav('takeAway')} className={`${orderNav === 'takeAway' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Take Away</button>
                                    <button onClick={() => setOrderNav('delivery')} className={`${orderNav === 'delivery' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Delivery</button>
                                </div>
                                <div className="bg-white/75 p-0.5 rounded-full md:w-auto w-full text-center">
                                    <button onClick={() => setOrderNav('allOrders')} className={`${orderNav === 'allOrders' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition md:w-auto w-full`}>All Orders</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 grid grid-cols-4 md:gap-x-6 md:gap-y-0 gap-y-4 overflow-auto md:flex-nowrap md:py-4 custom-scroll">
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                </div>
            </div>
            {/* Menu Navigation */}
            <div className="col-span-12 w-full">
                <div className="heading flex md:gap-x-4 lg:gap-y-0 gap-y-4 items-center justify-between lg:flex-row flex-col">
                    <div className="menuNavigation flex md:items-center justify-between md:gap-x-4 md:flex-row flex-col md:gap-y-0 gap-y-4 lg:w-auto w-full">
                        <h3 className="text-nowrap font-extrabold text-xl text-center">Menu</h3>
                        <div className="bg-white/75 p-0.5 md:rounded-full rounded-3xl flex gap-x-4 md:flex-row flex-col md:gap-y-0 gap-y-4">
                            <button onClick={() => setMenuNav('all')}  className={`${menuNav === 'all' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>All</button>
                            <button onClick={() => setMenuNav('pizza')}  className={`${menuNav === 'pizza' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Pizza</button>
                            <button onClick={() => setMenuNav('wraps')}  className={`${menuNav === 'wraps' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Wraps</button>
                            <button onClick={() => setMenuNav('burgers')}  className={`${menuNav === 'burgers' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Burgers</button>
                            <button onClick={() => setMenuNav('appetizers')}  className={`${menuNav === 'appetizers' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Appetizers</button>
                            <button onClick={() => setMenuNav('drinks')}  className={`${menuNav === 'drinks' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Drinks</button>
                            <button onClick={() => setMenuNav('desserts')}  className={`${menuNav === 'desserts' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Desserts</button>
                        </div>
                    </div>
                    <div className="relative group lg:w-auto w-full h-full">
                        <i className="absolute inset-y-3 left-3 group-focus:bg-red-500 fa-solid fa-search text-teal-500 font-black"></i>
                        <input className="font-medium group px-4 py-2 focus:outline-cyan-400 rounded-full bg-white/75 w-full pl-10"></input>
                    </div>
                </div>
            </div>
            {/* Menu Navigation */}
            <div className="grid grid-cols-3 col-span-12 w-full gap-4 overflow-auto max-h-[80vh] md:max-h-[45vh] pr-2 sm:pr-4 custom-scroll">
                <Itemscard />
                <Itemscard />
                <Itemscard />
                <Itemscard />
                <Itemscard />
                <Itemscard />
                <Itemscard />
                <Itemscard />
                <Itemscard />
                <Itemscard />
            </div>
        </div>
        <div className="col-span-12 lg:col-span-3 p-2 bg-yellow-300 rounded-xl"></div>
        </>
    );
};
