import { useState } from "react";

export default function CustomizeMenu(params) {

    const [isOverlay, setIsOverlay] = useState(false)
    const [modifyItem, setModifyItem] = useState({ itemName: '', itemCategory: '', itemPrice: '', itemSrc: '' })

    function handleModifyClick(item) {
        setModifyItem({
            itemName: item.itemName,
            itemCategory: item.itemCategory,
            itemPrice: item.itemPrice,
            itemSrc: item.itemSrc
        })
        setIsOverlay(true);
    }

    const itemsObjectFromDb = [
        {itemId: 'p1', itemCategory: "pizza", itemPrice: 18, itemName: "Margarita Pizza", itemSrc: 'https://cdn.shopify.com/s/files/1/0274/9503/9079/files/20220211142754-margherita-9920_5a73220e-4a1a-4d33-b38f-26e98e3cd986.jpg?v=1723650067' },
        {itemId: 'p2', itemCategory: "pizza", itemPrice: 25, itemName: "Pepperoni Delight", itemSrc: 'https://i0.wp.com/www.amysrecipebook.com/wp-content/uploads/2021/01/pepperonipizza-8-web.jpg?resize=1024%2C683&ssl=1' },
        {itemId: 'p3', itemCategory: "pizza", itemPrice: 22, itemName: "BBQ Chicken Pizza", itemSrc: 'https://mediavine-res.cloudinary.com/image/upload/s--_Kf5SiB---/c_limit,f_auto,fl_lossy,h_1080,q_auto,w_1920/v1685738865/xd52eg0tkuw1avg01bpo.jpg' },
        {itemId: 'p4', itemCategory: "pizza", itemPrice: 20, itemName: "Veggie Supreme Pizza", itemSrc: 'https://www.twopeasandtheirpod.com/wp-content/uploads/2021/03/Veggie-Pizza-8.jpg' },
        {itemId: 'p5', itemCategory: "pizza", itemPrice: 23, itemName: "Hawaiian Paradise Pizza", itemSrc: 'https://www.thespruceeats.com/thmb/9KzBgyBZ1LHG8DKLkZ8psYXbm8Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/hawaiian-pizza-4691857-hero-01-1a8f6764c70e4113bbf31bd1a73aca2e.jpg' },
        {itemId: 'w1', itemCategory: "wraps", itemPrice: 15, itemName: "Chicken Caesar Wrap", itemSrc: 'https://rachaelsgoodeats.com/wp-content/uploads/2022/06/240108_chicken-caesar-wrap-13.jpg' },
        {itemId: 'w2', itemCategory: "wraps", itemPrice: 17, itemName: "Falafel Veggie Wrap", itemSrc: 'https://www.hauteandhealthyliving.com/wp-content/uploads/2022/01/Falafel-Wrap-with-hummus-8.jpg' },
        {itemId: 'w3', itemCategory: "wraps", itemPrice: 18, itemName: "Grilled Steak Wrap", itemSrc: 'https://emilybites.com/wp-content/uploads/2016/03/Black-and-Blue-Steak-Wraps-6b.jpg' },
        {itemId: 'w4', itemCategory: "wraps", itemPrice: 16, itemName: "Spicy Chicken Wrap", itemSrc: 'https://sailorbailey.com/wp-content/uploads/2023/04/Cajun-Chicken-Wrap.jpg' },
        {itemId: 'w5', itemCategory: "wraps", itemPrice: 14, itemName: "Buffalo Chicken Wrap", itemSrc: 'https://www.allrecipes.com/thmb/5BWYRjbPBQu7p7J0YInrHkGnVJU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-188473-Buffalo-Chicken-Wraps-ddmfs-gw-beauty-4x3-adec66cb0d4e46b48ac4f07ee648fec7.jpg' },
        {itemId: 'b1', itemCategory: "burger", itemPrice: 25, itemName: "Classic Cheeseburger", itemSrc: 'https://rhubarbandcod.com/wp-content/uploads/2022/06/The-Classic-Cheeseburger-1.jpg' },
        {itemId: 'b2', itemCategory: "burger", itemPrice: 30, itemName: "BBQ Bacon Burger", itemSrc: 'https://s3.amazonaws.com/com.commerceowl.prod/16x9/L/21f61bc3-720d-430a-9261-c485de73fa08.jpeg' },
        {itemId: 'b3', itemCategory: "burger", itemPrice: 22, itemName: "Mushroom Swiss Burger", itemSrc: 'https://embed.widencdn.net/img/beef/s3ccow03qm/1120x840px/Mushroom-Swiss-Burger-with-Jalapeno-Aioli_FY22_3.tif?keep=c&u=7fueml' },
        {itemId: 'b4', itemCategory: "burger", itemPrice: 28, itemName: "Double Beef Burger", itemSrc: 'https://www.usa-beef.org/wp-content/uploads/2021/01/shutterstock_1690605409-scaled.jpg' },
        {itemId: 'b5', itemCategory: "burger", itemPrice: 24, itemName: "Spicy Jalapeño Burger", itemSrc: 'https://wickedkitchen.com/wp-content/uploads/2022/05/Wicked-jalapeno-burger.jpeg' },
        {itemId: 'a1', itemCategory: "appetizer", itemPrice: 12, itemName: "Mozzarella Sticks", itemSrc: 'https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/30/97/7/7GmgWw4TTUCCw7xGKQAP_0S9A6434.jpg' },
        {itemId: 'a2', itemCategory: "appetizer", itemPrice: 10, itemName: "Garlic Bread", itemSrc: 'https://www.allrecipes.com/thmb/ymrjQ3GFq_Fc7Fu2yfvIj108tcM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21080-great-garlic-bread-DDMFS-4x3-e1c7b5c79fde4d629a9b7bce6c0702ed.jpg' },
        {itemId: 'a3', itemCategory: "appetizer", itemPrice: 14, itemName: "Stuffed Jalapeños", itemSrc: 'https://keviniscooking.com/wp-content/uploads/2021/06/Baked-Jalapeno-Poppers-square.jpg' },
        {itemId: 'a4', itemCategory: "appetizer", itemPrice: 11, itemName: "Chicken Wings", itemSrc: 'https://www.tasteofhome.com/wp-content/uploads/2018/01/Five-Spice-Chicken-Wings_EXPS_TOHFM25_92962_DR_02_07_3b.jpg' },
        {itemId: 'a5', itemCategory: "appetizer", itemPrice: 13, itemName: "Onion Rings", itemSrc: 'https://kristineskitchenblog.com/wp-content/uploads/2022/03/crispy-air-fryer-onion-rings-recipe-0775.jpg' },
        {itemId: 'drk1', itemCategory: "drink", itemPrice: 5, itemName: "Fresh Lemonade", itemSrc: 'https://www.simplyrecipes.com/thmb/4LFrc9hSMoKErr2WI7tThcnvWwA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Perfect-Lemonade-LEAD-08-B-441ceb568f854bb485dbed79e082bb4a.jpg' },
        {itemId: 'drk2', itemCategory: "drink", itemPrice: 6, itemName: "Iced Tea", itemSrc: 'https://www.thespruceeats.com/thmb/jk3sZ3Jtq2WPnd31DrB-FR1qfs0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/summer-peach-tea-cocktail-recipe-761506-hero-01-f949acc1ed22404da03ce72648412bcf.jpg' },
        {itemId: 'drk3', itemCategory: "drink", itemPrice: 4, itemName: "Coca-Cola", itemSrc: 'https://www.shutterstock.com/image-photo/poznan-pol-aug-13-2019-600nw-2458808941.jpg' },
        {itemId: 'drk4', itemCategory: "drink", itemPrice: 7, itemName: "Sparkling Water", itemSrc: 'https://blog.myfitnesspal.com/wp-content/uploads/2018/07/Is-Flavored-Sparkling-Water-Killing-Your-Weight-Loss-Goals_-1.jpg' },
        {itemId: 'drk5', itemCategory: "drink", itemPrice: 8, itemName: "Mango Smoothie", itemSrc: 'https://www.ambitiouskitchen.com/wp-content/uploads/2019/08/Mango-Pineapple-Coconut-Smoothie-4-725x725.jpg' },
        {itemId: 'dsrt1', itemCategory: "dessert", itemPrice: 8, itemName: "Chocolate Brownie", itemSrc: 'https://cookingwithbry.com/wp-content/uploads/chocolate-brownies-recipe-735x735.png?_t=1712462733' },
        {itemId: 'dsrt2', itemCategory: "dessert", itemPrice: 6, itemName: "Vanilla Ice Cream", itemSrc: 'https://www.allrecipes.com/thmb/8_DOwnDZKWRteuSy-bhGudm0N68=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-8314-Vanilla-Ice-Cream-gw-ddmfs-beauty-4x3-b0f065ec1e7346abb82f4b3d2ad9907b.jpg' },
        {itemId: 'dsrt3', itemCategory: "dessert", itemPrice: 7, itemName: "Apple Pie", itemSrc: 'https://mojo.generalmills.com/api/public/content/RF7rt2cyH0GGi0OySrmZnQ_gmi_hi_res_jpeg.jpeg?v=1b09f892&t=466b54bb264e48b199fc8e83ef1136b4' },
        {itemId: 'dsrt4', itemCategory: "dessert", itemPrice: 9, itemName: "Tiramisu", itemSrc: 'https://handletheheat.com/wp-content/uploads/2023/12/best-tiramisu-recipe-SQUARE.jpg' },
        {itemId: 'dsrt5', itemCategory: "dessert", itemPrice: 10, itemName: "Cheesecake", itemSrc: 'https://easydessertrecipes.com/wp-content/uploads/2022/05/Featured-Chocolate-Caramel-Cheesecake-1.jpg' }
    ];
    return (
        <div className="relative w-full h-screen md:h-[84vh] rounded-xl sm:space-y-2 bg-stone-950 text-white sm:p-4 p-0 overflow-hidden">
            <h5 className="text-3xl font-bold text-center">Customize Menu</h5>
            <div className={`${isOverlay ? 'blur-md' : ''} grid grid-cols-12 gap-2 sm:gap-3 h-[92vh] sm:h-[89vh] md:h-[74vh] overflow-auto place-content-start px-2 sm:px-2 transition`}>
                {itemsObjectFromDb.map((items) => (
                    <div key={items.itemId} className="relative col-span-12 sm:col-span-6 lg:col-span-4 bg-amber-400 p-1 rounded-xl">
                        <div className="flex sm:flex-row flex-col lg:justify-start justify-between">
                            <div className="h-28 sm:h-32 sm:basis-[70%] md:basis-[40%] lg:basis-[70%] item-image rounded-xl overflow-hidden">
                                <img className="object-cover h-full w-full object-center"  src={items.itemSrc} alt={items.itemName} />
                            </div>
                            <div className="item-info flex flex-col basis-[100%] justify-between sm:px-3 sm:py-1.5 px-2 pt-2 pb-0">
                                <div className="">
                                    <div className="flex justify-between">
                                        <h5 className="category md:text-base text-sm font-medium text-stone-700 capitalize">{items.itemCategory}</h5>
                                        <p className="price md:text-base text-sm font-bold text-stone-800">{"$" + items.itemPrice}</p>
                                    </div>
                                    <div className="">
                                        <h5 className="name text-stone-900 text-base sm:text-sm md:text-base font-bold h-16 md:font-extrabold capitalize">{items.itemName}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -right-1.5 -bottom-1.5">
                            <button onClick={() => handleModifyClick(items)} className="w-12 h-12 rounded-full bg-white border-4 border-stone-950 text-black hover:border-white transition"><i className="fa-solid fa-pen text-lg"></i></button>
                        </div>
                    </div>
                ))}
            </div>

            <div className={`${isOverlay ? '' : 'hidden'} transition absolute inset-y-24 inset-x-2 sm:inset-20 md:inset-12 lg:inset-14 rounded-xl bg-black text-white p-2`}>
                <button onClick={() => {setIsOverlay(false)}} className="close inline-flex justify-end w-full">
                    <i className="fa-regular fa-circle-xmark text-white text-2xl"></i>
                </button>
                <div className="flex flex-col justify-between h-[80%]">
                    <h5 className="font-bold text-2xl sm:text-3xl text-center">Modify Items</h5>
                    <div className="grid grid-cols-12 place-items-center p-2 sm:py-6 lg:py-4">
                        <div className="col-span-12 w-full lg:w-1/2 flex flex-col lg:gap-y-2">
                            <div className="flex flex-col">
                                <label className="font-bold pb-0.5" htmlFor="ItemName">Item Name</label>
                                <input className="bg-amber-400 text-black rounded-lg outline-0 px-4 py-1.5 font-bold" type="text" name="name" id="itemName" value={modifyItem.itemName} onChange={(e) => setModifyItem(prevState => ({...prevState, itemName: e.target.value}))}/>
                            </div>
                            <div className="flex flex-col">
                                <label className="font-bold pb-0.5" htmlFor="ItemCategory">Item Category</label>
                                <select className="accent-black bg-amber-400 text-black rounded-lg outline-0 px-4 py-1.5 font-bold" name="category" id="itemCategory" value={modifyItem.itemCategory} onChange={(e) => setModifyItem(prevState => ({...prevState, itemCategory: e.target.value}))}>
                                    <option value="pizza">Pizza</option>
                                    <option value="wraps">Wraps</option>
                                    <option value="burger">Burgers</option>
                                    <option value="sandwich">Sandwiches</option>
                                    <option value="appetizer">Appetizers</option>
                                    <option value="drink">Drinks</option>
                                    <option value="dessert">Desserts</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="font-bold pb-0.5" htmlFor="ItemPrice">Item Price <span className="text-sm font-light">[$1 - $999]</span></label>
                                <input className="bg-amber-400 text-black rounded-lg outline-0 px-4 py-1.5 font-bold" type="number" name="price" id="itemPrice"  value={modifyItem.itemPrice} onChange={(e) => setModifyItem(prevState => ({...prevState, itemPrice: e.target.value}))}/>
                            </div>
                            <div className="flex flex-col">
                                <label className="font-bold pb-0.5" htmlFor="ItemImageLink">Image Link</label>
                                <input className="bg-amber-400 text-black rounded-lg outline-0 px-4 py-1.5 font-bold" type="text" name="imageLink" id="itemSrc"  value={modifyItem.itemSrc} onChange={(e) => setModifyItem(prevState => ({...prevState, itemSrc: e.target.value}))}/>
                            </div>
                            <div className="flex md:flex-row flex-col gap-2 mt-2">
                                <button className="w-full text-black inline-flex items-center justify-between px-6 bg-green-500 hover:bg-green-400 py-1 lg:py-2 outline-0 font-medium rounded-lg">Save Changes<i className="fa-solid fa-save"></i></button>
                                <button className="w-full text-white inline-flex items-center justify-between px-6 bg-red-600 hover:bg-red-500 py-1 lg:py-2 outline-0 font-medium rounded-lg">Delete this Item <i className="fa-solid fa-trash-can"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
