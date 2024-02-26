import ReactDOM from 'react-dom/client';
import App from './app/App';
import './app/styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { Toaster } from 'sonner';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <StoreProvider>
            <App />
            <Toaster richColors expand={true} />
        </StoreProvider>
    </BrowserRouter>,
);
