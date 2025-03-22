import { Outlet } from "react-router-dom"
import { cn } from "@/lib/utils";
import React from "react";
import Navbar from "./Navbar";


const Layout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    )
}

export default Layout