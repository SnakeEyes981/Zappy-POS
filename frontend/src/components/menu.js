import { useState, useEffect } from "react";
import OrderCard from "./order-card";
import Itemscard from "./items-card";


export default function Menu(params) {
    const [orderNav, setOrderNav] = useState('dine in')
    const [menuNav, setMenuNav] = useState('all')
    const [selectedItems, setSelectedItems] = useState([])

    function injectData(itemDetails, quantity, itemStillInCart) {
        setSelectedItems((prevItems) => {
            if (!itemStillInCart && quantity === 0) {
                // Add item if it's not in the cart and quantity is zero
                return [...prevItems, { itemDetails, quantity }];
            } else if (!itemStillInCart && quantity > 0) {
                // Update the quantity if item is already in the cart
                const itemRef = prevItems.find(item => item.itemDetails.itemName === itemDetails.itemName);
                if (itemRef) {
                    // Create a new array with updated quantity for the item
                    return prevItems.map(item => 
                        item.itemDetails.itemName === itemDetails.itemName
                            ? { ...item, quantity }  // Spread the item and update its quantity
                            : item
                    );
                } else {
                    // If item is not already in the cart, just add it with the new quantity
                    return [...prevItems, { itemDetails, quantity }];
                }
            } else if (itemStillInCart) {
                // Remove item from the cart if itemStillInCart is true
                return prevItems.filter(item => item.itemDetails.itemName !== itemDetails.itemName);
            }
    
            return prevItems;  // Return the previous items if no condition matched
        });
    }



    const orderBook = [
        {orderId: 1001, customerName: 'Tom Steve', status: 'Completed', type: 'take away', table: null, time: '01:30 pm', items: [
            {name : 'grilled cheese burger', quantity: 3},
            {name : 'chicken patti burger', quantity: 4},
            {name : 'fries', quantity: 5}
        ]},
        {orderId: 1002, customerName: 'John Wehlberg', status: 'In Progress', type: 'dine in', table: '2', time: '01:50 pm', items: [
            {name : 'chicken fajita pizza', quantity: 1},
            {name : 'cheese sandwich', quantity: 3},
            {name : 'diet coke', quantity: 2}
        ]},
        {orderId: 1003, customerName: 'Tony Montana', status: 'Pending', type: 'delivery', table: null, time: '02:10 pm', items: [
            {name : 'lotus pie', quantity: 3},
            {name : 'zinger wrap', quantity: 4},
            {name : 'zinger paratha', quantity: 4},
            {name : 'twister roll', quantity: 4},
            {name : 'beef burger', quantity: 2},
            {name : 'cardamom tea', quantity: 5}
        ]},
        {orderId: 1001, customerName: 'Tom Steve', status: 'Completed', type: 'take away', table: null, time: '01:30 pm', items: [
            {name : 'grilled cheese burger', quantity: 3},
            {name : 'chicken patti burger', quantity: 4},
            {name : 'fries', quantity: 5}
        ]},
        {orderId: 1002, customerName: 'John Wehlberg', status: 'In Progress', type: 'dine in', table: '2', time: '01:50 pm', items: [
            {name : 'chicken fajita pizza', quantity: 1},
            {name : 'cheese sandwich', quantity: 3},
            {name : 'diet coke', quantity: 2}
        ]},
        {orderId: 1003, customerName: 'Tony Montana', status: 'Pending', type: 'delivery', table: null, time: '02:10 pm', items: [
            {name : 'lotus pie', quantity: 3},
            {name : 'zinger wrap', quantity: 4},
            {name : 'zinger paratha', quantity: 4},
            {name : 'twister roll', quantity: 4},
            {name : 'beef burger', quantity: 2},
            {name : 'cardamom tea', quantity: 5}
        ]},
        {orderId: 1001, customerName: 'Tom Steve', status: 'Completed', type: 'take away', table: null, time: '01:30 pm', items: [
            {name : 'grilled cheese burger', quantity: 3},
            {name : 'chicken patti burger', quantity: 4},
            {name : 'fries', quantity: 5}
        ]},
        {orderId: 1002, customerName: 'John Wehlberg', status: 'In Progress', type: 'dine in', table: '2', time: '01:50 pm', items: [
            {name : 'chicken fajita pizza', quantity: 1},
            {name : 'cheese sandwich', quantity: 3},
            {name : 'diet coke', quantity: 2}
        ]},
        {orderId: 1003, customerName: 'Tony Montana', status: 'Pending', type: 'delivery', table: null, time: '02:10 pm', items: [
            {name : 'lotus pie', quantity: 3},
            {name : 'zinger wrap', quantity: 4},
            {name : 'zinger paratha', quantity: 4},
            {name : 'twister roll', quantity: 4},
            {name : 'beef burger', quantity: 2},
            {name : 'cardamom tea', quantity: 5}
        ]},
        {orderId: 1001, customerName: 'Tom Steve', status: 'Completed', type: 'take away', table: null, time: '01:30 pm', items: [
            {name : 'grilled cheese burger', quantity: 3},
            {name : 'chicken patti burger', quantity: 4},
            {name : 'fries', quantity: 5}
        ]},
        {orderId: 1002, customerName: 'John Wehlberg', status: 'In Progress', type: 'dine in', table: '2', time: '01:50 pm', items: [
            {name : 'chicken fajita pizza', quantity: 1},
            {name : 'cheese sandwich', quantity: 3},
            {name : 'diet coke', quantity: 2}
        ]},
        {orderId: 1003, customerName: 'Tony Montana', status: 'Pending', type: 'delivery', table: null, time: '02:10 pm', items: [
            {name : 'lotus pie', quantity: 3},
            {name : 'zinger wrap', quantity: 4},
            {name : 'zinger paratha', quantity: 4},
            {name : 'twister roll', quantity: 4},
            {name : 'beef burger', quantity: 2},
            {name : 'cardamom tea', quantity: 5}
        ]},
    ]

    const itemsObjectFromDb = [
        {itemCategory:"burger", itemPrice: 20, itemName: "Grilled Burger"},
        {itemCategory:"burger", itemPrice: 40, itemName: "Grilled Cheese Burger Double Pop"},
        {itemCategory:"pizza", itemPrice: 20, itemName: "Patti Burger"},
        {itemCategory:"pizza", itemPrice: 20, itemName: "Beef Steak Burger"},
        {itemCategory:"wraps", itemPrice: 20, itemName: "Zappy Special Burger"},
        {itemCategory:"wraps", itemPrice: 20, itemName: "Zappy Special Burger"},
        {itemCategory:"burger", itemPrice: 20, itemName: "Zappy Special Burger"},
        {itemCategory:"burger", itemPrice: 20, itemName: "Zappy Special Burger"},
    ]

    return (
        <>
        <div className="col-span-12 lg:col-span-9 grid grid-cols-12 gap-y-4 content-between">
            {/* 1st Container */}
            <div className="col-span-12 md:gap-y-0 gap-y-4 content-center space-y-2">
                <div className="w-full">
                    <div className="heading flex md:gap-x-8 md:gap-y-0 gap-y-6 items-center md:flex-row flex-col shrink">
                        <h3 className="text-nowrap font-extrabold text-xl">Order Line</h3>
                        <div className="ordersNavigation w-full flex items-center justify-between md:flex-row flex-col md:gap-y-0 gap-y-4">
                            <div className="bg-white/75 p-0.5 md:rounded-full rounded-3xl flex gap-x-4 md:flex-row flex-col md:gap-y-0 gap-y-4 md:w-auto w-full">
                                <button onClick={() => setOrderNav('dine in')} className={`${orderNav === 'dine in' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Dine In</button>
                                <button onClick={() => setOrderNav('take away')} className={`${orderNav === 'take away' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Take Away</button>
                                <button onClick={() => setOrderNav('delivery')} className={`${orderNav === 'delivery' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Delivery</button>
                            </div>
                            <div className="bg-white/75 p-0.5 rounded-full md:w-auto w-full text-center">
                                <button onClick={() => setOrderNav('allOrders')} className={`${orderNav === 'allOrders' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition md:w-auto w-full`}>All Orders</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 md:gap-x-4 md:gap-y-0 gap-y-4 select-none flex flex-col rounded-xl md:flex-row overflow-y-auto md:flex-nowrap noscroll-bar">
                    {orderBook.map((order, index) => (
                        <OrderCard key={index} order={order} category={orderNav}/>
                    ))}
                </div>
            </div>
            {/* Menu Navigation */}
            <div className="col-span-12 w-full content-center">
                <div className="heading flex md:gap-x-4 lg:gap-y-0 gap-y-4 items-center justify-between lg:flex-row flex-col">
                    <div className="menuNavigation flex md:items-center justify-between md:gap-x-4 md:flex-row flex-col md:gap-y-0 gap-y-4 lg:w-auto w-full">
                        <h3 className="text-nowrap font-extrabold text-xl text-center">Menu</h3>
                        <div className="bg-white/75 p-0.5 md:rounded-full rounded-3xl flex gap-x-4 md:flex-row flex-col md:gap-y-0 gap-y-4">
                            <button onClick={() => setMenuNav('all')}  className={`${menuNav === 'all' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>All</button>
                            <button onClick={() => setMenuNav('pizza')}  className={`${menuNav === 'pizza' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Pizza</button>
                            <button onClick={() => setMenuNav('wraps')}  className={`${menuNav === 'wraps' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Wraps</button>
                            <button onClick={() => setMenuNav('burger')}  className={`${menuNav === 'burger' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Burgers</button>
                            <button onClick={() => setMenuNav('appetizers')}  className={`${menuNav === 'appetizers' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Appetizers</button>
                            <button onClick={() => setMenuNav('drinks')}  className={`${menuNav === 'drinks' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Drinks</button>
                            <button onClick={() => setMenuNav('desserts')}  className={`${menuNav === 'desserts' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Desserts</button>
                        </div>
                    </div>
                    <div className="relative group lg:w-auto w-full h-full">
                        <i className="absolute inset-y-3 left-3 group-focus:bg-red-500 fa-solid fa-search text-teal-500 font-black"></i>
                        <input className="font-medium group px-4 py-2 focus:outline-cyan-400 rounded-full bg-white/75 w-full pl-10"></input>
                    </div>
                </div>
            </div>
            {/* 3rd Container */}
            <div className="grid grid-cols-12 col-span-12 w-full gap-4 overflow-y-auto max-h-[100vh] lg:h-[50vh] place-content-start pr-2 sm:pr-4 custom-scroll">
                {itemsObjectFromDb.map((itemDetails, index) => (
                    <Itemscard key={index} filter={menuNav} itemDetails={itemDetails} injectData={injectData}/>
                ))}
            </div>
        </div>
        <div className="col-span-12 lg:col-span-3 p-2 bg-purple-400 rounded-xl space-y-8">
            <div className="space-y-2">
                <div className="flex justify-between items-center text-stone-950">
                    <h3 className="font-extrabold text-xl">Order Details</h3>
                    <button className="underline font-semibold">Cancel</button>
                </div>
                <div className="flex sm:flex-row flex-col bg-white/75 rounded-2xl sm:rounded-full text-sm font-semibold gap-x-1 sm:gap-x-2">
                    <button className="bg-stone-900 text-white p-1 w-full rounded-full">Dine In</button>
                    <button className="hover:bg-stone-900 hover:text-white transition p-1 w-full rounded-full">Take Away</button>
                    <button className="hover:bg-stone-900 hover:text-white transition p-1 w-full rounded-full">Delivery</button>
                </div>
                <div className="flex flex-col bg-white/75 rounded-xl">
                    <input className="bg-transparent outline-0 px-4 py-1 border-b border-purple-400" type="text" placeholder="Customer Name"/>
                    <select className="bg-transparent outline-0 px-4 py-1" name="" id="">
                        <option value="">Select Table</option>
                        <option value="1">1</option>
                        <option value="1">2</option>
                        <option value="1">3</option>
                        <option value="1">4</option>
                    </select>
                </div>
            </div>
            <div className="selected-items flex flex-col gap-y-2 h-[45vh] overflow-auto pr-2 custom-scroll">
                <h5 className="order-number font-semibold px-2">Order #423234</h5>
                {selectedItems.map((item, index) => (
                    <>
                        <div className="flex bg-white rounded-xl sm:flex-row flex-col sm:gap-y-2">
                            <div className="flex sm:basis-[50%] basis-[70%] flex-col gap-y-2 p-2">
                                <h3 className="font-bold text-center">{item.itemDetails.itemName}</h3>
                                <div className="flex items-center gap-x-4 md:w-auto w-full justify-center">
                                    
                                    <span className="item-counter font-extrabold">{"Qty: " + item.quantity}</span>
                                    
                                </div>
                            </div>
                            <div className="item-total bg-stone-900 text-white sm:py-0 py-2 sm:basis-[50%] basis-[30%] rounded-xl inline-flex items-center justify-center font-bold">
                                <span>$30.00</span>
                            </div>
                        </div>
                    </>
                ))}
            </div>
            <div className="space-y-2">
                <div className="bg-white rounded-full flex justify-between py-2 px-6">
                    <p className="orderTotal font-bold">Total</p>
                    <p className="orderTotal font-bold">$100</p>
                </div>
                <button className="submitTotal py-2 px-4 bg-black text-white font-bold w-full rounded-full">Place Order</button>    
            </div>
        </div>
        </>
    );
};
