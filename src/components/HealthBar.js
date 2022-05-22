import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart, faHeartCrack} from '@fortawesome/free-solid-svg-icons'

export const HealthBar = (props) => {
    let heartArray = []
    for (let i = 0; i < props.value; i++) {
        heartArray.push(<span key={`full${i}`} className="full"><FontAwesomeIcon icon={faHeart}/></span>)
    }
    for (let i = 0; i < props.max - props.value; i++) {
        heartArray.push(<span key={`empty${i}`} className="empty"><FontAwesomeIcon icon={faHeartCrack}/></span>)
    }


    return <div className="health-bar">
        {heartArray}
    </div>
}