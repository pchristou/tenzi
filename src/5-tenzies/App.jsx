import Die from './components/Die.jsx';
import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {

    const [rollCount, setRollCount] = useState(0);
    const [timer, setTimer] = useState(() => 0);

    const btnRef = useRef(null);
    let interval = useRef(null);

    const [diceValues, setDiceValues] = useState(() => generateAllNewDice());

    const sample = diceValues[0];
    const gameWon = (diceValues.every((item) =>
        item.value === sample.value && item.isHeld
    ));

    const startTimer = () => {
        // Prevent multiple intervals
        if (interval.current !== null) return;

        interval.current = setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000);
    };

    startTimer();

    function stopTimer() {
        clearInterval(interval.current);
        interval.current = null;
    }

    useEffect(() => {
        if(gameWon) {
            btnRef.current.focus();
            clearInterval(interval.current);
        }

        //return () => reset();
    }, [gameWon, interval]);

    function generateAllNewDice() {

        reset();

        return Array.from({ length: 10 }, () => (
            {
                id: nanoid(),
                isHeld: false,
                value: Math.floor(Math.random() * 6) + 1
            }
        ));
    }

    function reset() {
        setRollCount(0);
        setTimer(0);
        stopTimer();
    }

    function handleRoll() {

        setRollCount(prevRollCount => prevRollCount + 1);
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
                    { timer }<br/>
                    { rollCount }
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
