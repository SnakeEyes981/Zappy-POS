import { useEffect, useState } from "react";

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
        {orderId: 1001, customerName: 'Tom Steve', status: 'Completed', type: 'take away', table: null, time_stamp: '2025-01-04T12:48:00', items: [
            {name : 'grilled cheese burger', quantity: 3, price: 52},
            {name : 'chicken patti burger', quantity: 4, price: 10},
            {name : 'fries', quantity: 5, price: 18}
        ]},
        {orderId: 1001, customerName: 'Jerry Mark', status: 'Completed', type: 'take away', table: null, time_stamp: '2025-01-04T12:45:00', items: [
            {name : 'grilled cheese burger', quantity: 3, price: 42},
            {name : 'chicken patti burger', quantity: 4, price: 21},
            {name : 'fries', quantity: 5, price: 52}
        ]},
        {orderId: 1001, customerName: 'Jim Berg', status: 'Completed', type: 'take away', table: null, time_stamp: '2025-01-04T12:43:00', items: [
            {name : 'grilled cheese burger', quantity: 3, price: 19},
            {name : 'chicken patti burger', quantity: 4, price: 35},
            {name : 'fries', quantity: 5, price: 11}
        ]},
        {orderId: 1001, customerName: 'Jim Berg', status: 'Completed', type: 'take away', table: null, time_stamp: '2025-01-04T12:43:00', items: [
            {name : 'grilled cheese burger', quantity: 3, price: 19},
            {name : 'chicken patti burger', quantity: 4, price: 35},
            {name : 'fries', quantity: 5, price: 11}
        ]},
    ]

    const [selectedReport, setSelectedReport] = useState('daily')
    const [reportData, setReportData] = useState({})
    useEffect(() => {
        console.log('Hi')
        if(selectedReport === 'daily')
            setReportData(generateReport('daily'))
        else if (selectedReport === 'weekly')
            setReportData(generateReport('weekly'))
        else if(selectedReport === 'monthly')
            setReportData(generateReport('monthly'))
    }, [selectedReport]);

    function generateReport(duration) {
        const CompletedOrder = ordersDetails.filter(order => order.status === 'Completed')
        const ReportData = {totalSales: calculateTotalSales(CompletedOrder), itemsDetails: calculateTotalSalesForIndividualItem(CompletedOrder)}
        return ReportData;
    }

    function calculateTotalSales(orders) {
        let totalSales = 0;
        orders.forEach(order => {
          order.items.forEach(item => {
            totalSales += item.price * item.quantity;
          });
        });
        return totalSales;
    }
    

    function calculateTotalSalesForIndividualItem(orders) {
        let TotalItemsReport = [];
        
        orders.forEach(order => {
          order.items.forEach(item => {
            let itemReport = {
              itemName: item.name,
              itemQuantity: item.quantity,
              itemRevenue: item.quantity * item.price,
            };
            TotalItemsReport.push(itemReport);
          });
        });
      
        return TotalItemsReport;
    }

    return (
        <div className="w-full h-screen md:h-[84vh] rounded-xl sm:space-y-2 bg-stone-950 text-white sm:p-4 p-2 overflow-hidden">
            <h5 className="text-3xl font-bold text-center">Sales</h5>
            <div className="flex sm:flex-row flex-col sm:gap-x-4 gap-x-0 sm:gap-y-0 gap-y-2 justify-center">
                <button onClick={() => setSelectedReport('daily')} className={`${selectedReport === 'daily' ? 'bg-white text-black' : ''} py-1 px-4 border border-white rounded-full`}>Daily Report</button>
                <button onClick={() => setSelectedReport('weekly')} className={`${selectedReport === 'weekly' ? 'bg-white text-black' : ''} py-1 px-4 border border-white rounded-full`}>Weekly Report</button>
                <button onClick={() => setSelectedReport('monthly')} className={`${selectedReport === 'monthly' ? 'bg-white text-black' : ''} py-1 px-4 border border-white rounded-full`}>Monthly Report</button>
            </div>
            <div className="grid grid-cols-12 gap-y-4 py-4 text-black">
                {reportData && Object.keys(reportData).length > 0 ? (
                <>
                    <div className="col-span-12 sm:p-6 p-4 place-content-center bg-white/90 rounded-xl">
                        <h5 className="font-bold sm:text-4xl text-2xl">{'Total Sales: $'+ reportData.totalSales}</h5>
                    </div>
                    <div className="col-span-12 h-[61vh] sm:h-[65vh] md:h-[53vh] overflow-auto place-content-start rounded-xl bg-white/90 p-2 sm:p-4">
                        <div className="relative table w-full rounded-3xl border-collapse border border-black">
                            <div className="table-header-group sticky -top-4">
                                <div className="table-row bg-white font-bold sm:text-xl text-sm text-nowrap">
                                    <div className="table-cell p-1 sm:pl-4 sm:p-2">Item Name</div>
                                    <div className="table-cell p-1 sm:pl-4 sm:p-2">Quantity</div>
                                    <div className="table-cell p-1 sm:pl-4 sm:p-2">Total Sales</div>
                                </div>
                            </div>
                            <div className="table-row-group">
                                {reportData.itemsDetails.map(item => (
                                    <div className="table-row text-xs sm:text-base">
                                        <div className="table-cell sm:h-auto h-12 align-middle pl-0.5 sm:pl-4 sm:py-1 border border-stone-600 capitalize">{item.itemName}</div>
                                        <div className="table-cell sm:h-auto h-12 align-middle pl-0.5 sm:pl-4 sm:py-1 border border-stone-600">{item.itemQuantity}</div>
                                        <div className="table-cell sm:h-auto h-12 align-middle pl-0.5 sm:pl-4 sm:py-1 border border-stone-600">{item.itemRevenue}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
                ) : (<p>No data...</p>)}
            </div>
        </div>
    );
};
