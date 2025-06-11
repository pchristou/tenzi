export default function Die({ id, isHeld, value, clickCallback }) {
    const styles = {
        backgroundColor: isHeld ? '#59E391' : 'white'
    }

    return (
        <div className='die'>
            <button onClick={() => clickCallback(id)} style={styles} className='die-button'>
                {value}
            </button>
        </div>
    )
}
