import { useEffect, useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween"; // Import the isBetween plugin

dayjs.extend(isBetween); // Extend dayjs to include the isBetween function

export default function OrderAnalysis(params) {
    const [ordersDuration, setOrdersDuration] = useState("daily");
    const [orderType, setOrderType] = useState("all orders");
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [orders] = useState(getOrders());

    function getOrders () {
        return [
            {orderId: 1002, customerName: 'John Wehlberg', status: 'In Progress', type: 'dine in', table: '2', time_stamp: '2024-01-02T12:00:00', items: [
                {name : 'chicken fajita pizza', quantity: 1, price: 21},
                {name : 'cheese sandwich', quantity: 3, price: 11},
                {name : 'diet coke', quantity: 2, price: 25}
            ]},
            {orderId: 1003, customerName: 'Tony Montana', status: 'Pending', type: 'delivery', table: null, time_stamp: '2024-12-20T12:00:00', items: [
                {name : 'lotus pie', quantity: 3, price: 10},
                {name : 'zinger wrap', quantity: 4, price: 5},
                {name : 'zinger paratha', quantity: 4, price: 12},
            ]},
            {orderId: 1005, customerName: 'Tom Steve', status: 'Completed', type: 'take away', table: null, time_stamp: '2024-01-05T12:48:00', items: [
                {name : 'grilled cheese burger', quantity: 3, price: 52},
                {name : 'chicken patti burger', quantity: 4, price: 10},
                {name : 'fries', quantity: 5, price: 18}
            ]},
            {orderId: 1007, customerName: 'Jerry Mark', status: 'Completed', type: 'take away', table: null, time_stamp: '2025-01-07T12:45:00', items: [
                {name : 'grilled cheese burger', quantity: 3, price: 42},
                {name : 'chicken patti burger', quantity: 4, price: 21},
                {name : 'fries', quantity: 5, price: 52}
            ]},
            {orderId: 1004, customerName: 'Jim Bergz', status: 'Completed', type: 'take away', table: null, time_stamp: '2025-01-05T12:43:00', items: [
                {name : 'grilled cheese burger', quantity: 3, price: 19},
                {name : 'chicken patti burger', quantity: 4, price: 35},
                {name : 'fries', quantity: 5, price: 11}
            ]},
            {orderId: 1010, customerName: 'Jim Bergr', status: 'Completed', type: 'take away', table: null, time_stamp: '2025-01-06T12:43:00', items: [
                {name : 'grilled cheese burger', quantity: 3, price: 19},
                {name : 'chicken patti burger', quantity: 4, price: 35},
                {name : 'fries', quantity: 5, price: 11}
            ]},
        ]
    }
    

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

    // Update filtered orders whenever the filters change
    useEffect(() => {
        const filtered = filterOrdersByTimeAndType(ordersDuration, orderType);
        setFilteredOrders(filtered);
    }, [ordersDuration, orderType]);

    return (
        <div className="w-full h-screen md:h-[84vh] rounded-xl space-y-2 bg-stone-950 text-white sm:p-3 p-2 overflow-auto">
            <h5 className="text-3xl font-bold text-center">Order Analysis</h5>
            <div className="flex sm:flex-row flex-col sm:gap-x-4 gap-x-0 sm:gap-y-0 gap-y-2 justify-center">
                <button onClick={() => setOrdersDuration('daily')} className={`${ordersDuration === 'daily' ? 'bg-white text-black' : ''} py-1 px-4 border border-white rounded-full`}>Daily</button>
                <button onClick={() => setOrdersDuration('weekly')} className={`${ordersDuration === 'weekly' ? 'bg-white text-black' : ''} py-1 px-4 border border-white rounded-full`}>Weekly</button>
                <button onClick={() => setOrdersDuration('monthly')} className={`${ordersDuration === 'monthly' ? 'bg-white text-black' : ''} py-1 px-4 border border-white rounded-full`}>Monthly</button>
                <button onClick={() => setOrdersDuration('all time')} className={`${ordersDuration === 'all time' ? 'bg-white text-black' : ''} py-1 px-4 border border-white rounded-full`}>All Time</button>
            </div>
            <div className="grid grid-cols-12 gap-y-2 sm:gap-5 lg:p-2">
                <div className="col-span-12 md:col-span-3 lg:col-span-2 flex flex-col gap-y-2 sm:gap-y-4">
                    <button onClick={() => setOrderType('all orders')} className={`${orderType === 'all orders' ? 'bg-white text-black' : ''} py-1 px-4 border border-white rounded-full`}>All Orders</button>
                <button onClick={() => setOrderType('take away')} className={`${orderType === 'take away' ? 'bg-white text-black' : ''} py-1 px-4 border border-white rounded-full`}>Take Away</button>
                <button onClick={() => setOrderType('dine in')} className={`${orderType === 'dine in' ? 'bg-white text-black' : ''} py-1 px-4 border border-white rounded-full`}>Dine In</button>
                <button onClick={() => setOrderType('delivery')} className={`${orderType === 'delivery' ? 'bg-white text-black' : ''} py-1 px-4 border border-white rounded-full`}>Delivery</button>
                </div>
                <div className="col-span-12 md:col-span-9 lg:col-span-10 grid grid-cols-12 sm:gap-4 gap-2 place-content-start overflow-auto p-2 sm:p-4 bg-gradient-to-tl from-teal-400 to-yellow-200 rounded-xl md:h-[69vh]">
                    {filteredOrders.map((order) => (
                        <div key={order.orderId} className="col-span-12 lg:col-span-6 rounded-lg bg-black text-white p-4 sm:p-6 space-y-2 sm:space-y-4">
                            <div className="flex justify-between">
                                <h5 className="font-bold">{order.customerName}</h5>
                                <h5 className="">{'#' + order.orderId}</h5>
                            </div>
                            <div className="flex justify-between">
                                <h5 className="">{order.items.length + ' Items'}</h5>
                                <h5 className="capitalize">{order.type}</h5>
                            </div>
                            <div className="flex justify-between">
                                <h5 className="">{order.status}</h5>
                                <h5 className="text-white">{(new Date(order.time_stamp).toLocaleString())}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
