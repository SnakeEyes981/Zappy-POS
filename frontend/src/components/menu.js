import { useEffect, useState } from "react";
import OrderCard from "./order-card";
import Itemscard from "./items-card";
import api from "../api/axiosConfig";
import { useAuth } from "../hooks/useAuth";

export default function Menu() {
    const { isAuthenticated } = useAuth();
    const [orderNav, setOrderNav] = useState('all orders');
    const [menuNav, setMenuNav] = useState('all');
    const [orderType, setOrderType] = useState('dine in')
    const [selectedItems, setSelectedItems] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [orderBook, setOrderBook] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [selectedTable, setSelectedTable] = useState(null);
    const [resetItems, setResetItems] = useState(false);

    async function fetchMenu() {
        try {
            const response = await api.get('/menu');
            setMenuItems(response.data);
        } catch (error) {
            console.error('Error fetching menu items:', error.response?.data || error.message);
        }
    }

    async function fetchOrders() {
        try {
            const response = await api.get('/orders');
            setOrderBook(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error.response?.data || error.message);
        }
    }

    function resetsEverything() {
        setCustomerName('');
        setSelectedItems([]);
        setOrderType('dine in');
        setSelectedTable(0);
        setResetItems((prev) => !prev);
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchMenu();
            fetchOrders();
        }
    }, [isAuthenticated]);

    function injectData(itemDetails, quantity, itemStillInCart) {
        if (!itemDetails.itemName || !itemDetails.itemPrice || !itemDetails._id) {
            console.error("Incomplete item details provided:", itemDetails);
            return;
        }

        setSelectedItems((prevItems) => {
            if (!itemStillInCart && quantity === 0) {
                return [...prevItems, { itemDetails, quantity }];
            } else if (!itemStillInCart && quantity > 0) {
                const itemRef = prevItems.find(item => item.itemDetails.itemName === itemDetails.itemName);
                if (itemRef) {
                    return prevItems.map(item =>
                        item.itemDetails.itemName === itemDetails.itemName
                            ? { ...item, quantity }
                            : item
                    );
                } else {
                    return [...prevItems, { itemDetails, quantity }];
                }
            } else if (itemStillInCart) {
                return prevItems.filter(item => item.itemDetails.itemName !== itemDetails.itemName);
            }
            return prevItems;
        });
    }

    async function placeOrder() {
        const userId = localStorage.getItem('id');
        if (orderType === 'dine in' && !selectedTable) {
            alert('Please select a table for dine-in orders.');
            return;
        }
        const newOrder = {
            customerName: customerName.trim() || 'Guest',
            status: "Pending",
            type: orderType,
            table: orderType === 'dine in' ? selectedTable : null,
            time: new Date().toISOString(),
            items: selectedItems.map(({ itemDetails, quantity }) => ({
                item: itemDetails._id,
                quantity,
            })),
            createdBy: userId,
        };
    
        try {
            const response = await api.post('/orders', newOrder);
            alert('Order placed successfully!');
            resetsEverything();
            fetchOrders();
        } catch (error) {
            console.error('Error placing order:', error.response?.data || error.message);
            alert('Failed to place order. Please try again.');
        }
    }
    
    

    return (
        <>
        <div className="col-span-12 lg:col-span-9 grid grid-cols-12 lg:h-[85vh] place-content-between">
            {/* 1st Container */}
            <div className="col-span-12">
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
                                <button onClick={() => setOrderNav('all orders')} className={`${orderNav === 'all orders' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition md:w-auto w-full`}>All Orders</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="select-none flex flex-col rounded-xl md:flex-row overflow-y-auto md:flex-nowrap noscroll-bar">
                    {orderBook.length > 0 ? 
                    orderBook.map((order, index) => (
                        <OrderCard key={index} order={order} category={orderNav}/>
                    )):
                    <>
                        <div className="col-span-12 py-8 w-full text-center font-bold text-xl">
                            <h5>No Orders Currently</h5>
                        </div>
                    </>}
                </div>
            </div>
            {/* Menu Navigation */}
            <div className="col-span-12 w-full space-y-1">
                <div className="w-full content-center">
                    <div className="heading flex md:gap-x-4 lg:gap-y-0 gap-y-4 items-center justify-between lg:flex-row flex-col">
                        <div className="menuNavigation flex md:items-center justify-between md:gap-x-4 md:flex-row flex-col md:gap-y-0 gap-y-4 w-full">
                            <h3 className="text-nowrap font-extrabold text-xl text-center">Menu</h3>
                            <div className="bg-white/75 p-0.5 md:rounded-full rounded-3xl flex gap-x-4 md:flex-row flex-col md:gap-y-0 gap-y-4">
                                <button onClick={() => setMenuNav('all')}  className={`${menuNav === 'all' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>All</button>
                                <button onClick={() => setMenuNav('pizza')}  className={`${menuNav === 'pizza' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Pizza</button>
                                <button onClick={() => setMenuNav('wraps')}  className={`${menuNav === 'wraps' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Wraps</button>
                                <button onClick={() => setMenuNav('burger')}  className={`${menuNav === 'burger' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Burgers</button>
                                <button onClick={() => setMenuNav('appetizer')}  className={`${menuNav === 'appetizer' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Appetizers</button>
                                <button onClick={() => setMenuNav('drink')}  className={`${menuNav === 'drink' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Drinks</button>
                                <button onClick={() => setMenuNav('dessert')}  className={`${menuNav === 'dessert' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Desserts</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 3rd Container */}
                <div className="grid grid-cols-12 col-span-12 w-full gap-2 sm:gap-4 overflow-y-auto max-h-[100vh] lg:h-[48vh] rounded-3xl place-content-start pr-3 sm:px-3 sm:py-1 custom-scroll">
                    {menuItems.length > 0 ?
                    menuItems.map((itemDetails, index) => (
                        <Itemscard key={index} filter={menuNav} itemDetails={itemDetails} injectData={injectData} reset={resetItems}/>
                    )) :
                    <div className="col-span-12 py-8 w-full text-center font-bold text-xl">
                        <h5>No Items Are Currently Added</h5>
                    </div>}
                </div>
            </div>
        </div>
        <div className="col-span-12 lg:col-span-3 p-2 bg-purple-400 rounded-xl flex flex-col justify-between gap-y-8 h-full">
            <div className="space-y-8">
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-stone-950">
                        <h3 className="font-extrabold text-xl">Order Details</h3>
                        <button onClick={() => {resetsEverything()}} className="underline font-semibold">Cancel</button>
                    </div>
                    <div className="flex sm:flex-row flex-col bg-white/75 rounded-2xl sm:rounded-full text-sm font-semibold gap-x-1 sm:gap-x-2">
                        <button onClick={() => setOrderType('dine in')} className={`${orderType === 'dine in' ? 'bg-stone-900 text-white' : ''} hover:bg-stone-900 hover:text-white transition p-1 w-full rounded-full`}>Dine In</button>
                        <button onClick={() => setOrderType('take away')} className={`${orderType === 'take away' ? 'bg-stone-900 text-white' : ''} hover:bg-stone-900 hover:text-white transition p-1 w-full rounded-full`}>Take Away</button>
                        <button onClick={() => setOrderType('delivery')} className={`${orderType === 'delivery' ? 'bg-stone-900 text-white' : ''} hover:bg-stone-900 hover:text-white transition p-1 w-full rounded-full`}>Delivery</button>
                    </div>
                    <div className="flex flex-col bg-white/75 rounded-xl">
                        <input className="bg-transparent outline-0 px-4 py-1 border-b border-purple-400" type="text" placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)}/>
                        <select className="bg-transparent outline-0 px-4 py-1" name="" id="" value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)}>
                            <option value={null}>Select Table</option>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((table) => (
                                <option key={table} value={table}>
                                    {table}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="selected-items flex flex-col gap-y-2 h-[45vh] overflow-auto pr-2 custom-scroll">
                    <h5 className="font-bold text-xl">Order Items</h5>
                    {selectedItems.map((item, index) => (
                        <div key={index} className="flex bg-white rounded-xl sm:flex-row flex-col sm:gap-y-2">
                            <div className="flex sm:basis-[50%] basis-[70%] flex-col gap-y-2 p-2">
                                <h3 className="font-bold text-center">{item.itemDetails.itemName}</h3>
                                <div className="flex items-center gap-x-4 md:w-auto w-full justify-center">
                                    
                                    <span className="item-counter font-extrabold">{"Qty: " + item.quantity}</span>
                                    
                                </div>
                            </div>
                            <div className="item-total bg-stone-900 text-white sm:py-0 py-2 sm:basis-[50%] basis-[30%] rounded-xl inline-flex items-center justify-center font-bold">
                                <span>{`$${(item.itemDetails.itemPrice * item.quantity).toFixed(2)}`}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="space-y-2">
                <div className="bg-white rounded-full flex justify-between py-2 px-6">
                    <p className="orderTotal font-bold">Total</p>
                    <p className="orderTotal font-bold">${selectedItems.reduce((total, item) => total + item.itemDetails.itemPrice * item.quantity, 0)}</p>
                </div>
                <button onClick={() => {placeOrder()}} className="submitTotal py-2 px-4 bg-black text-white font-bold w-full rounded-full">Place Order</button>    
            </div>
        </div>
        </>
    );
};
