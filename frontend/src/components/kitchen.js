import Kdsordercards from "./kdsordercards";

export default function Kitchen(params) {
    const currentDate = new Date()
    return (
        <>
        <div className="grid grid-cols-4 md:gap-x-8 lg:gap-y-0 gap-y-8">
            <div className="col-span-4 lg:col-span-3 p-2 space-y-4 max-h-[70vh] lg:max-h-[83vh] overflow-auto custom-scroll">
                <div className="flex sm:flex-row flex-col md:gap-y-0 gap-y-2 items-center justify-center">
                    <h3 className="text-2xl font-black">Orders in Queue</h3>
                    {/* <p className="font-bold text-lg">{currentDate.toLocaleDateString()}</p> */}
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <Kdsordercards />
                    <Kdsordercards />
                    <Kdsordercards />
                    <Kdsordercards />
                    <Kdsordercards />
                    <Kdsordercards />
                    <Kdsordercards />
                    <Kdsordercards />
                    <Kdsordercards />
                    <Kdsordercards />
                    <Kdsordercards />
                    <Kdsordercards />
                    <Kdsordercards />
                    <Kdsordercards />
                    <Kdsordercards />
                </div>
            </div>
            <div className="col-span-4 lg:col-span-1 bg-amber-300/75 rounded-xl p-2">
                <div className="flex flex-col gap-y-2">
                    <h3 className="text-2xl font-black text-center w-full">Order Details</h3>
                    <div className="items-list-container overflow-auto h-[65vh] custom-scroll pr-2 space-y-2">
                        {/* <div className="flex sm:flex-row flex-col justify-between font-semibold mt-2">
                            <h3 className="">Patty Burger</h3>
                            <h3 className="font-bold">Qty: x5</h3>
                        </div>
                        <div className="flex sm:flex-row flex-col justify-between font-semibold mt-2">
                            <h3 className="">Grilled Cheese Burger</h3>
                            <h3 className="font-bold">Qty: x2</h3>
                        </div>
                        <div className="flex sm:flex-row flex-col justify-between font-semibold mt-2">
                            <h3 className=" text-wrap">Chicken Cheese Pizza (Large)</h3>
                            <h3 className="font-bold">Qty: x1</h3>
                        </div> */}
                        <div className="bg-stone-950 text-white py-2 px-4 rounded-xl space-y-2">
                            <h3 className="item-name text-lg font-semibold">Chicken Cheese Grilled Burger</h3>
                            <div>
                                <h3 className="variance font-semibold">Variance: <span className="font-light">Regular</span></h3>
                                <h5 className="quantity">Quantity: <span className="font-light">x4</span></h5>
                            </div>
                        </div>
                        <div className="bg-stone-950 text-white py-2 px-4 rounded-xl space-y-2">
                            <h3 className="item-name text-lg font-semibold">Barbeque Platter</h3>
                            <div>
                                <h3 className="variance font-semibold">Variance: <span className="font-light">Large</span></h3>
                                <h5 className="quantity">Quantity: <span className="font-light">x2</span></h5>
                            </div>
                        </div>
                    </div>
                    <div className="order-control flex flex-col gap-y-2">
                        <button className="border border-black py-1 rounded-xl hover:bg-stone-950 hover:text-white transition">Complete</button>
                        <button className="border border-black py-1 rounded-xl hover:bg-stone-950 hover:text-white transition">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};
