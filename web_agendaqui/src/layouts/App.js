import React from "react";
import Header from "../Components/Header";
import { useParams } from 'react-router-dom'


export default function App({ children }) {
    return (
        <div>
            <Header/>
            {children}
        </div>
    )
}