import ReactDOM from 'react-dom/client';
import Routing from './Routing.tsx';
import { BrowserRouter } from 'react-router-dom';
import './i18n';

import './styles/main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routing />
  </BrowserRouter>
);
