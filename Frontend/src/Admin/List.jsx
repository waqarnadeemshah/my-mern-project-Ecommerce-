import React from "react";
import SlideBar from "../Components/SlideBar";


import AdminProductlist from "./AdminProductlist";



function List() {
  return (
    <div>
      <div className="flex">
    <SlideBar/>
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold">Dashboard Content</h1>
       <AdminProductlist/>
        </div>
      </div>
    </div>
  );
}

export default List;
