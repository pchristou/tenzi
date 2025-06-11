import Header from './components/Header.jsx';
import Die from './components/Die.jsx';
import { useState } from 'react';

export default function App() {

    const [diceNumbers, setDiceNumbers] = useState(generateAllNewDice())

    function generateAllNewDice() {
        return Array.from({ length: 10 }, () => Math.floor(Math.random() * 6) + 1);
    }


    /**
     * Challenge: Create a `Roll Dice` button that will re-roll
     * all 10 dice
     *
     * Clicking the button should generate a new array of numbers
     * and set the `dice` state to that new array (thus re-rendering
     * the array to the page)
     */

    function handleRoll() {
        setDiceNumbers(generateAllNewDice());
    }

    const dice = diceNumbers.map(dieNumber => <Die value={dieNumber} />)

    return (
        <div className='tenzies'>
            <main className='tenzies-container'>
                <div className='tenzies-grid'>
                    {/*<Header />*/}
                    <div className='tenzies-grid-item'>
                        {dice}
                    </div>

                    <div className='tenzies-reroll'>
                        <button onClick={handleRoll}>Roll</button>
                    </div>
                </div>
            </main>
        </div>
    )
}
