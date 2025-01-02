import { useState } from "react";
import Kdsordercards from "./kdsordercards";

export default function Kitchen(params) {
    const [viewOrderItems, setOrderDetails] = useState([])
    const [viewOrderId, setOrderId] = useState(null)

    const ordersDetails = [
        {orderId: 1001, customerName: 'Tom Steve', status: 'Completed', type: 'take away', table: null, time: '01:30 pm', items: [
            {name : 'grilled cheese burger', quantity: 3},
            {name : 'chicken patti burger', quantity: 4},
            {name : 'fries', quantity: 5}
        ]},
        {orderId: 1002, customerName: 'John Wehlberg', status: 'In Progress', type: 'dine in', table: '2', time: '01:50 pm', items: [
            {name : 'chicken fajita pizza', quantity: 1},
            {name : 'cheese sandwich', quantity: 3},
            {name : 'diet coke', quantity: 2}
        ]},
        {orderId: 1003, customerName: 'Tony Montana', status: 'Pending', type: 'delivery', table: null, time: '02:10 pm', items: [
            {name : 'lotus pie', quantity: 3},
            {name : 'zinger wrap', quantity: 4},
            {name : 'zinger paratha', quantity: 4},
            {name : 'twister roll', quantity: 4},
            {name : 'beef burger', quantity: 2},
            {name : 'cardamom tea', quantity: 5}
        ]},
    ]

    function showOrderDetails(arrayOfItems, orderId){
        setOrderId(orderId)
        setOrderDetails(arrayOfItems)
    }
    return (
        <>
        <div className="grid grid-cols-4 md:gap-x-4 lg:gap-y-0 gap-y-8">
            <div className="col-span-4 lg:col-span-3 p-0 pr-1 md:p-2 space-y-4 h-[70vh] lg:h-[86vh] overflow-auto custom-scroll">
                <div className="flex sm:flex-row flex-col md:gap-y-0 gap-y-2 items-center justify-center">
                    <h3 className="text-2xl font-black">Orders in Queue</h3>
                    {/* <p className="font-bold text-lg">{currentDate.toLocaleDateString()}</p> */}
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {ordersDetails.map((order, index) => (
                        <Kdsordercards key={index} order={order} viewOrder={showOrderDetails}/>
                    ))}
                </div>
            </div>
            <div className="col-span-4 lg:col-span-1 bg-stone-900 text-white rounded-xl p-2 shadow-lg">
                <div className="flex flex-col gap-y-2">
                    <h3 className="text-2xl font-black text-center w-full">Order Details</h3>
                    <div className={`${viewOrderId != null ? "visible" : "invisible"} flex justify-between pr-4 font-semibold`}>
                        <h3>{'Order# ' + viewOrderId}</h3>
                        <h5>{viewOrderItems.length + ' Items'}</h5>
                    </div>
                    <div className="items-list-container overflow-auto h-[64vh] custom-scroll pr-2 space-y-2">
                        {viewOrderItems.map((item, index) => (
                            <div key={index} className="bg-gradient-to-tl from-teal-400 to-yellow-200 shadow text-stone-900 py-2 px-4 rounded-xl space-y-2">
                                <h3 className="item-name text-lg font-semibold capitalize">{item.name}</h3>
                                <div>
                                    <h3 className="variance font-semibold">Variance: <span className="font-light">Regular</span></h3>
                                    <h5 className="quantity">Quantity: <span className="font-light">{item.quantity}</span></h5>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="order-control flex flex-col gap-y-2">
                        <button className="border border-white py-1 rounded-xl hover:bg-white hover:text-stone-900 transition font-bold">Complete</button>
                        <button className="border border-white py-1 rounded-xl hover:bg-white hover:text-stone-900 transition font-bold">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};
