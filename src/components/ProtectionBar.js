import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShield} from '@fortawesome/free-solid-svg-icons'

export const ProtectionBar = (props) => {
    let shieldArray = []
    for (let i = 0; i < props.value; i++) {
        shieldArray.push(<span key={`shield${i}`} className="full"><FontAwesomeIcon icon={faShield}/></span>)
    }

    return <div className="shield-bar">
        {shieldArray}
    </div>
}