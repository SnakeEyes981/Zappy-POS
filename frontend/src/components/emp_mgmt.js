import { useEffect, useState } from "react";
import api from '../api/axiosConfig';

function EmployeeManagement() {
    const [isOverlay, setIsOverlay] = useState(false)
    const [modifyUser, setModifyUser] = useState({ userId: '', userName: '', role: '', age: '', password: '' })
    const [ userData, setUserData ] = useState([]);
    const [ validationErrors, setValidationErrors ] = useState({});
    
    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            setUserData(response.data)
        } catch (error) {
            console.error('Error fetching users:', error.response?.data || error.message);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    const validateInput = () => {
        const errors = {};
    
        if (!modifyUser.userName.trim()) {
          errors.userName = "Name is required.";
        }
        if (!modifyUser.role) {
          errors.role = "Role is required.";
        }
        if (!modifyUser.age || isNaN(modifyUser.age) || modifyUser.age < 18 || modifyUser.age > 120) {
          errors.age = "Enter a valid age (18-120).";
        }
        if (!modifyUser.password.trim() || modifyUser.password.length < 6) {
          errors.password = "Password must be at least 6 characters long.";
        }
    
        setValidationErrors(errors);
        return Object.keys(errors).length === 0; // Return true if no errors
      };



    async function saveUser() {
        if(!validateInput()){
            alert(validationErrors);
            return
        }
    
        const newUser = {
            userName: modifyUser.userName,
            role: modifyUser.role,
            age: parseInt(modifyUser.age, 10),
            password: modifyUser.password,
        };
    
        try {
            await api.post('/register', newUser); // POST request to add a new user
            fetchUsers(); // Refresh the user list
            closeOverlay(); // Reset and close overlay
        } catch (err) {
            console.error('Error saving user:', err.response?.data || err.message);
        }
    }

    async function updateUser(userId) {
        const updatedUser = {
            userName: modifyUser.userName,
            role: modifyUser.role,
            age: parseInt(modifyUser.age, 10),
            password: modifyUser.password,
        };
        console.log(modifyUser.userId + userId)
        try {
            await api.put(`/users/${userId}`, updatedUser); // PUT request to update the user
            fetchUsers(); // Refresh the user list
            closeOverlay();
        } catch (err) {
            console.error('Error updating user:', err.response?.data || err.message);
        }
    }

    async function deleteUser(userId) {
        try {
            const response = await api.delete(`/users/${userId}`); // Make DELETE request
            console.log(response.data.message); // Success message
            fetchUsers(); // Refresh the user list
            closeOverlay();
        } catch (error) {
            console.error('Error deleting user:', error.response?.data || error.message);
        }
    }

    function isUpdatingOrRegistering () {
        return (modifyUser.userId !== '')
    }

    function openOverlay(user) {
        if (user) {
            setModifyUser({ userId: user._id, userName: user.userName, role: user.role, age: user.age, password: ''});
        } else {
            setModifyUser({ userId: '', userName: '', role: '', age: '', password: ''});
        }
        setIsOverlay(true);
    }

    function closeOverlay() {
        setModifyUser({ userId: '', userName: '', role: '', age: '', password: '' });
        setIsOverlay(false)
    }
    
    return (
        <div className="relative bg-stone-950 rounded-xl space-y-2 text-white sm:p-4 p-2">
            <h5 className="text-2xl sm:text-3xl font-bold text-center">Manage Employees</h5>
            <div className={`${isOverlay ? 'blur-md' : ''} transition grid grid-cols-12 gap-y-2 md:gap-3 overflow-auto h-[92vh] place-content-start md:h-[74vh] custom-scroll`}>
                {
                    userData.length > 0 ? (
                        userData.map((user) => (
                            <div key={user._id} className="col-span-12 md:col-span-6 lg:col-span-3 flex h-full justify-between flex-col bg-purple-600 rounded-xl text-white p-2 sm:p-4">
                                <h5 className="font-light text-2xl text-start capitalize">{user.userName}</h5>
                                <p className="font-semibold text-start capitalize">{'Role: '+user.role}</p>
                                <p className="font-semibold text-start">{'Age: '+user.age}</p>
                                <button onClick={() => openOverlay(user)} className="bg-white text-stone-950 font-semibold transition hover:bg-transparent border border-transparent hover:border-white hover:text-white w-full rounded-lg p-1 mt-2 sm:mt-4">Edit<i className="ml-1 fa-solid text-sm fa-pen"></i></button>
                            </div>
                        ))
                    ) : (null)
                }
                <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-purple-600 flex flex-col justify-between items-center rounded-xl text-white p-2 sm:p-4 gap-y-4">
                    <div className="h-full inline-flex items-center">
                        <button onClick={() => openOverlay()} className="border-4 sm:border-8 border-white rounded-full h-12 w-12 sm:h-16 sm:w-16 hover:border-stone-950 hover:text-black transition"><i className="fa-solid fa-plus text-2xl sm:text-3xl"></i></button>
                    </div>
                    <h5>Add New Employee</h5>
                </div>
            </div>

            {/* Overlay */}
            <div className={`${isOverlay ? '' : 'hidden'} transition absolute inset-y-24 inset-x-2 sm:inset-20 md:inset-12 lg:inset-14 rounded-xl bg-black text-white p-2`}>
                <button onClick={() => closeOverlay()} className="close inline-flex justify-end w-full">
                    <i className="fa-regular fa-circle-xmark text-amber-300 text-2xl"></i>
                </button>
                <div className="flex flex-col h-full justify-center">
                    <h5 className="font-bold sm:text-3xl md:text-2xl lg:text-3xl text-center">{isUpdatingOrRegistering() ? "Modify Details" : "Add New User"}</h5>
                    <div className="grid grid-cols-12 place-items-center p-2 sm:py-6 lg:py-4">
                        <div className="col-span-12 w-full sm:w-[70%] md:w-1/3 flex flex-col lg:gap-y-2">
                            <div className="flex flex-col">
                                <label className="font-bold" htmlFor="">Name</label>
                                <input className="text-black bg-amber-400 rounded-lg outline-0 px-2 py-1 font-bold" type="text" name="name" id="name" value={modifyUser.userName} onChange={(e) => setModifyUser(prevState => ({...prevState, userName: e.target.value}))}/>
                            </div>
                            <div className="flex flex-col">
                                <label className="font-bold" htmlFor="">Age</label>
                                <input className="text-black bg-amber-400 rounded-lg outline-0 px-2 py-1 font-bold" type="number" name="age" id="age" value={modifyUser.age} onChange={(e) => setModifyUser(prevState => ({...prevState, age: e.target.value}))}/>
                            </div>
                            <div className="flex flex-col">
                                <label className="font-bold" htmlFor="">Role</label>
                                <select className="accent-black text-black bg-amber-400 rounded-lg outline-0 py-1 font-bold" name="role" id="role" value={modifyUser.role} onChange={(e) => setModifyUser(prevState => ({...prevState, role: e.target.value}))}>
                                    <option value="">Select Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="cashier">Cashier</option>
                                    <option value="kitchen">Kitchen</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="font-bold" htmlFor="">New Password</label>
                                <input className="text-black bg-amber-400 rounded-lg outline-0 px-2 py-1 font-bold" type="password" name="password" id="pass"  value={modifyUser.password} onChange={(e) => setModifyUser(prevState => ({...prevState, password: e.target.value}))}/>
                            </div>
                            <div className="flex flex-col gap-y-2 mt-2">
                                <button onClick={() => {isUpdatingOrRegistering() ? updateUser(modifyUser.userId) : saveUser()}} className="w-full text-black inline-flex items-center justify-between px-2 lg:px-20 bg-green-500 hover:bg-green-400 py-1 lg:py-2 outline-0 font-medium rounded-lg">Save Changes<i className="fa-solid fa-save"></i></button>
                                <button onClick={() => deleteUser(modifyUser.userId)} className={`${isUpdatingOrRegistering() ? 'visible' : 'invisible'} w-full text-white inline-flex items-center justify-between px-2 lg:px-20 bg-red-600 hover:bg-red-500 py-1 lg:py-2 outline-0 font-medium rounded-lg`}>Delete this User <i className="fa-solid fa-trash-can"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default EmployeeManagement;