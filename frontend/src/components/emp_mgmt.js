export default function EmployeeManagement(params) {
    return (
        <div className="p-2 bg-stone-950 rounded-xl space-y-2 text-white sm:p-4 p-2">
        <h5 className="text-2xl sm:text-3xl font-bold text-center">Manage Employees</h5>
        <div className="grid grid-cols-12 gap-y-2 md:gap-3 overflow-auto h-[92vh] place-content-start md:h-[74vh] custom-scroll">
            <div className="col-span-12 md:col-span-6 lg:col-span-3 bg-purple-600 rounded-xl text-white p-2 sm:p-4">
                <h5 className="font-light text-2xl text-start">Hassan Yaseen</h5>
                <p className="font-semibold text-start">Role: Employee</p>
                <p className="font-semibold text-start">Age: 23</p>
                <button className="bg-white text-stone-950 font-semibold transition hover:bg-transparent border border-transparent hover:border-white hover:text-white w-full rounded-lg p-1 mt-2 sm:mt-4">Edit<i className="ml-1 fa-solid text-sm fa-pen"></i></button>
            </div>
        </div>
        </div>
    );
};
