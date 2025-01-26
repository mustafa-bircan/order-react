import React from 'react'
import './HomePage.css'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'


const Button = styled.button`
background-color: #FDC913;
color: #292929;
padding: 1rem 3.5rem;
border-radius: 2rem;
border:none;
font-family:'Roboto Condensed';
font-size: 24px;

&:hover {
background-color: #FAF7F2;
}
`;


function HomePage() {
    const history = useHistory();

    const navigateOrder = () => {
        history.push('/OrderPage'); 
      };

    return (
        <>
            <div className="home-section">
                <div className="home-content">
                    <img src="../images/iteration-1-images/logo.svg" alt="Logo" />
                    <h2 className="home-subtitle">
                        KOD ACIKTIRIR <br /> PİZZA, DOYURUR
                    </h2>
                    <Button onClick={navigateOrder}>ACIKTIM</Button> 
                </div>
            </div>
        </>
    );
}

export default HomePage