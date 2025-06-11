export default function Die({ value }) {
    return (
        <div className='die'>
            <button className='die-button'>
                {value}
            </button>
        </div>
    )
}
