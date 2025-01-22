import { useEffect, useState } from "react"
import Navbar from "../components/navbar"
import OrderCard from "../components/order-card"
import api from "../api/axiosConfig";

export default function AllOrders(params) {
    const [orderNav, setOrderNav] = useState('all orders');
    const [orderBook, setOrderBook] = useState([]);
    async function fetchOrders() {
        try {
            const response = await api.get('/orders');
            setOrderBook(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error.response?.data || error.message);
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])


    return (
        <main className="background-image sm:min-h-screen min-h-dvh w-screen p-2 sm:p-4 font-nunito overflow-auto flex flex-col gap-y-2">
            <div className="navbar bg-transparent">
                <Navbar />
            </div>
            <div className="menu grid grid-cols-12 bg-gradient-to-tl from-teal-400 to-yellow-200 w-full p-3 rounded-xl md:gap-x-5 lg:gap-y-0 gap-y-8 h-[88vh] overflow-auto place-content-start">
                <div className="col-span-12 md:gap-y-0 gap-y-4 content-center space-y-2">
                    <div className="w-full">
                        <div className="heading flex md:gap-x-8 md:gap-y-0 gap-y-6 items-center md:flex-row flex-col shrink">
                            <h3 className="text-nowrap font-extrabold text-xl">All Orders</h3>
                            <div className="ordersNavigation w-full flex items-center justify-between md:flex-row flex-col md:gap-y-0 gap-y-4">
                                <div className="bg-white/75 p-0.5 md:rounded-full rounded-3xl flex gap-x-4 md:flex-row flex-col md:gap-y-0 gap-y-4 md:w-auto w-full">
                                    <button onClick={() => setOrderNav('dine in')} className={`${orderNav === 'dine in' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Dine In</button>
                                    <button onClick={() => setOrderNav('take away')} className={`${orderNav === 'take away' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Take Away</button>
                                    <button onClick={() => setOrderNav('delivery')} className={`${orderNav === 'delivery' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Delivery</button>
                                </div>
                                <div className="bg-white/75 p-0.5 rounded-full md:w-auto w-full text-center">
                                    <button onClick={() => setOrderNav('all orders')} className={`${orderNav === 'all orders' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition md:w-auto w-full`}>All Orders</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 select-none flex flex-col md:flex-row flex-wrap rounded-xl overflow-auto custom-scroll">
                        {orderBook.map((order, index) => (
                            <OrderCard key={order.orderId} order={order} category={orderNav} calledInOrdersPage={true} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
};
