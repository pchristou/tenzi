export default function Die({ id, isHeld, value, clickCallback }) {
    const styles = {
        backgroundColor: isHeld ? '#59E391' : 'white'
    }

    const dots = Array.from({ length: 9 }, () => <span className='dot'>&nbsp;</span>)

    return (
        <div className='die'>
            <button
                aria-pressed={isHeld}
                aria-label={`Die with value ${value}, ${isHeld ? "held" : "not held"}`}
                onClick={() => clickCallback(id)} style={styles}
                className={`dice-face face-${value}`}
            >
                {dots}
            </button>
        </div>
    )
}
