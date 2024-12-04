export default function login() {
    return (
        <>
          <div className="font-nunito bg-gradient-to-tl from-teal-400 to-yellow-200 flex justify-center items-center sm:min-h-screen min-h-dvh sm:p-0 px-8 w-full">
              <section className="bg-transparent rounded-md flex flex-col justify-center items-center overflow-hidden shadow-md">
                  <div className="imageSection border-b-4 w-full border-stone-900 rounded-2xl sm:py-6 sm:px-12 p-4">
                      <h1 className="text-white uppercase text-center font-black sm:text-3xl text-xl text-nowrap">Zappy POS Terminal</h1>
                  </div>
                  <div className="form w-full px-2 sm:px-8 md:py-12 py-8">
                      <div className="input-group">
                          <input placeholder="Username" className="input-field" type="text" />
                      </div>
                      <div className="input-group mt-6">
                          <input placeholder="Password" className="input-field" type="password" />
                          <button className="bg-stone-900 text-white rounded-full py-2 sm:py-3 mt-6 uppercase font-extrabold hover:bg-black hover:text-white transition duration-300 text-sm sm:text-lg">login</button>
                      </div>
                      <div className="mt-4 flex justify-between px-2 flex-wrap">
                          <a className="hover:underline text-stone-900 text-xs sm:text-sm font-bold hover:text-white transition" href="#">Forget Password?</a>
                          <a className="hover:underline text-stone-900 text-xs sm:text-sm font-bold hover:text-white transition" href="#">Register</a>
                      </div>
                  </div>
              </section>
          </div>
        </>
      );
};
