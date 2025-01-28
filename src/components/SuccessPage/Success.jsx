import React from 'react';
import './Success.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../FooterPage/Footer';

function Success() {
  const { name, size, dough, ingredients, note, pizzaType, totalIngredientsPrice, totalPrice } = useParams();

  const decodedIngredients = decodeURIComponent(ingredients).split(',');

  console.log("Params:", {
    name,
    size,
    dough,
    decodedIngredients,
    note,
    pizzaType,
    totalIngredientsPrice,
    totalPrice
  });

  return (
    <>
      <div className="succes-section">
        <div className="succes-content">
          <img src="/images/iteration-1-images/logo.svg" alt="Logo" />
          <h4>Lezzetin Yolda</h4>
          <h1>SİPARİŞ ALINDI</h1>
          <hr />
          <div className='general-summary'>
            <div style={{ fontSize: '2rem', fontWeight: 'bolder', color: '#FAF7F2' }}>{pizzaType}</div>
            <div className="order-brief">
              <div>Ad-Soyad: <strong>{name} </strong></div>
              <div>Boyut: <strong>{size} </strong></div>
              <div>Hamur: <strong> {dough}</strong></div>
              <div>Ek Malzemeler: <strong>{decodedIngredients.join(", ")} </strong></div>
              <div>Sipariş Notu: <strong>{note} </strong></div>
              <div className="total-brief">
                <h6>Sipariş Toplamı</h6>
                <div className='choices-total-price'>
                  <span>Seçimler</span>
                  <span>{totalIngredientsPrice}₺</span>
                </div>
                <div className='summary-total-price'>
                  <span>Toplam</span>
                  <span>{totalPrice}₺</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default Success;
