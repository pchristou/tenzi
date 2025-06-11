import { createRoot } from 'react-dom/client'
import './index.css'
import ScratchPad from './0-playground/App.jsx';
import StaticApp from './1-static/App.jsx';
import DataDrivenApp from './2-data-driven/App.jsx';
import ChefApp from './3-state/App.jsx';
import SoundPad from './0-playground/components/SoundPad.jsx';
import StarWars from './0-playground/components/StarWars.jsx';
import WindowTracker from './0-playground/components/WindowTrackerApp.jsx';
import MemeGeneratorApp from './4-side-effects/App.jsx';
import Tenzies from './5-tenzies/App.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
    <>
        {/*<StaticApp />*/}
        {/*<DataDrivenApp />*/}
        {/*<ChefApp />*/}
        {/*{<SoundPad darkMode={true} />}*/}
        {/*<MemeGeneratorApp />*/}
        {/*<WindowTracker />*/}
        {/*<StarWars />*/}
        {<Tenzies />}
    </>
)
