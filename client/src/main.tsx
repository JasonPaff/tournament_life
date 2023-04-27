import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { App } from './App';
import './styles/App.css';

const rootElement: HTMLElement | null = document.getElementById('root');

if (rootElement && !rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);

    root.render(
        <StrictMode>
            <App />
        </StrictMode>
    );
}
