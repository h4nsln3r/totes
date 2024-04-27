
import { FaFacebook, FaInstagram, FaSoundcloud, FaYoutube } from 'react-icons/fa';
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
                        <FaSoundcloud className="icon" />
                    </a>
                    <a href='https://www.instagram.com/totesband'
                        target='_blank'
                        className="icon-column">
                        <FaYoutube className="icon" />
                    </a>
                    <a href='https://www.instagram.com/totesband'
                        target='_blank'
                        className="icon-column">
                        <FaInstagram className="icon" />
                    </a>
                    <a href='https://www.instagram.com/totesband'
                        target='_blank'
                        className="icon-column">
                        <FaFacebook className="icon" />
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