import OrderCard from "./order-card";
export default function menu(params) {
    return (
        <>
        <div className="col-span-12 md:col-span-9 grid grid-cols-12 gap-4 md:p-4">
                <div className="col-span-12 w-full">
                    <div className="orderLine">
                        <div className="heading flex md:gap-x-8 md:gap-y-0 gap-y-6 items-center md:flex-row flex-col shrink">
                            <h3 className="text-nowrap font-extrabold text-xl">Order Line</h3>
                            <div className="ordersNavigation w-full flex items-center justify-between md:flex-row flex-col md:gap-y-0 gap-y-4">
                                <div className="bg-white/75 p-0.5 md:rounded-full rounded-3xl flex gap-x-4 md:flex-row flex-col md:gap-y-0 gap-y-4 md:w-auto w-full">
                                    <button className="font-medium bg-purple-300 px-4 py-2 rounded-full">Dine In</button>
                                    <button className="font-medium px-4 py-2 rounded-full">Take Away</button>
                                    <button className="font-medium px-4 py-2 rounded-full">Delivery</button>
                                </div>
                                <div className="bg-white/75 p-0.5 rounded-full md:w-auto w-full text-center">
                                    <button className="font-medium px-4 py-2">All Orders</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 flex md:flex-row flex-col md:gap-x-6 md:gap-y-0 gap-y-4 overflow-auto md:flex-nowrap md:py-4">
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                    <OrderCard />
                </div>
            
        </div>
        <div className="col-span-12 md:col-span-3 p-2 bg-purple-400 rounded-xl"></div>
        </>
    );
};
