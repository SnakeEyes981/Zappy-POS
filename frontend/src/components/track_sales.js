import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import dayjs from "dayjs";

export default function TrackSales() {
    const [ordersDetails, setOrderDetails] = useState([]);
    const [selectedReport, setSelectedReport] = useState("daily");
    const [reportData, setReportData] = useState({ totalSales: 0, itemsReport: [] });

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        const result = generateReport(selectedReport);
        setReportData(result);
    }, [selectedReport, ordersDetails]);

    async function fetchOrders() {
        try {
            const response = await api.get("/orders"); // Make GET request
            setOrderDetails(response.data); // Update orders state
        } catch (error) {
            console.error("Error fetching orders:", error.response?.data || error.message);
        }
    }

    function generateReport(duration) {
        if (ordersDetails.length === 0) {
            return { totalSales: 0, itemsReport: [] };
        }

        const completedOrders = ordersDetails.filter(order => order.status === "Completed");
        const now = dayjs();
        let dateLimit;

        if (duration === "daily") {
            dateLimit = now.subtract(1, "day");
        } else if (duration === "weekly") {
            dateLimit = now.subtract(1, "week");
        } else if (duration === "monthly") {
            dateLimit = now.subtract(1, "month");
        } else {
            dateLimit = dayjs("1970-01-01");
        }

        const filteredOrders = completedOrders.filter(order => dayjs(order.time).isAfter(dateLimit));
        const totalSales = calculateTotalSales(filteredOrders);
        const itemsReport = calculateTotalSalesForIndividualItems(filteredOrders);

        return {
            totalSales,
            itemsReport,
        };
    }

    function calculateTotalSales(orders) {
        return orders.reduce((total, order) => {
            return total + order.items.reduce((orderTotal, item) => {
                return orderTotal + item.item.itemPrice * item.quantity;
            }, 0);
        }, 0);
    }

    function calculateTotalSalesForIndividualItems(orders) {
        const itemReport = [];

        orders.forEach(order => {
            order.items.forEach(item => {
                const existingItem = itemReport.find(report => report.itemName === item.item.itemName);
                if (existingItem) {
                    existingItem.quantitySold += item.quantity;
                    existingItem.totalSales += item.item.itemPrice * item.quantity;
                } else {
                    itemReport.push({
                        itemName: item.item.itemName,
                        quantitySold: item.quantity,
                        totalSales: item.item.itemPrice * item.quantity,
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
                <button onClick={() => setSelectedReport("daily")} className={`${selectedReport === "daily" ? "bg-white text-black" : ""} py-1 px-4 border border-white rounded-full`}>Daily Report</button>
                <button onClick={() => setSelectedReport("weekly")} className={`${selectedReport === "weekly" ? "bg-white text-black" : ""} py-1 px-4 border border-white rounded-full`}>Weekly Report</button>
                <button onClick={() => setSelectedReport("monthly")} className={`${selectedReport === "monthly" ? "bg-white text-black" : ""} py-1 px-4 border border-white rounded-full`}>Monthly Report</button>
                <button onClick={() => setSelectedReport("all")} className={`${selectedReport === "all" ? "bg-white text-black" : ""} py-1 px-4 border border-white rounded-full`}>All Time Report</button>
            </div>
            <div className="grid grid-cols-12 gap-y-4 py-4 text-black">
                {reportData && reportData.itemsReport.length > 0 ? (
                    <>
                        <div className="col-span-12 sm:p-6 p-4 place-content-center bg-amber-400 rounded-xl">
                            <h5 className="font-bold sm:text-4xl text-2xl">Total Sales:<span className="text-white">{' $' + reportData.totalSales}</span></h5>
                        </div>
                        <div className="col-span-12 h-[55vh] sm:h-[65vh] md:h-[53vh] overflow-auto place-content-start rounded-xl bg-sky-500 noscroll-bar">
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
                                        <div key={index} className="table-row text-xs sm:text-lg font-medium">
                                            <div className="table-cell sm:h-auto h-12 align-middle pl-0.5 sm:pl-4 sm:py-1 border-2 border-white capitalize">{item.itemName}</div>
                                            <div className="table-cell sm:h-auto h-12 align-middle pl-0.5 sm:pl-4 sm:py-1 border-2 border-white">{'x ' + item.quantitySold}</div>
                                            <div className="table-cell sm:h-auto h-12 align-middle pl-0.5 sm:pl-4 sm:py-1 border-2 border-white">{'$ ' + item.totalSales}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="bg-purple-400 p-8 col-span-12 rounded-xl flex flex-col items-center gap-y-4">
                        <h5 className="text-xl sm:text-3xl font-bold text-center">No Data Is Available to Display...</h5>
                        <button onClick={() => fetchOrders()} className="border-2 px-4 py-1 rounded-full text-white font-medium hover:bg-white hover:text-black transition">Refresh</button>
                    </div>
                )}
            </div>
        </div>
    );
}
