import { useEffect, useState } from "react";
import dayjs from 'dayjs';

export default function TrackSales(params) {
    const ordersDetails = [
        {orderId: 1002, customerName: 'John Wehlberg', status: 'In Progress', type: 'dine in', table: '2', time_stamp: '2025-01-02T12:00:00', items: [
            {name : 'chicken fajita pizza', quantity: 1, price: 21},
            {name : 'cheese sandwich', quantity: 3, price: 11},
            {name : 'diet coke', quantity: 2, price: 25}
        ]},
        {orderId: 1003, customerName: 'Tony Montana', status: 'Pending', type: 'delivery', table: null, time_stamp: '2025-01-01T12:00:00', items: [
            {name : 'lotus pie', quantity: 3, price: 10},
            {name : 'zinger wrap', quantity: 4, price: 5},
            {name : 'zinger paratha', quantity: 4, price: 12},
        ]},
        {orderId: 1001, customerName: 'Tom Steve', status: 'Completed', type: 'take away', table: null, time_stamp: '2025-01-05T12:48:00', items: [
            {name : 'grilled cheese burger', quantity: 3, price: 52},
            {name : 'chicken patti burger', quantity: 4, price: 10},
            {name : 'fries', quantity: 5, price: 18}
        ]},
        {orderId: 1001, customerName: 'Jerry Mark', status: 'Completed', type: 'take away', table: null, time_stamp: '2025-01-05T12:45:00', items: [
            {name : 'grilled cheese burger', quantity: 3, price: 42},
            {name : 'chicken patti burger', quantity: 4, price: 21},
            {name : 'fries', quantity: 5, price: 52}
        ]},
        {orderId: 1001, customerName: 'Jim Berg', status: 'Completed', type: 'take away', table: null, time_stamp: '2025-01-05T12:43:00', items: [
            {name : 'grilled cheese burger', quantity: 3, price: 19},
            {name : 'chicken patti burger', quantity: 4, price: 35},
            {name : 'fries', quantity: 5, price: 11}
        ]},
        {orderId: 1001, customerName: 'Jim Berg', status: 'Completed', type: 'take away', table: null, time_stamp: '2025-01-05T12:43:00', items: [
            {name : 'grilled cheese burger', quantity: 3, price: 19},
            {name : 'chicken patti burger', quantity: 4, price: 35},
            {name : 'fries', quantity: 5, price: 11}
        ]},
    ]

    const [selectedReport, setSelectedReport] = useState('daily')
    const [reportData, setReportData] = useState({ totalSales: 0, itemsReport: [{}] })

    useEffect(() => {
        const result = generateReport(selectedReport);
        setReportData(result);
    }, [selectedReport]);

    function generateReport(duration) {
        let completedOrders;
        if(ordersDetails.length > 0){
            completedOrders = ordersDetails.filter(order => order.status === 'Completed');
        }
        else{
            return {};
        }


        const now = dayjs();
        let dateLimit;
        if (duration === 'daily') {
            dateLimit = now.subtract(1, 'day'); // 1 day ago
        } else if (duration === 'weekly') {
            dateLimit = now.subtract(1, 'week'); // 1 week ago
        } else if (duration === 'monthly') {
            dateLimit = now.subtract(1, 'month'); // 1 month ago
        } else {
            dateLimit = dayjs('1970-01-01'); // All time (from the beginning of time)
        }

        // Filter orders by the selected duration
        const filteredOrders = completedOrders.filter(order => dayjs(order.time_stamp).isAfter(dateLimit));

        const totalSales = calculateTotalSales(filteredOrders);
        const itemsReport = calculateTotalSalesForIndividualItems(filteredOrders);

        return {
            totalSales,
            itemsReport
        };
    }

    function calculateTotalSales(orders) {
        return orders.reduce((total, order) => {
            return total + order.items.reduce((orderTotal, item) => {
                return orderTotal + (item.price * item.quantity);
            }, 0);
        }, 0);
    }
    

    function calculateTotalSalesForIndividualItems(orders) {
        const itemReport = [];

        orders.forEach(order => {
            order.items.forEach(item => {
                // Find if the item already exists in the report
                const existingItem = itemReport.find(report => report.itemName === item.name);
                if (existingItem) {
                    existingItem.quantitySold += item.quantity;
                    existingItem.totalSales += item.price * item.quantity;
                } else {
                    itemReport.push({
                        itemName: item.name,
                        quantitySold: item.quantity,
                        totalSales: item.price * item.quantity,
                    });
                }
            });
        });

        return itemReport;
    }

    return (
        <div className="w-full h-screen md:h-[84vh] rounded-xl sm:space-y-2 bg-stone-950 text-white sm:p-4 p-2 overflow-hidden">
            <h5 className="text-3xl font-bold text-center">Sales</h5>
            <div className="flex sm:flex-row flex-col sm:gap-x-4 gap-x-0 sm:gap-y-0 gap-y-2 justify-center">
                <button onClick={() => setSelectedReport('daily')} className={`${selectedReport === 'daily' ? 'bg-white text-black' : ''} py-1 px-4 border border-white rounded-full`}>Daily Report</button>
                <button onClick={() => setSelectedReport('weekly')} className={`${selectedReport === 'weekly' ? 'bg-white text-black' : ''} py-1 px-4 border border-white rounded-full`}>Weekly Report</button>
                <button onClick={() => setSelectedReport('monthly')} className={`${selectedReport === 'monthly' ? 'bg-white text-black' : ''} py-1 px-4 border border-white rounded-full`}>Monthly Report</button>
                <button onClick={() => setSelectedReport('all')} className={`${selectedReport === 'all' ? 'bg-white text-black' : ''} py-1 px-4 border border-white rounded-full`}>All Time Report</button>
            </div>
            <div className="grid grid-cols-12 gap-y-4 py-4 text-black">
                {reportData && Object.keys(reportData).length > 0 ? (
                <>
                    <div className="col-span-12 sm:p-6 p-4 place-content-center bg-sky-400 rounded-xl">
                        <h5 className="font-bold sm:text-4xl text-2xl">Total Sales:<span className="text-white">{' $' + reportData.totalSales}</span></h5>
                    </div>
                    <div className="col-span-12 h-[55vh] sm:h-[65vh] md:h-[53vh] overflow-auto place-content-start rounded-xl bg-amber-400 noscroll-bar border">
                        <div className="relative table w-full rounded-3xl border-collapse sm:text-start text-center">
                            <div className="table-header-group sticky top-0">
                                <div className="table-row bg-white font-bold sm:text-xl text-sm text-nowrap border-2 border-white">
                                    <div className="table-cell p-1 sm:pl-4 sm:p-2">Item Name</div>
                                    <div className="table-cell p-1 sm:pl-4 sm:p-2">Quantity</div>
                                    <div className="table-cell p-1 sm:pl-4 sm:p-2">Total Sales</div>
                                </div>
                            </div>
                            <div className="table-row-group text-white">
                                {reportData.itemsReport.map((item, index) => (
                                    <>
                                    <div key={index} className="table-row text-xs sm:text-lg font-medium">
                                        <div className="table-cell sm:h-auto h-12 align-middle pl-0.5 sm:pl-4 sm:py-1 border-2 border-white capitalize">{item.itemName}</div>
                                        <div className="table-cell sm:h-auto h-12 align-middle pl-0.5 sm:pl-4 sm:py-1 border-2 border-white">{'x '+item.quantitySold}</div>
                                        <div className="table-cell sm:h-auto h-12 align-middle pl-0.5 sm:pl-4 sm:py-1 border-2 border-white">{'$ '+item.totalSales}</div>
                                    </div>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
                ) : (
                    <>
                    <div className="bg-purple-400 p-8 col-span-12 rounded-xl flex flex-col items-center gap-y-4">
                        <h5 className="text-xl sm:text-3xl font-bold text-center">No Data Is Available to Display...</h5>
                        <button onClick={() => setSelectedReport(selectedReport)} className="border-2 px-4 py-1 rounded-full text-white font-medium hover:bg-white hover:text-black transition">Refresh</button>
                    </div>
                    </>
                )}
            </div>
        </div>
    );
};
