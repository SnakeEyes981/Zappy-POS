export default function orderCard(params) {
    return (
        <>
        <div className="order-card col-span-4 md:col-span-1 rounded-xl bg-white/85 hover:bg-white transition p-4 w-full">
            <div className="flex flex-col items-center gap-y-4">
                <div className="flex justify-between items-center w-full sm:flex-row flex-col">
                    <h3 className="customerName font-bold">Mark Anthony</h3>
                    <p className="orderId text-gray-800 text-sm">#41249821</p>
                </div>
                <div className="flex justify-between items-center text-sm font-medium text-gray-700 w-full">
                    <h3 className="quantity">3 items</h3>
                    <p className="orderTime">6 min ago</p>
                </div>
                <div className="flex lg:flex-row flex-col justify-between md:items-center text-sm font-bold w-full text-center gap-y-2 md-gap-y-0">
                    <p className="tableNumber bg-emerald-300 rounded-full px-4 py-2">Table 4</p>
                    <p className="orderStatus bg-amber-300 rounded-full px-4 py-2">In Progress</p>
                </div>
            </div>
        </div>
        </>
    );
};
