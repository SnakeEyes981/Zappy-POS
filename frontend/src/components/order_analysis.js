import { useEffect, useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween"; // Import the isBetween plugin
import api from "../api/axiosConfig";

dayjs.extend(isBetween); // Extend dayjs to include the isBetween function

export default function OrderAnalysis() {
    const [ordersDuration, setOrdersDuration] = useState("daily");
    const [orderType, setOrderType] = useState("all orders");
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [orders, setOrders] = useState([]); // Initialize orders as an empty array

    // Fetch orders from the API
    const fetchOrders = async () => {
        try {
            const response = await api.get("/orders"); // Replace with your actual API endpoint
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    // Filter orders by time and type
    function filterOrdersByTimeAndType(time, type) {
        const currentDate = dayjs();

        // Helper function for time filtering
        function filterByTime(timeFilter) {
            return orders.filter((order) => {
                const orderTime = dayjs(order.time_stamp);

                switch (timeFilter) {
                    case "daily":
                        return orderTime.isSame(currentDate, "day");
                    case "weekly":
                        const startOfWeek = currentDate.startOf("week");
                        const endOfWeek = currentDate.endOf("week");
                        return orderTime.isBetween(startOfWeek, endOfWeek, null, "[]");
                    case "monthly":
                        return orderTime.isSame(currentDate, "month");
                    case "all time":
                        return true;
                    default:
                        return false;
                }
            });
        }

        // First, filter by time
        let filtered = filterByTime(time);

        // Then, filter by type (if type isn't "all orders")
        if (type !== "all orders") {
            filtered = filtered.filter((order) => order.type === type);
        }

        return filtered;
    }

    // Fetch orders when the component mounts
    useEffect(() => {
        fetchOrders();
    }, []);

    // Update filtered orders whenever filters or orders change
    useEffect(() => {
        const filtered = filterOrdersByTimeAndType(ordersDuration, orderType);
        setFilteredOrders(filtered);
    }, [ordersDuration, orderType, orders]);

    return (
        <div className="w-full h-screen md:h-[84vh] rounded-xl space-y-2 bg-stone-950 text-white sm:p-3 p-2 overflow-auto">
            <h5 className="text-3xl font-bold text-center">Order Analysis</h5>
            <div className="flex sm:flex-row flex-col sm:gap-x-4 gap-x-0 sm:gap-y-0 gap-y-2 justify-center">
                <button onClick={() => setOrdersDuration("daily")} className={`${ordersDuration === "daily" ? "bg-white text-black" : ""} py-1 px-4 border border-white rounded-full`}>Daily</button>
                <button onClick={() => setOrdersDuration("weekly")} className={`${ordersDuration === "weekly" ? "bg-white text-black" : ""} py-1 px-4 border border-white rounded-full`}>Weekly</button>
                <button onClick={() => setOrdersDuration("monthly")} className={`${ordersDuration === "monthly" ? "bg-white text-black" : ""} py-1 px-4 border border-white rounded-full`}>Monthly</button>
                <button onClick={() => setOrdersDuration("all time")} className={`${ordersDuration === "all time" ? "bg-white text-black" : ""} py-1 px-4 border border-white rounded-full`}>All Time</button>
            </div>
            <div className="grid grid-cols-12 gap-y-2 sm:gap-5 lg:p-2">
                <div className="col-span-12 md:col-span-3 lg:col-span-2 flex flex-col gap-y-2 sm:gap-y-4">
                    <button onClick={() => setOrderType("all orders")} className={`${orderType === "all orders" ? "bg-white text-black" : ""} py-1 px-4 border border-white rounded-full`}>All Orders</button>
                    <button onClick={() => setOrderType("take away")} className={`${orderType === "take away" ? "bg-white text-black" : ""} py-1 px-4 border border-white rounded-full`}>Take Away</button>
                    <button onClick={() => setOrderType("dine in")} className={`${orderType === "dine in" ? "bg-white text-black" : ""} py-1 px-4 border border-white rounded-full`}>Dine In</button>
                    <button onClick={() => setOrderType("delivery")} className={`${orderType === "delivery" ? "bg-white text-black" : ""} py-1 px-4 border border-white rounded-full`}>Delivery</button>
                </div>
                <div className="col-span-12 md:col-span-9 lg:col-span-10 grid grid-cols-12 gap-2 place-content-start overflow-auto p-2 bg-gradient-to-tl from-teal-400 to-yellow-200 rounded-xl md:h-[67vh]">
                    {filteredOrders.map((order) => (
                        <div key={order.orderId} className="col-span-12 md:col-span-6 lg:col-span-4 rounded-lg bg-black text-white p-2 sm:p-4 space-y-2">
                            <div className="flex justify-between">
                                <h5 className="font-semibold">Customer Name</h5>
                                <h5 className="font-light ">{order.customerName}</h5>
                            </div>
                            <div className="flex justify-between">
                                <h5 className="font-semibold">Order Number</h5>
                                <h5 className="font-light ">{'#' + order._id.slice(0,7)}</h5>
                            </div>
                            <div className="flex justify-between">
                                <h5 className="font-semibold">Type</h5>
                                <h5 className="font-light capitalize">{order.type}</h5>
                            </div>
                            <div className="flex justify-between">
                                <h5 className="font-semibold">Status</h5>
                                <h5 className="font-light ">{order.status}</h5>
                            </div>
                            <div className="flex justify-between">
                                <h5 className="font-semibold">Total Items</h5>
                                <h5 className="font-light capitalize">{order.items.length + " Items"}</h5>
                            </div>
                            <div className="flex justify-between">
                                <h5 className="font-semibold">Date</h5>
                                <h5 className="font-light text-white">{new Date(order.time).toLocaleDateString()}</h5>
                            </div>
                            <div className="flex justify-between">
                                <h5 className="font-semibold">Time</h5>
                                <h5 className="font-light text-white">{new Date(order.time).toLocaleTimeString()}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}