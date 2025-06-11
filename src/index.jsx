import { createRoot } from 'react-dom/client'
import './index.css'
import {JSX } from 'react';
import Tenzies from './5-tenzies/App.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
    <>
        {<Tenzies />}
    </>
)
