import React from "react";
import Header from "../Components/Header";
import { useParams } from 'react-router-dom'
import styled from 'styled-components';

const ContainerApp = styled.div`
    padding-top: 50px;

    @media (max-width: 600px) {
        padding-top: 0;
    }
`

export default function App({ children }) {
    return (
        <ContainerApp>
            <Header/>
            {children}
        </ContainerApp>
    )
}