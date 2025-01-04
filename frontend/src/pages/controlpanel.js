import { useState } from "react"
import Navbar from "../components/navbar"
import EmployeeManagement from "../components/emp_mgmt"
import TrackSales from "../components/track_sales"
export default function ControlPanel(params) {
    const [cPanelNav, setCPanelNav] = useState('none')

    return (
        <main className="background-image sm:min-h-screen min-h-dvh w-screen p-2 sm:p-4 font-nunito overflow-auto flex flex-col gap-y-2">
            <div className="navbar bg-transparent">
                <Navbar role = 'admin'/>
            </div>
            <div className="p-2 sm:p-4 grid grid-cols-12 gap-y-4 md:gap-y-0 gap-x-4 bg-gradient-to-tl from-teal-400 to-yellow-200 w-full rounded-xl max-h-min md:max-h-[88vh]">
                <div className="col-span-12 md:col-span-4 lg:col-span-2 space-y-2">
                    <h3 className="font-bold text-3xl md:text-start text-center">Control Panel</h3>
                    <div className="flex flex-col gap-y-3 items-center">
                        <button onClick={() => {setCPanelNav('emp_mgmt')}} className={`${cPanelNav === 'emp_mgmt' ? 'cPanelLinkActive' : 'cPanelLink'}`}>Employees Management</button>
                        <button onClick={() => {setCPanelNav('sales')}} className={`${cPanelNav === 'sales' ? 'cPanelLinkActive' : 'cPanelLink'}`}>Track Sales</button>
                        <button onClick={() => {setCPanelNav('edit_menu')}} className={`${cPanelNav === 'edit_menu' ? 'cPanelLinkActive' : 'cPanelLink'}`}>Customize Menu</button>
                        <button onClick={() => {setCPanelNav('order_analysis')}} className={`${cPanelNav === 'order_analysis' ? 'cPanelLinkActive' : 'cPanelLink'}`}>Orders Analytics</button>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-8 lg:col-span-10 rounded-xl h-full overflow-hidden pr-1">
                        {
                            cPanelNav === 'none' ? '' : (cPanelNav === 'emp_mgmt' ? <EmployeeManagement /> : (cPanelNav === 'sales' ? <TrackSales /> : (cPanelNav === 'edit_menu' ? <EmployeeManagement /> : (cPanelNav === 'order_analysis' ? <EmployeeManagement /> : null))))
                        }
                </div>
            </div>
        </main>
    )
};