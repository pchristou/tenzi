import Header from './components/Header.jsx';
import Die from './components/Die.jsx';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'

export default function App() {

    const [diceValues, setDiceValues] = useState(generateAllNewDice())

    useEffect(() => {

        const sample = diceValues[0];
        const allEqual = (diceValues.every((item) =>
            item.value === sample.value && item.isHeld === true
        ));

        if(allEqual) {
            alert('you win');
        }
    }, [diceValues]);

    function generateAllNewDice() {
        return Array.from({ length: 10 }, () => (
            {
                id: nanoid(),
                isHeld: false,
                value: Math.floor(Math.random() * 6) + 1
            }
        ));
    }

    function handleRoll() {
        // only those that are isHeld false to re-roll
        setDiceValues(prevValues => {
            return prevValues.map(prevValue =>
                !prevValue.isHeld
                    ? { ...prevValue, value: Math.floor(Math.random() * 6) + 1 }
                    : prevValue
            );
        });
    }

    function holdDieNumber(id) {
        setDiceValues(prevValue => {
            return prevValue.map(diceValue => diceValue.id === id
            ? {...diceValue, isHeld: !diceValue.isHeld }
            : diceValue
        ) });
    }

    const dice = diceValues.map(diceValue =>
        <Die clickCallback={holdDieNumber} key={diceValue.id} {...diceValue} />
    )

    return (
        <div className='tenzies'>
            <main className='tenzies-container'>
                <div className='tenzies-grid'>

                    <h1 className="tenzies-title">Tenzies</h1>
                    <p className="tenzies-instructions">Roll until all dice are the same. Click each die to freeze it at its current value
                        between rolls.</p>
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
