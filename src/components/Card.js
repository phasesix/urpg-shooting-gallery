import {HealthBar} from "./HealthBar";
import {ProtectionBar} from "./ProtectionBar";
import {Die} from "./Roll";

const EnemyCard = (props) => {
    let cd = props.cardData

    return <div className="card enemy" onClick={props.onClick}>
        <h2>{cd.name}</h2>
        <div className="card-type">{cd.type}</div>
        <ProtectionBar value={cd.protection}/>
        <HealthBar max={cd.health.max} value={cd.health.value}/>
        <ul className="attribute-list">
            <li>Dice: {cd.action.dice}</li>
            <li>Piercing: {cd.action.piercing}</li>
            <li>Bonus Wounds: {cd.action.bonusWounds}</li>
        </ul>
        <div className="dice-container">
            {
                cd.lastRoll.map((die, index) => {
                    return <Die key={index} value={die}/>
                })
            }
        </div>
    </div>
}

const WeaponCard = (props) => {
    let cd = props.cardData
    return <div className="card friendly" onClick={props.onClick}>
        <h2>{cd.name}</h2>
        <div className="card-type">Weapon</div>
        <ul className="attribute-list">
            <li>Dice: {cd.dice}</li>
            <li>Piercing: {cd.piercing}</li>
            <li>Bonus Wounds: {cd.bonusWounds}</li>
        </ul>
    </div>
}

const ArmourCard = (props) => {
    let cd = props.cardData
    return <div className="card friendly" onClick={props.onClick}>
        <h2>{cd.name}</h2>
        <div className="card-type">Armour</div>
        <ul className="attribute-list">
            <li>Protection: {cd.protection}</li>
            <li>Evasion: {cd.evasion}</li>
        </ul>
    </div>
}


const ItemCard = (props) => {
    let cd = props.cardData
    return <div className="card friendly" onClick={props.onClick}>
        <h2>{cd.name}</h2>
        <div className="card-type">{cd.type}</div>
        <div>
            {cd.description}
        </div>
    </div>
}

export const Card = (props) => {
    switch (props.cardData.cardType) {
        case 'enemy':
            return EnemyCard(props)
        case 'weapon':
            return WeaponCard(props)
        case 'item':
            return ItemCard(props)
        case 'armour':
            return ArmourCard(props)
    }
}