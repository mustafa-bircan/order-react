import React from 'react'
import './Footer.css';

function Footer() {
  const instaImages = [
    "/images/iteration-2-images/footer/insta/li-0.png",
    "/images/iteration-2-images/footer/insta/li-1.png",
    "/images/iteration-2-images/footer/insta/li-2.png",
    "/images/iteration-2-images/footer/insta/li-3.png",
    "/images/iteration-2-images/footer/insta/li-4.png",
    "/images/iteration-2-images/footer/insta/li-5.png",
  ];

  return (
    <div className='footer-overall'>
      <div className="footer-logo-info">
        <img src="/images/iteration-2-images/footer/logo-footer.svg" alt="Logo" />
        <div>
          <div className="icon-info">
            <img src="/images/iteration-2-images/footer/icons/icon-1.png" alt="Logo" />
            <p>Address info here</p>
          </div>
          <div className="icon-info">
            <img src="/images/iteration-2-images/footer/icons/icon-2.png" alt="Logo" />
            <p>Email info here</p>
          </div>
          <div className="icon-info">
            <img src="/images/iteration-2-images/footer/icons/icon-3.png" alt="Logo" />
            <p>Phone info here</p>
          </div>
        </div>
      </div>
      <div className="footer-hot">
        <h3>HOT MENU</h3>
        <ul>
          <li>Terminal Pizza</li>
          <li>5 Kişilik Hackathlon Pizza</li>
          <li>useEffect Tavuklu Pizza</li>
          <li>Beyaz Console Frosty</li>
          <li>Testler Geçti Mutlu Burger</li>
          <li>Position Absolute Acı Burger</li>
        </ul>
      </div>
      <div className="footer-instagram">
        <h3>INSTAGRAM</h3>
          <div className='insta-group'>
            {instaImages.map((image,index) =>(
              <img key={index} src={image} alt={`Instagram ${index}`} />
            ))}
          </div>
      </div>
    </div>
  )
}

export default Footer
