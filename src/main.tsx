import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@/assets/scss/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './stores/store.ts';
import { Toaster } from 'react-hot-toast';
ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            <Toaster />
            <App />
        </Provider>
    </BrowserRouter>
);
