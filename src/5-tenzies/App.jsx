import Die from './components/Die.jsx';
import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {

    const btnRef = useRef(null);
    const [diceValues, setDiceValues] = useState(() => generateAllNewDice());

    /**
     *
     * Hints:
     * 1. Focusing a DOM element with the DOMNode.focus() method
     *    requires accessing the native DOM node. What tool have
     *    we learned about that allows us to do that?
     *
     * 2. Automatically calling the .focus() on a DOM element when
     *    the game is won requires us to synchronize the local
     *    `gameWon` variable with an external system (the DOM). What
     *    tool have we learned about that allows us to do that?
     */

    const sample = diceValues[0];
    const gameWon = (diceValues.every((item) =>
        item.value === sample.value && item.isHeld
    ));

    useEffect(() => {
        if(gameWon) {
            btnRef.current.focus();
        }
    }, [gameWon]);

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
                    <p className="tenzies-instructions">Roll until all dice are the same. Click each die to freeze it at its
                        current value
                        between rolls.</p>
                    <div className='tenzies-grid-item'>
                        {dice}
                    </div>

                    <div className='tenzies-reroll'>
                        <button ref={btnRef}
                                onClick={gameWon ? () => setDiceValues(generateAllNewDice()) : handleRoll}>
                            {gameWon ? 'New game' : 'Roll'}
                        </button>
                    </div>

                    {gameWon && <Confetti/>}
                    <div aria-live="polite" className="sr-only">
                        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
                    </div>
                </div>
            </main>
        </div>
    )
}
