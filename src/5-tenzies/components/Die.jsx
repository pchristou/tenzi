export default function Die({ id, isHeld, value, clickCallback }) {
    const styles = {
        backgroundColor: isHeld ? '#59E391' : 'white'
    }

    return (
        <div className='die'>
            <button
                aria-pressed={isHeld}
                aria-label={`Die with value ${value}, ${isHeld ? "held" : "not held"}`}
                onClick={() => clickCallback(id)} style={styles}
                className='die-button'
            >
                {value}
            </button>
        </div>
    )
}
