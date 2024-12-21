export default function Kdsordercards(params) {
    return (
        <div className="col-span-4 sm:col-span-2 md:col-span-1 p-4 bg-white rounded-xl">
            <div className="flex flex-col gap-y-4">
                <div className="flex flex-shrink justify-between">
                    <h3 className="text-stone-700 font-bold">Order No.</h3>
                    <h3 className="text-stone-700">#42334</h3>
                </div>
                <div className="flex flex-shrink justify-between">
                    <h3 className="text-stone-700 font-bold">Status</h3>
                    <h3 className="text-stone-700">In Progress</h3>
                </div>
                <div className="flex flex-shrink justify-between">
                    <h3 className="text-stone-700 font-bold">Type</h3>
                    <h3 className="text-stone-700">Take Away</h3>
                </div>
                <div className="flex flex-shrink justify-between">
                    <h3 className="text-stone-700 font-bold">Time</h3>
                    <h3 className="text-stone-700">02:33</h3>
                </div>
                <div className="flex flex-col gap-y-2">
                    <button className="bg-emerald-500 hover:bg-emerald-400 rounded-xl py-2 font-extrabold">View Order</button>
                </div>
            </div>
        </div>
    );
};
