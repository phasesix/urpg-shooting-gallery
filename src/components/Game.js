import React from 'react';
import {Card} from "./Card";
import {ENEMIES} from '../mockdata/enemies'
import {CHARACTER} from '../mockdata/character'
import {Character} from "./Character";
import {Roll} from "./Roll";
import {uuidv4} from "../utils";
import {WEAPONS} from "../mockdata/weapons";
import {ITEMS} from "../mockdata/items";

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.ENEMIES = ENEMIES
        this.WEAPONS = WEAPONS
        this.ITEMS = ITEMS
        this.state = {
            wave: 1,
            cards: [],
            character: CHARACTER,
            lastRoll: ['P', 'H', 'A', 'S', 'E', 6]
        }
    }

    async componentDidMount() {
        await this.#fillCards(1)
    }

    async handleCardClicked(event, card) {

        await this.#handleEnemyCard(card)
        await this.#handleWeaponCard(card)
        await this.#handleItemCard(card)

        // roll all enemies
        for (let card of this.state.cards.filter(c => c.cardType === 'enemy')) {
            //await new Promise(r => setTimeout(r, 1500))  // Sleep
            let [roll, successes] = await this.#rollDice(card.action.dice)
            await this.#damageCharacter(successes, card.piercing)
            await this.#updateCardLastRoll(card, roll)
        }

        if (this.state.cards.filter(c => c.cardType === 'enemy').length === 0) {
            this.setState({wave: this.state.wave + 1})
            await this.#fillCards(this.state.wave)
        }
    }

    async handleCharacterItemClick(event, item) {
        // TODO this is undefined due to call from another component
        if (item.cardType === 'item') {
            if (item.effect.attribute === 'health') {
                let character = this.state.character
                character.health.value += item.effect.modifier
                if (character.health.value > character.health.max) {
                    character.health.value = character.health.max
                }
                this.setState({character: character})
            }
        }
    }

    async #handleEnemyCard(card) {
        const dice = this.state.character.shooting + this.state.character.weapon.dice
        const piercing = this.state.character.weapon.piercing

        if (card.cardType === 'enemy') {
            let [roll, successes] = await this.#rollDice(dice)
            this.setState({lastRoll: roll})
            await this.#damageCard(card, successes, piercing, this.state.character.weapon.bonusWounds)
        }
    }

    async #handleWeaponCard(card) {
        if (card.cardType === 'weapon') {
            let cardArray = this.state.cards.slice()
            cardArray.find((obj, index) => {
                if (obj && obj.uuid === card.uuid) {
                    let character = this.state.character
                    character.weapon = structuredClone(card)
                    this.setState({character: character})
                    cardArray.splice(index, 1)
                    this.setState({cards: cardArray})
                }
            })
        }
    }

    async #handleItemCard(card) {
        if (card.cardType === 'item') {
            let cardArray = this.state.cards.slice()
            cardArray.find((obj, index) => {
                if (obj && obj.uuid === card.uuid) {
                    let character = this.state.character
                    character.items.push(structuredClone(card))
                    this.setState({character: character})
                    cardArray.splice(index, 1)
                    this.setState({cards: cardArray})
                }
            })
        }
    }

    async #updateCardLastRoll(card, lastRoll) {
        let cardArray = this.state.cards.slice()
        let obj = cardArray.find((obj, index) => {
            if (obj.uuid === card.uuid) {
                obj.lastRoll = lastRoll
                this.setState({cards: cardArray})
            }
        })
    }

    async #damageCharacter(successes, piercing) {
        const ap = this.state.character.armour.protection
        // TODO: Javascript Clamp?
        const protection = (ap - piercing) >= 0 ? (ap - piercing) : 0
        const damage = (successes - protection) >= 0 ? (successes - protection) : 0

        let character = this.state.character
        character.health.value -= damage
        if (character.health.value < 0) {
            character.health.value = 0
        }
        this.setState({character: character})
    }

    async #damageCard(card, successes, piercing, bonusWounds) {
        let cardArray = this.state.cards.slice()
        let obj = cardArray.find((obj, index) => {
            if (obj.uuid === card.uuid) {
                const protection = (card.protection - piercing) >= 0 ? (card.protection - piercing) : 0
                let damage = (successes - protection)
                damage = damage > 0 ? damage + bonusWounds : 0
                cardArray[index]['health']['value'] -= damage
                if (cardArray[index]['health']['value'] <= 0) {
                    cardArray.splice(index, 1)
                }
                this.setState({cards: cardArray})
                return true
            }
            return false
        })
    }

    async #rollDice(dieAmount) {
        const audioElement = document.getElementById('roll-audio')
        let roll = Array(dieAmount).fill(null)
            .map(() => {
                return Math.floor(Math.random() * 6) + 1
            })
        const successes = roll.filter(value => value >= 5).length
        audioElement.play()
        roll.sort()
        roll.reverse()
        return [roll, successes]
    }


    async #fillCards(wave) {
        let cards = []
        for (let i = 0; i < wave; i++) {
            let card = structuredClone(this.ENEMIES[Math.floor(Math.random() * this.ENEMIES.length)])
            card.uuid = uuidv4()
            cards.push(card)
        }

        if (wave === 1 || (Math.random() * 100) > 80) {
            let weapon = structuredClone(this.WEAPONS[Math.floor(Math.random() * this.WEAPONS.length)])
            weapon.uuid = uuidv4()
            cards.push(weapon)
        }

        if (wave === 1 || (Math.random() * 100) > 50) {
            let item = structuredClone(this.ITEMS[Math.floor(Math.random() * this.ITEMS.length)])
            item.uuid = uuidv4()
            cards.push(item)
        }
        this.setState({cards: cards})
    }

    render() {
        return <div className="game">
            <h1>Wave {this.state.wave}</h1>
            <div className="card-container">
                {this.state.cards.map((card, index) => {
                    return <Card
                        key={index}
                        onClick={(event) => {
                            this.handleCardClicked(event, card)
                        }}
                        cardData={card}
                    />
                })}
            </div>
            <Roll lastRoll={this.state.lastRoll}/>
            <div className="character-container">
                <Character
                    value={this.state.character}
                    onItemClick={this.handleCharacterItemClick}
                />
            </div>
        </div>
    }
}