
import { FaInstagram, FaSoundcloud } from 'react-icons/fa';
import './footer.scss';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="column">
                <div className="contact-info">
                    <p>Contact us: your.email@example.com</p>
                </div>
            </div>
            <div className="column middle-column">
                <div className="social-links">
                    <a href='https://www.instagram.com/totesband'
                        target='_blank'
                        className="icon-column">
                        <FaInstagram className="icon" />
                    </a>
                    <a href='https://soundcloud.com/bojengband?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'
                        target='_blank'
                        className="icon-column">
                        <FaSoundcloud className="icon" />
                    </a>
                </div>
            </div>
            <div className="column">
                test
            </div>
      </footer>

    
    );
}

export default Footer;