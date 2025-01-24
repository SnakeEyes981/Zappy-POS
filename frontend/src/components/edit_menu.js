import { useEffect, useState } from "react";
import api from "../api/axiosConfig";

export default function CustomizeMenu(params) {
    const [isOverlay, setIsOverlay] = useState(false);
    const [modifyItem, setModifyItem] = useState({ itemId: '', itemName: '', itemCategory: '', itemPrice: '', itemSrc: '' });
    const [addingNewItem, setAddingNewItem] = useState(true);
    const [menuItems, setMenuItems] = useState([]);

    const validateInput = () => {
        const errors = {};

        if (!modifyItem.itemName.trim()) {
            errors.itemName = "Name is required.";
        }
        if (!modifyItem.itemCategory) {
            errors.category = "Category is required.";
        }
        if (!modifyItem.itemPrice || isNaN(modifyItem.itemPrice) || modifyItem.itemPrice < 1 || modifyItem.itemPrice > 999) {
            errors.age = "Enter a valid price (1-999).";
        }


        const duplicateItem = menuItems.find(item =>
            item.itemName.toLowerCase() === modifyItem.itemName.toLowerCase() &&
            item._id !== modifyItem.itemId
        );

        if (duplicateItem) {
            errors.itemName = "An item with this name already exists.";
        }

        if (Object.keys(errors).length > 0) {
            const errorMessages = Object.entries(errors)
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n');
            alert(`Validation Errors:\n${errorMessages}`);
            return false;
        }
    
        return true;
    };

    function handleModifyClick(item) {
        if (item && item._id) {
            setModifyItem({ itemId: item._id, itemName: item.itemName, itemCategory: item.itemCategory, itemPrice: item.itemPrice, itemSrc: item.itemSrc });
            setAddingNewItem(false);
        } else {
            setModifyItem({ itemId: "", itemName: "", itemCategory: "", itemPrice: "", itemSrc: "" });
            setAddingNewItem(true);
        }
        setIsOverlay(true);
    }

    async function fetchMenuItems() {
        try {
            const response = await api.get('/menu');
            setMenuItems(response.data);
        } catch (error) {
            console.error('Error fetching menu items:', error.response?.data || error.message);
        }
    }

    useEffect(() => {
        fetchMenuItems();
    }, []);

    useEffect(() => {
        if (isOverlay) {
            document.getElementById('inputForItemName')?.focus();
        }
    }, [isOverlay]);

    async function saveItem() {
        if (!validateInput()) {
            return;
        }

        const newItem = { itemName: modifyItem.itemName, itemCategory: modifyItem.itemCategory, itemPrice: modifyItem.itemPrice, itemSrc: modifyItem.itemSrc };

        try {
            if (newItem.itemSrc === '') {
                newItem.itemSrc = "https://theme-assets.getbento.com/sensei/4f4ca77.sensei/assets/images/catering-item-placeholder-704x520.png";
            }
            await api.post('/menu', newItem);
            alert("Successfully added a new item.");
            fetchMenuItems();
            setIsOverlay(false);
        } catch (error) {
            console.error('Error adding menu item:', error.response?.data || error.message);
        }
    }

    async function updateItem() {
        if (!validateInput()) {
            return;
        }

        const itemId = modifyItem.itemId;
        const updatedItem = { itemName: modifyItem.itemName, itemCategory: modifyItem.itemCategory, itemPrice: modifyItem.itemPrice, itemSrc: modifyItem.itemSrc };
        if (updatedItem.itemSrc === '') {
            updatedItem.itemSrc = "https://theme-assets.getbento.com/sensei/4f4ca77.sensei/assets/images/catering-item-placeholder-704x520.png";
        }
        try {
            await api.patch(`/menu/${itemId}`, updatedItem); // Make PATCH request
            fetchMenuItems();
            setIsOverlay(false);
        } catch (error) {
            console.error('Error updating menu item:', error.response?.data || error.message);
        }
    }

    async function deleteMenuItem() {
        try {
            await api.delete(`/menu/${modifyItem.itemId}`); // Make DELETE request
            fetchMenuItems();
            setIsOverlay(false);
        } catch (error) {
            console.error('Error deleting menu item:', error.response?.data || error.message);
        }
    }

    return (
        <div className="relative w-full h-screen md:h-[84vh] rounded-xl sm:space-y-2 bg-stone-950 text-white sm:p-4 p-0 overflow-hidden">
            <h5 className="text-3xl font-bold text-center">Customize Menu</h5>
            <div className={`${isOverlay ? 'blur-md' : ''} grid grid-cols-12 gap-2 sm:gap-3 h-[92vh] sm:h-[89vh] md:h-[74vh] overflow-auto place-content-start px-2 sm:px-2 transition`}>
                <div className="relative col-span-12 sm:col-span-6 lg:col-span-4 bg-amber-400 p-1 rounded-xl">
                    <div className="flex justify-center items-center h-32">
                        <h5 className="text-stone-950 text-xl font-bold">Add New Item</h5>
                    </div>
                    <div className="absolute -right-1.5 -bottom-1.5">
                        <button onClick={() => {handleModifyClick(modifyItem); setAddingNewItem(true)}} className="w-12 h-12 rounded-full bg-white border-4 border-stone-950 text-black hover:border-white transition"><i className="fa-solid fa-plus text-lg"></i></button>
                    </div>
                </div>
                {menuItems.map((items) => (
                    <div key={items._id} className="relative col-span-12 sm:col-span-6 lg:col-span-4 bg-amber-400 p-1 rounded-xl">
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
                            <button onClick={() => {handleModifyClick(items); setAddingNewItem(false)}} className="w-12 h-12 rounded-full bg-white border-4 border-stone-950 text-black hover:border-white transition"><i className="fa-solid fa-pen text-lg"></i></button>
                        </div>
                    </div>
                ))}
            </div>

            <div className={`${isOverlay ? '' : 'hidden'} transition absolute inset-y-24 inset-x-2 sm:inset-20 md:inset-12 lg:inset-14 rounded-xl bg-black text-white p-2`} aria-live="assertive">
                <button onClick={() => {setIsOverlay(false); setModifyItem({itemName: '', itemCategory: '', itemPrice: '', itemSrc: ''})}} className="close inline-flex justify-end w-full">
                    <i className="fa-regular fa-circle-xmark text-white text-2xl"></i>
                </button>
                <div className="flex flex-col justify-between h-[80%]">
                    <h5 className="font-bold text-2xl sm:text-3xl text-center">{addingNewItem ? "Add New Item" : "Modify Item"}</h5>
                    <div className="grid grid-cols-12 place-items-center p-2 sm:py-6 lg:py-4">
                        <div className="col-span-12 w-full lg:w-1/2 flex flex-col lg:gap-y-2">
                            <div className="flex flex-col">
                                <label className="font-bold pb-0.5" htmlFor="ItemName">Item Name</label>
                                <input className="bg-amber-400 text-black rounded-lg outline-0 px-4 py-1.5 font-bold" type="text" name="name" id="inputForItemName" value={modifyItem.itemName} onChange={(e) => setModifyItem(prevState => ({...prevState, itemName: e.target.value}))}/>
                            </div>
                            <div className="flex flex-col">
                                <label className="font-bold pb-0.5" htmlFor="ItemCategory">Item Category</label>
                                <select className="accent-black bg-amber-400 text-black rounded-lg outline-0 px-4 py-1.5 font-bold" name="category" id="inputForItemCategory" value={modifyItem.itemCategory} onChange={(e) => setModifyItem(prevState => ({...prevState, itemCategory: e.target.value}))}>
                                    <option value="">Select Category</option>
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
                                <input className="bg-amber-400 text-black rounded-lg outline-0 px-4 py-1.5 font-bold" min='1' max='999' type="number" name="price" id="inputForItemPrice"  value={modifyItem.itemPrice} onChange={(e) => setModifyItem(prevState => ({...prevState, itemPrice: e.target.value}))}/>
                            </div>
                            <div className="flex flex-col">
                                <label className="font-bold pb-0.5" htmlFor="ItemImageLink">Image Link</label>
                                <input className="bg-amber-400 text-black rounded-lg outline-0 px-4 py-1.5 font-bold" type="text" name="imageLink" id="inputForItemSrc"  value={modifyItem.itemSrc} onChange={(e) => setModifyItem(prevState => ({...prevState, itemSrc: e.target.value}))}/>
                            </div>
                            <div className="flex md:flex-row flex-col gap-2 mt-2">
                                <button onClick={addingNewItem ? () => {saveItem()} : () => {updateItem()}} className="w-full text-black inline-flex items-center justify-between px-6 bg-green-500 hover:bg-green-400 py-1 lg:py-2 outline-0 font-medium rounded-lg">{addingNewItem ? "Add Item" : "Save Changes"}<i className="fa-solid fa-save"></i></button>
                                {addingNewItem ? null : (<button onClick={() => {deleteMenuItem()}} className="w-full text-white inline-flex items-center justify-between px-6 bg-red-600 hover:bg-red-500 py-1 lg:py-2 outline-0 font-medium rounded-lg">Delete this Item <i className="fa-solid fa-trash-can"></i></button>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
