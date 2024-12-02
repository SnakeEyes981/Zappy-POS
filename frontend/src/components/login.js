export default function login() {
    return (
        <>
          <div className="bg-gradient-to-tl from-teal-400 to-yellow-200 flex justify-center items-center sm:min-h-screen min-h-dvh sm:p-0 px-8">
              <section className="bg-transparent rounded-md flex flex-col justify-center items-center overflow-hidden shadow-lg">
                  <div className="imageSection bg-stone-900 text-teal-300 rounded-b-2xl sm:py-6 sm:px-12 p-4 uppercase text-center font-black text-3xl">
                      <h1>Zappy POS Terminal</h1>
                  </div>
                  <div className="form w-full px-6 md:py-12 py-8">
                      <div className="input-group">
                          <input placeholder="Username" className="input-field" type="text" />
                      </div>
                      <div className="input-group mt-6">
                          <input placeholder="Password" className="input-field" type="password" />
                          <button className="bg-teal-300 rounded-full py-3 mt-6 uppercase font-black hover:bg-black hover:text-white transition duration-300 text-lg">login</button>
                      </div>
                      <div className="mt-4 flex justify-between px-2 flex-wrap">
                          <a className="hover:underline text-sm font-medium hover:text-white transition" href="#">Forget Password?</a>
                          <a className="hover:underline text-sm font-medium hover:text-white transition" href="#">Register</a>
                      </div>
                  </div>
              </section>
          </div>
        </>
      );
};
