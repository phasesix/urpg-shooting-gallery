import {HealthBar} from "./HealthBar";
import {ProtectionBar} from "./ProtectionBar";

export const Character = (props) => {
    return <div className="character">
        <h2>{props.value.name}</h2>
        <ProtectionBar value={props.value.armour.protection}/>
        <HealthBar max={props.value.health.max} value={props.value.health.value}/>
        <div className="character-items">
            <div>
                <h3>Character</h3>
                <ul className="attribute-list">
                    <li>Shooting: {props.value.shooting}</li>
                    <li>Throwing: {props.value.throwing}</li>
                    <li>HandToHandCombat: {props.value.handToHandCombat}</li>
                </ul>
            </div>
            <div>
                <h3>{props.value.weapon.name}</h3>
                <ul className="attribute-list">
                    <li>Dice: {props.value.weapon.dice}</li>
                    <li>Piercing: {props.value.weapon.piercing}</li>
                    <li>Bonus Wounds: {props.value.weapon.bonusWounds}</li>
                </ul>
            </div>
            <div>
                <h3>{props.value.armour.name}</h3>
                <ul className="attribute-list">
                    <li>Protection: {props.value.armour.protection}</li>
                    <li>Evasion: {props.value.armour.evasion}</li>
                </ul>
            </div>
            {props.value.items.map((item, index) => {
                return <div
                    key={index}
                    className="character-item"
                    onClick={(event) => props.onItemClick(event, item)}>
                    <h3>{item.name}</h3>
                    <div>
                        {item.description}
                    </div>
                </div>
            })}
        </div>
    </div>
}