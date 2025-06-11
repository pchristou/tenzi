import Header from './components/Header.jsx';
import Main from './components/Main.jsx';

export default function App() {
    return (
        <div className='tenzies'>
            <main className='tenzies-container'>
                <div className='tenzies-wrapper'>
                    <Header />
                    <Main />
                </div>
            </main>
        </div>
    )
}
