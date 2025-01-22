import { useEffect, useState } from "react";
import Kdsordercards from "./kdsordercards";
import api from "../api/axiosConfig";

export default function Kitchen() {
    const [orderDetails, setOrderDetails] = useState([]);
    const [viewOrderId, setOrderId] = useState("");
    const [orderBook, setOrderBook] = useState([]);
    const [currentOrderStatus, setCurrentOrderStatus] = useState("");
    let currentStatus = "";

    async function fetchOrders() {
        try {
            const response = await api.get('/orders');
            setOrderBook(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error.response?.data || error.message);
        }
    }

    function updateStatus(status) {
        currentStatus = status;
    }

    useEffect(() => {
        fetchOrders();
    },[])


    async function updateOrderStatus() {
        const status = {status: currentStatus}
        try {
            const response = await api.patch(`/orders/${viewOrderId}/status`, status);
            if(response?.status === 200){
                if(currentStatus === 'In Progress')    alert("Order is in Progress");
                else if(currentStatus === 'Completed') alert("Order has been Completed");
                else if(currentStatus === 'Cancelled') alert("Order has been Cancelled");
            }
            fetchOrders();
            setCurrentOrderStatus("");
            setOrderDetails([]);
            setOrderId("")
        } catch (error) {
            console.error('Error fetching orders:', error.response?.data || error.message);
        }
    }
    
    
    function showOrderDetails(arrayOfItems, orderId, orderStatus){
        setOrderId(orderId)
        setOrderDetails(arrayOfItems)
        updateStatus(orderStatus)
        setCurrentOrderStatus(orderStatus)
    }
    return (
        <>
        <div className="grid grid-cols-4 md:gap-x-4 lg:gap-y-0 gap-y-8">
            <div className="col-span-4 lg:col-span-3 pr-1 space-y-4 h-[70vh] lg:h-[85vh] overflow-auto custom-scroll">
                <div className="flex sm:flex-row flex-col md:gap-y-0 gap-y-2 items-center">
                    <h3 className="text-xl sm:text-2xl font-extrabold">Orders in Queue</h3>
                    {/* <p className="font-bold text-lg">{currentDate.toLocaleDateString()}</p> */}
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {orderBook.map((order) => (
                        <Kdsordercards order={order} viewOrder={showOrderDetails}/>
                    ))}
                </div>
            </div>
            <div className="col-span-4 lg:col-span-1 bg-stone-900 text-white rounded-xl p-2 shadow-lg">
                <div className="flex flex-col gap-y-2 justify-between h-full">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-center w-full">Order Details</h3>
                        <div className={`${viewOrderId !== null ? "visible" : "invisible"} flex justify-between pr-4 font-semibold`}>
                            <h3>{'Order# ' + viewOrderId.slice(0,7)}</h3>
                            <h5>{orderDetails.length + ' Items'}</h5>
                        </div>
                        <div className="items-list-container overflow-auto h-[60vh] custom-scroll pr-2 space-y-2">
                            {orderDetails.length > 0 ? orderDetails.map((item) => (
                                <div key={item._id} className="bg-gradient-to-tl from-teal-400 to-yellow-200 shadow text-stone-900 py-2 px-4 rounded-xl space-y-2">
                                    <h3 className="item-name text-lg font-bold capitalize">{item.item.itemName}</h3>
                                    <div>
                                        <h5 className="quantity">Quantity: <span className="font-light">{item.quantity}</span></h5>
                                    </div>
                                </div>
                            )):
                            <></>}
                        </div>
                    </div>
                    <div className="order-control flex flex-col gap-y-2">
                        {
                            currentOrderStatus === "Pending" ?
                                <>
                                    <button onClick={() => {updateStatus("In Progress"); updateOrderStatus()}} className="border border-white py-1 rounded-xl hover:bg-white hover:text-stone-900 transition font-bold">Start</button>
                                    <button onClick={() => {updateStatus("Cancelled"); updateOrderStatus()}} className="border border-white py-1 rounded-xl hover:bg-white hover:text-stone-900 transition font-bold">Cancel</button>
                                </> : 
                            (
                                currentOrderStatus === "In Progress" ? 
                                <>
                                    <button onClick={() => {updateStatus("Completed"); updateOrderStatus()}} className="border border-white py-1 rounded-xl hover:bg-white hover:text-stone-900 transition font-bold">Finish</button>
                                    <button onClick={() => {updateStatus("Cancelled"); updateOrderStatus()}} className="border border-white py-1 rounded-xl hover:bg-white hover:text-stone-900 transition font-bold">Cancel</button>
                                </> :
                                null
                            )
                        }
                        
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};
