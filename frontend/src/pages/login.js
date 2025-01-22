import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('/login', { userName, password }, {
                withCredentials: true,
            });

            const { id, role } = response.data;
            login(id, role);

            // Redirect based on role
            if (role === 'admin') {
                navigate('/control-panel');
            } else if (role === 'cashier') {
                navigate('/home');
            } else if (role === 'kitchen') {
                navigate('/kitchen');
            }
        } catch (err) {
            if (err.response?.status === 401 || err.response?.status === 404) {
                setError('Invalid username or password.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };


    return (

        <>
          <div className="font-nunito bg-gradient-to-tl from-teal-400 to-yellow-200 flex justify-center items-center sm:min-h-screen min-h-dvh sm:p-0 px-8 w-full">
              <form onSubmit={handleSubmit} className="bg-transparent rounded-md flex flex-col justify-center items-center overflow-hidden shadow-md">
                  <div className="imageSection border-b-4 w-full border-stone-900 rounded-2xl sm:py-6 sm:px-12 p-4">
                      <h1 className="text-white uppercase text-center font-black sm:text-3xl text-xl text-nowrap">Zappy POS<span className="text-black"> Terminal</span></h1>
                  </div>
                  <div className="form w-full px-2 sm:px-8 md:py-12 py-8">
                      <div className="input-group">
                          <input placeholder="Username" className="input-field" type="text" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                      </div>
                      <div className="input-group mt-6">
                          <input placeholder="Password" className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                          <p className={`${error === '' ? 'invisible' : 'block'} text-xs mt-6 pl-2`}>{`Error: ${error}`}</p>
                          <button type="submit" className="bg-stone-900 text-white rounded-full py-2 sm:py-3 uppercase font-extrabold hover:bg-black hover:text-white transition duration-300 text-sm sm:text-lg">login</button>
                      </div>
                      <div className="mt-4 flex justify-between px-2 flex-wrap">
                          <button className="hover:underline text-stone-900 text-xs sm:text-sm font-bold hover:text-white transition">Forget Password?</button>
                      </div>
                  </div>
              </form>
          </div>
        </>
      );
};
