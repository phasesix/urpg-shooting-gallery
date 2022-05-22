import {HealthBar} from "./HealthBar";
import {ProtectionBar} from "./ProtectionBar";

export const Character = (props) => {
    return <div className="character">
        <h2>{props.value.name}</h2>
        <ProtectionBar value={props.value.armour.protection}/>
        <HealthBar max={props.value.health.max} value={props.value.health.value}/>
    </div>
}