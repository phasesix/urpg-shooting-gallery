export const Roll = (props) => {
    return <div className="roll-container">
        {
            props.lastRoll.map((die, index) => {
                return <Die key={index} value={die} />
            })
        }
    </div>
}

export const Die = (props) => {
    return <div className={`${props.additionalClass} ${props.value >= 5 ? 'die success' : 'die fail'}`}>
        {props.value}
    </div>
}