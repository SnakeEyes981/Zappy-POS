import { useState } from "react";
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
        { itemCategory: "pizza", itemPrice: 18, itemName: "Margarita Pizza", itemSrc: 'https://cdn.shopify.com/s/files/1/0274/9503/9079/files/20220211142754-margherita-9920_5a73220e-4a1a-4d33-b38f-26e98e3cd986.jpg?v=1723650067' },
        { itemCategory: "pizza", itemPrice: 25, itemName: "Pepperoni Delight", itemSrc: 'https://i0.wp.com/www.amysrecipebook.com/wp-content/uploads/2021/01/pepperonipizza-8-web.jpg?resize=1024%2C683&ssl=1' },
        { itemCategory: "pizza", itemPrice: 22, itemName: "BBQ Chicken Pizza", itemSrc: 'https://mediavine-res.cloudinary.com/image/upload/s--_Kf5SiB---/c_limit,f_auto,fl_lossy,h_1080,q_auto,w_1920/v1685738865/xd52eg0tkuw1avg01bpo.jpg' },
        { itemCategory: "pizza", itemPrice: 20, itemName: "Veggie Supreme Pizza", itemSrc: 'https://www.twopeasandtheirpod.com/wp-content/uploads/2021/03/Veggie-Pizza-8.jpg' },
        { itemCategory: "pizza", itemPrice: 23, itemName: "Hawaiian Paradise Pizza", itemSrc: 'https://www.thespruceeats.com/thmb/9KzBgyBZ1LHG8DKLkZ8psYXbm8Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/hawaiian-pizza-4691857-hero-01-1a8f6764c70e4113bbf31bd1a73aca2e.jpg' },
        { itemCategory: "wraps", itemPrice: 15, itemName: "Chicken Caesar Wrap", itemSrc: 'https://rachaelsgoodeats.com/wp-content/uploads/2022/06/240108_chicken-caesar-wrap-13.jpg' },
        { itemCategory: "wraps", itemPrice: 17, itemName: "Falafel Veggie Wrap", itemSrc: 'https://www.hauteandhealthyliving.com/wp-content/uploads/2022/01/Falafel-Wrap-with-hummus-8.jpg' },
        { itemCategory: "wraps", itemPrice: 18, itemName: "Grilled Steak Wrap", itemSrc: 'https://emilybites.com/wp-content/uploads/2016/03/Black-and-Blue-Steak-Wraps-6b.jpg' },
        { itemCategory: "wraps", itemPrice: 16, itemName: "Spicy Chicken Wrap", itemSrc: 'https://sailorbailey.com/wp-content/uploads/2023/04/Cajun-Chicken-Wrap.jpg' },
        { itemCategory: "wraps", itemPrice: 14, itemName: "Buffalo Chicken Wrap", itemSrc: 'https://www.allrecipes.com/thmb/5BWYRjbPBQu7p7J0YInrHkGnVJU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-188473-Buffalo-Chicken-Wraps-ddmfs-gw-beauty-4x3-adec66cb0d4e46b48ac4f07ee648fec7.jpg' },
        { itemCategory: "burger", itemPrice: 25, itemName: "Classic Cheeseburger", itemSrc: 'https://rhubarbandcod.com/wp-content/uploads/2022/06/The-Classic-Cheeseburger-1.jpg' },
        { itemCategory: "burger", itemPrice: 30, itemName: "BBQ Bacon Burger", itemSrc: 'https://s3.amazonaws.com/com.commerceowl.prod/16x9/L/21f61bc3-720d-430a-9261-c485de73fa08.jpeg' },
        { itemCategory: "burger", itemPrice: 22, itemName: "Mushroom Swiss Burger", itemSrc: 'https://embed.widencdn.net/img/beef/s3ccow03qm/1120x840px/Mushroom-Swiss-Burger-with-Jalapeno-Aioli_FY22_3.tif?keep=c&u=7fueml' },
        { itemCategory: "burger", itemPrice: 28, itemName: "Double Beef Burger", itemSrc: 'https://www.usa-beef.org/wp-content/uploads/2021/01/shutterstock_1690605409-scaled.jpg' },
        { itemCategory: "burger", itemPrice: 24, itemName: "Spicy Jalapeño Burger", itemSrc: 'https://wickedkitchen.com/wp-content/uploads/2022/05/Wicked-jalapeno-burger.jpeg' },
        { itemCategory: "appetizer", itemPrice: 12, itemName: "Mozzarella Sticks", itemSrc: 'https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/30/97/7/7GmgWw4TTUCCw7xGKQAP_0S9A6434.jpg' },
        { itemCategory: "appetizer", itemPrice: 10, itemName: "Garlic Bread", itemSrc: 'https://www.allrecipes.com/thmb/ymrjQ3GFq_Fc7Fu2yfvIj108tcM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21080-great-garlic-bread-DDMFS-4x3-e1c7b5c79fde4d629a9b7bce6c0702ed.jpg' },
        { itemCategory: "appetizer", itemPrice: 14, itemName: "Stuffed Jalapeños", itemSrc: 'https://keviniscooking.com/wp-content/uploads/2021/06/Baked-Jalapeno-Poppers-square.jpg' },
        { itemCategory: "appetizer", itemPrice: 11, itemName: "Chicken Wings", itemSrc: 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Five-Spice-Chicken-Wings_EXPS_TOHFM25_92962_DR_02_07_3b.jpg' },
        { itemCategory: "appetizer", itemPrice: 13, itemName: "Onion Rings", itemSrc: 'https://kristineskitchenblog.com/wp-content/uploads/2022/03/crispy-air-fryer-onion-rings-recipe-0775.jpg' },
        { itemCategory: "drink", itemPrice: 5, itemName: "Fresh Lemonade", itemSrc: 'https://www.simplyrecipes.com/thmb/4LFrc9hSMoKErr2WI7tThcnvWwA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Perfect-Lemonade-LEAD-08-B-441ceb568f854bb485dbed79e082bb4a.jpg' },
        { itemCategory: "drink", itemPrice: 6, itemName: "Iced Tea", itemSrc: 'https://www.thespruceeats.com/thmb/jk3sZ3Jtq2WPnd31DrB-FR1qfs0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/summer-peach-tea-cocktail-recipe-761506-hero-01-f949acc1ed22404da03ce72648412bcf.jpg' },
        { itemCategory: "drink", itemPrice: 4, itemName: "Coca-Cola", itemSrc: 'https://www.shutterstock.com/image-photo/poznan-pol-aug-13-2019-600nw-2458808941.jpg' },
        { itemCategory: "drink", itemPrice: 7, itemName: "Sparkling Water", itemSrc: 'https://blog.myfitnesspal.com/wp-content/uploads/2018/07/Is-Flavored-Sparkling-Water-Killing-Your-Weight-Loss-Goals_-1.jpg' },
        { itemCategory: "drink", itemPrice: 8, itemName: "Mango Smoothie", itemSrc: 'https://www.ambitiouskitchen.com/wp-content/uploads/2019/08/Mango-Pineapple-Coconut-Smoothie-4-725x725.jpg' },
        { itemCategory: "dessert", itemPrice: 8, itemName: "Chocolate Brownie", itemSrc: 'https://cookingwithbry.com/wp-content/uploads/chocolate-brownies-recipe-735x735.png?_t=1712462733' },
        { itemCategory: "dessert", itemPrice: 6, itemName: "Vanilla Ice Cream", itemSrc: 'https://www.allrecipes.com/thmb/8_DOwnDZKWRteuSy-bhGudm0N68=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-8314-Vanilla-Ice-Cream-gw-ddmfs-beauty-4x3-b0f065ec1e7346abb82f4b3d2ad9907b.jpg' },
        { itemCategory: "dessert", itemPrice: 7, itemName: "Apple Pie", itemSrc: 'https://mojo.generalmills.com/api/public/content/RF7rt2cyH0GGi0OySrmZnQ_gmi_hi_res_jpeg.jpeg?v=1b09f892&t=466b54bb264e48b199fc8e83ef1136b4' },
        { itemCategory: "dessert", itemPrice: 9, itemName: "Tiramisu", itemSrc: 'https://handletheheat.com/wp-content/uploads/2023/12/best-tiramisu-recipe-SQUARE.jpg' },
        { itemCategory: "dessert", itemPrice: 10, itemName: "Cheesecake", itemSrc: 'https://easydessertrecipes.com/wp-content/uploads/2022/05/Featured-Chocolate-Caramel-Cheesecake-1.jpg' }
    ];
    

    return (
        <>
        <div className="col-span-12 lg:col-span-9 grid grid-cols-12 gap-y-4 content-between lg:h-[85vh]">
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
                            <button onClick={() => setMenuNav('appetizer')}  className={`${menuNav === 'appetizer' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Appetizers</button>
                            <button onClick={() => setMenuNav('drink')}  className={`${menuNav === 'drink' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Drinks</button>
                            <button onClick={() => setMenuNav('dessert')}  className={`${menuNav === 'dessert' ? 'bg-cyan-400' : 'hover:bg-cyan-300'} font-medium px-4 py-2 rounded-full transition`}>Desserts</button>
                        </div>
                    </div>
                    <div className="relative group lg:w-auto w-full h-full">
                        <i className="absolute inset-y-3 left-3 group-focus:bg-red-500 fa-solid fa-search text-teal-500 font-black"></i>
                        <input className="font-medium group px-4 py-2 focus:outline-cyan-400 rounded-full bg-white/75 w-full pl-10"></input>
                    </div>
                </div>
            </div>
            {/* 3rd Container */}
            <div className="grid grid-cols-12 col-span-12 w-full gap-4 overflow-y-auto max-h-[100vh] lg:h-[50vh] rounded-3xl place-content-start pr-2 custom-scroll">
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
