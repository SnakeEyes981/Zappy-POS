export default function Kdsordercards(params) {
    return (
        <div className="col-span-3 md:col-span-1 p-2 bg-white/75 rounded-xl shadow">
            <div className="flex gap-y-2 flex-col">
                <div className="flex lg:flex-row flex-col lg:gap-x-3 lg:gap-y-0 gap-y-2">
                    <div className="bg-sky-300 inline-flex items-center justify-center rounded-xl w-full lg:w-[75%] py-5">
                        <h5 className="font-bold">Take Away</h5>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex justify-between">
                            <h3 className="text-stone-700 font-medium">Order No.</h3>
                            <h3 className="text-stone-700">#42334</h3>
                        </div>
                        <div className="flex justify-between">
                            <h3 className="text-stone-700 font-medium">Status</h3>
                            <h3 className="text-stone-700">In Progress</h3>
                        </div>
                        <div className="flex justify-between">
                            <h3 className="text-stone-700 font-medium">Table</h3>
                            <h3 className="text-stone-700">#8</h3>
                        </div>
                        <div className="flex justify-between">
                            <h3 className="text-stone-700 font-medium">Time</h3>
                            <h3 className="text-stone-700">02:33</h3>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-y-2">
                    <button className="bg-emerald-300 hover:bg-emerald-400 rounded-xl py-2 font-bold">View Order</button>
                </div>
            </div>
        </div>
    );
};
