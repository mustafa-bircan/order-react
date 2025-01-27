import React from 'react'
import './Footer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

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
        <div className='footer-icons'>
          <div className="icon-info">
            <img src="/images/iteration-2-images/footer/icons/icon-1.png" alt="Logo" />
            <p>341 Londonderry Road,
              Istanbul Türkiye</p>
          </div>
          <div className="icon-info">
            <img src="/images/iteration-2-images/footer/icons/icon-2.png" alt="Logo" />
            <p>aciktim@teknolojikyemekler.com</p>
          </div>
          <div className="icon-info">
            <img src="/images/iteration-2-images/footer/icons/icon-3.png" alt="Logo" />
            <p>+90 216 123 45 67</p>
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
          {instaImages.map((image, index) => (
            <img key={index} src={image} alt={`Instagram ${index}`} />
          ))}
        </div>
      </div>
      <hr className='hr' />
      <div className='footer-bottom'>
        <div className="bottom-content">
        <p>© 2023 Teknolojik Yemekler. </p>
          <FontAwesomeIcon icon={faTwitter} size="2x" color="white" />
        </div>
      </div>
    </div>
  )
}

export default Footer
