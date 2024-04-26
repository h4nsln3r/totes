

import Content from '../../components/Content/Content';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header';
import Menu from '../../components/Menu/Menu';
import './start.scss';

const StartPage = () => {


    return (
        <div className="app">
            <Header />
            <Menu />
            <Content />
            <Footer />
        </div>
    );
}

export default StartPage;