import {HealthBar} from "./HealthBar";
import {ProtectionBar} from "./ProtectionBar";

export const Card = (props) => {
    let cd = props.cardData

    return <div className="card" onClick={props.onClick}>
        <h2>{cd.name}</h2>
        <span>{cd.type}</span>
        <ProtectionBar value={cd.protection}/>
        <HealthBar max={cd.health.max} value={cd.health.value}/>
    </div>
}