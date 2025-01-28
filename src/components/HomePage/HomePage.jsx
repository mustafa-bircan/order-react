import React from 'react'
import './HomePage.css'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'
import Footer from '../FooterPage/Footer';


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


    const frameTypes = [
        { name: 'Margarita', price: `${85.5}₺`, rating: 4.7, reviews: 200 },
        { name: 'Acı Pizza', price: `${75.5}₺`, rating: 4.7, reviews: 180 },
        { name: 'BBQ Feast', price: `${60}₺`, rating: 4.9, reviews: 300 },
    ];


    const history = useHistory();

    const navigateOrder = () => {
        history.push('/OrderPage');
    };

    const homeImages = [
        { src: "/images/iteration-2-images/icons/1.svg", text: "Ramen" },
        { src: "/images/iteration-2-images/icons/2.svg", text: "Pizza" },
        { src: "/images/iteration-2-images/icons/3.svg", text: "Burger" },
        { src: "/images/iteration-2-images/icons/4.svg", text: "French Fries" },
        { src: "/images/iteration-2-images/icons/5.svg", text: "Fast Food" },
        { src: "/images/iteration-2-images/icons/6.svg", text: "Soft Drinks" }
    ];

    const frameImages = [
        { src: "/images/iteration-2-images/pictures/food-1.png" },
        { src: "/images/iteration-2-images/pictures/food-2.png" },
        { src: "/images/iteration-2-images/pictures/food-3.png" },
    ]

    return (
        <>
            <div className="home-section">
                <div className="home-content">
                    <img src="../images/iteration-1-images/logo.svg" alt="Logo" />
                    <h4>Fırsatı Kaçırma</h4>
                    <h2 className="home-subtitle">
                        KOD ACIKTIRIR <br /> PİZZA, DOYURUR
                    </h2>
                    <Button onClick={navigateOrder} data-cy="aciktim-button">ACIKTIM</Button>
                </div>
            </div>

            <div className='header-bottom'>
                {homeImages.map((item, index) => (
                    <div key={index} className='image-item-text'>
                        <img key={index} src={item.src} alt={`homeImages ${index}`} />
                        <p>{item.text}</p>
                    </div>
                ))}
            </div>


            <div className='main-home'>
                <div className='cta-cards'>
                    <div className='card1'>
                        <img src='images/iteration-2-images/cta/kart-1.png' alt="Kart 1" />
                        <h1>Özel <br />Lezzetus</h1>
                        <p>Position:Absolute Acı Burger</p>
                        <button>SİPARİŞ VER</button>
                    </div>
                    <div className='cards'>
                        <div className='card2'>
                            <img src='images/iteration-2-images/cta/kart-2.png' alt="Kart 2" />
                            <h1>Hackathlon <br />Burger Menü</h1>
                            <button>SİPARİŞ VER</button>
                        </div>
                        <div className='card3'>
                            <img src='images/iteration-2-images/cta/kart-3.png' alt="Kart 3" />
                            <h1><span className='card3-title'>Çoooook</span> hızlı <br />npm gibi kurye </h1>
                            <button>SİPARİŞ VER</button>
                        </div>
                    </div>
                </div>


                <div className='packet-info'>
                    <h4>en çok paketlenen menüler</h4>
                    <h1>Acıktıran Kodlara Doyuran Lezzetler</h1>
                </div>
                <div className="button-container">
                    {homeImages.map((item, index) => (
                        <button key={index} className={`image-button ${item.text === "Pizza" ? "other" : ""}`}>
                            <img src={item.src} alt={item.text} />
                            <span>{item.text}</span>
                        </button>
                    ))}
                </div>
                <div className="pizza-list">
                    <div className="pizza-group">
                        {frameTypes.slice(0, 1).map((pizza, index) => (
                            <div key={index} className="pizza-item">
                                <img src={frameImages[index]?.src} alt={pizza.name} />
                                <h3>{pizza.name}</h3>
                                <div className="pizza-info">
                                    <p className='pizza-rating'>{pizza.rating}</p>
                                    <div className='pizza-reviews-p'>
                                        <p className='pizza-reviews'>({pizza.reviews})</p>
                                    </div>
                                    <p className='pizza-price'>{pizza.price} </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pizza-group">
                        {frameTypes.slice(1, 2).map((pizza, index) => (
                            <div key={index} className="pizza-item">
                                <img src={frameImages[index + 1]?.src} alt={pizza.name} />
                                <h3>{pizza.name}</h3>
                                <div className="pizza-info">
                                    <p className='pizza-rating'>{pizza.rating}</p>
                                    <div className='pizza-reviews-p'>
                                        <p className='pizza-reviews'>({pizza.reviews})</p>
                                    </div>
                                    <p className='pizza-price'>{pizza.price} </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pizza-group">
                        {frameTypes.slice(2).map((pizza, index) => (
                            <div key={index} className="pizza-item">
                                <img src={frameImages[index + 2]?.src} alt={pizza.name} />
                                <h3>{pizza.name}</h3>
                                <div className="pizza-info">
                                    <p className='pizza-rating'>{pizza.rating}</p>
                                    <div className='pizza-reviews-p'>
                                        <p className='pizza-reviews'>({pizza.reviews})</p>
                                    </div>
                                    <p className='pizza-price'>{pizza.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <Footer />
        </>
    );
}

export default HomePage