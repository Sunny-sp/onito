import React from "react";
import { Route, Routes} from 'react-router-dom';
import UserForm from "./UserForm";
import UserDataTable from "./UserDataTable";
import Header from "./Header";
import './App.css';
function App () {
    return (
        <>
        <Header/>
        <Routes>
            <Route path="/" element={<UserForm/>}/>
            <Route path="/userDetails" element={<UserDataTable/>}/>
        </Routes>
        </>
    )
}
export default App;