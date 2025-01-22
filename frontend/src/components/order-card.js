export default function OrderCard({order, category, calledInOrdersPage}) {

    function getColor(status) {
        if(status === "Pending") return "bg-amber-300"
        if(status === "In Progress") return "bg-purple-300"
        if(status === "Completed") return "bg-blue-400"
        if(status === "Cancelled") return "bg-red-400"
    }

    return (
        <>
        <div key={order._id} className={`${category === 'all orders' ? 'block' : (category !== order.type ? 'hidden' : 'block')} order-card basis-[25%] shrink-0 transition px-0 py-1 sm:p-2`}>
            <div className="flex flex-col items-center gap-y-4 bg-white/85 hover:bg-white p-2 w-full rounded-xl">
                <div className="flex justify-between items-center w-full sm:flex-row flex-col">
                    <h3 className="customerName font-bold capitalize">{order.customerName}</h3>
                    <p className="orderId text-gray-800 text-sm">{'#' + order._id.slice(0,7)}</p>
                </div>
                <div className="flex justify-between items-center text-sm font-medium text-gray-700 w-full">
                    <h3 className="quantity">{order.items.length + ' items'}</h3>
                    <p className="orderTime">{new Date(order.time).toLocaleString()}</p>
                </div>
                <div className="flex flex-col md:items-center text-sm font-bold w-full text-center gap-y-2">
                    <p className="w-full tableNumber bg-emerald-300 rounded-full px-4 py-2 capitalize">{order.table !== null ? "Table " + order.table : order.type}</p>
                    <p className={`${getColor(order.status)} w-full orderStatus rounded-full px-4 py-2`}>{order.status}</p>
                </div>
                {calledInOrdersPage ? 
                <div className="flex justify-between items-center text-sm font-medium text-gray-700 w-full">
                    <p className="font-semibold text-stone-950">Created By:</p>
                    <p className="font-semibold text-stone-950">{order.createdBy}</p>
                </div>
                : null}
            </div>
        </div>
        </>
    );
};
