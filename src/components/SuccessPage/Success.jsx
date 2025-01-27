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
          <div className="order-brief">
            <h2>Sipariş Özeti</h2>
            <div><strong>Pizza Türü: </strong>{pizzaType}</div>
            <div><strong>Ad-Soyad: </strong>{name}</div>
            <div><strong>Boyut: </strong>{size}</div>
            <div><strong>Hamur: </strong>{dough}</div>
            <div><strong>Ek Malzemeler: </strong>{decodedIngredients.join(", ")}</div>
            <div><strong>Sipariş Notu: </strong>{note}</div>
            <div className="total-brief">
              <div><strong>Malzeme Fiyatı: </strong>{totalIngredientsPrice}₺</div>
              <div><strong>Toplam Fiyat: </strong>{totalPrice}₺</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Success;
