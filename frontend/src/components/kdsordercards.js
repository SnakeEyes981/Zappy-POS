export default function Kdsordercards({order, index, viewOrder}) {
    return (
        <div className="col-span-3 md:col-span-1 p-2 bg-stone-900 text-white rounded-xl shadow">
            <div className="flex gap-y-2 flex-col">
                <div className="flex lg:flex-row flex-col lg:gap-x-3 lg:gap-y-0 gap-y-2">
                    <div className="bg-gradient-to-tl from-teal-400 to-yellow-200 text-stone-900 inline-flex items-center justify-center rounded-xl w-full lg:w-[75%] py-3 sm:py-5">
                        <h5 className="font-extrabold capitalize">{order.type}</h5>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex justify-between">
                            <h3 className="font-medium">Order No.</h3>
                            <h3 className="font-light">{"#"+order.orderId}</h3>
                        </div>
                        <div className="flex justify-between">
                            <h3 className="font-medium">Status</h3>
                            <h3 className="font-light capitalize">{order.status}</h3>
                        </div>
                        <div className="flex justify-between">
                            <h3 className="font-medium">Time</h3>
                            <h3 className="font-light">{order.time}</h3>
                        </div>
                        <div className={`${order.type === 'dine in' ? '' : 'invisible'} flex justify-between`}>
                            <h3 className="font-medium">Table</h3>
                            <h3 className="font-light">{"#"+order.table}</h3>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-y-2">
                    <button onClick={() => viewOrder(order.items, order.orderId)} className="border-white border hover:bg-white hover:text-stone-900 transition rounded-xl py-1.5 font-bold">View Order</button>
                </div>
            </div>
        </div>
    );
};
