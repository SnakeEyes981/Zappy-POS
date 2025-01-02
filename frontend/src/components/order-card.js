export default function OrderCard({order, category}) {
    return (
        <>
        <div className={`${category !== order.type ? 'hidden' : 'block'} order-card basis-[25%] shrink-0 rounded-xl bg-white/85 hover:bg-white transition p-4 w-full`}>
            <div className="flex flex-col items-center gap-y-4">
                <div className="flex justify-between items-center w-full sm:flex-row flex-col">
                    <h3 className="customerName font-bold capitalize">{order.customerName}</h3>
                    <p className="orderId text-gray-800 text-sm">{'#' + order.orderId}</p>
                </div>
                <div className="flex justify-between items-center text-sm font-medium text-gray-700 w-full">
                    <h3 className="quantity">{order.items.length + ' items'}</h3>
                    <p className="orderTime">{order.time}</p>
                </div>
                <div className="flex lg:flex-row flex-col justify-between md:items-center text-sm font-bold w-full text-center gap-y-2 md-gap-y-0">
                    <p className="tableNumber bg-emerald-300 rounded-full px-4 py-2 capitalize">{order.table !== null ? "Table " + order.table : order.type}</p>
                    <p className="orderStatus bg-amber-300 rounded-full px-4 py-2">{order.status}</p>
                </div>
            </div>
        </div>
        </>
    );
};
