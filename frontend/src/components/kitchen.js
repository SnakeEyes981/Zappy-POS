import Kdsordercards from "./kdsordercards";

export default function Kitchen(params) {
    const currentDate = new Date()
    return (
        <>
        <div className="grid grid-cols-4 md:gap-x-8 lg:gap-y-0 gap-y-8">
            <div className="col-span-4 lg:col-span-3 p-2 space-y-4 max-h-[70vh] lg:max-h-[83vh] overflow-auto custom-scroll">
                <div className="flex sm:flex-row flex-col md:gap-y-0 gap-y-2 items-center justify-between text-white">
                    <h3 className="text-2xl font-black">Orders in Queue</h3>
                    <p className="font-bold text-lg">{currentDate.toLocaleDateString()}</p>
                </div>
                <div className="grid grid-cols-4 gap-4">
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
            <div className="col-span-4 lg:col-span-1 bg-amber-300 rounded-xl p-2">
                <div className="flex">
                    <h3 className="text-2xl font-black text-center w-full">Order Details</h3>
                </div>
            </div>
        </div>
        </>
    );
};
