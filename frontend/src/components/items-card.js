import { useState } from "react";
import itemPic from "../assets/menu-item.jpg"

export default function Itemscard({injectData, itemDetails}) {
    const [isActive, setIsActive] = useState(false)
    const [counter, setCounter] = useState(0)
    console.log('hey')
    return (
        <>
        <div className="relative col-span-12 sm:col-span-6 lg:col-span-4 bg-white shadow-md rounded-3xl p-1">
            <div className="flex sm:flex-row flex-col lg:justify-start justify-between">
                <div className="h-32 sm:h-auto sm:basis-[70%] md:basis-[40%] lg:basis-[70%] item-image rounded-3xl overflow-hidden bg-red-500">
                    <img className="object-cover h-full w-full bg-teal-500 object-center"  src={itemPic} alt="" />
                </div>
                <div className="item-info flex flex-col basis-[100%] justify-between sm:px-3 sm:py-1.5 px-2 py-4">
                    <div className="">
                        <div className="flex justify-between">
                            <h5 className="category md:text-base text-sm font-medium text-stone-700">{itemDetails.itemCategory}</h5>
                            <p className="price md:text-base text-sm font-bold text-stone-800">{"$" + itemDetails.itemPrice}</p>
                        </div>
                        <div className="">
                            <h5 className="name text-stone-900 text-base sm:text-sm md:text-base font-bold h-16 md:font-extrabold">{itemDetails.itemName}</h5>
                        </div>
                    </div>
                    <div className="flex justify-start">
                        <div className="flex items-center gap-x-6">
                            <button disabled={!isActive} onClick={() => {if (counter === 1) {setIsActive(false); setCounter(0);} else setCounter(counter - 1)}} className={`${isActive ? 'bg-stone-900' : 'bg-stone-600 cursor-no-drop'} p-1 w-6 h-6 rounded-full text-white inline-flex items-center justify-center`}><i className="text-sm fa-solid fa-minus"></i></button>
                            <span className={`${isActive ? 'text-stone-900' : ' text-stone-600'} font-black text-lg cursor-no-drop`}>{counter}</span>
                            <button disabled={!isActive} onClick={() => {setCounter(counter + 1)}} className={`${isActive ? 'bg-stone-900' : 'bg-stone-600 cursor-no-drop'} p-1 w-6 h-6 rounded-full text-white inline-flex items-center justify-center`}><i className="text-sm fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute -right-1 -bottom-1">
                <button onClick={() => {setIsActive(!isActive); setCounter(isActive ? 0 : 1); injectData(itemDetails)}} className={`${isActive ? 'rotate-45' : 'rotate-0'} w-10 h-10 rounded-full bg-stone-950 hover:bg-stone-800 transition text-white`}><i className="fa-solid fa-plus text-xl"></i></button>
            </div>
        </div>
        </>
    );
};
