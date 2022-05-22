import React from 'react';
import {Card} from "./Card";
import {CARDS} from '../mockdata/cards'
import {CHARACTER} from '../mockdata/character'
import {Character} from "./Character";
import {Roll} from "./Roll";

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: CARDS,
            character: CHARACTER,
            lastRoll: []
        }
    }
    handleCardClicked(event, card) {
        const dieAmount = this.state.character.shooting
        const roll = Array(dieAmount).fill(null).map(() => {return Math.floor(Math.random() * 6) + 1})
        const successes = roll.filter(value => value >= 5).length
        this.setState({lastRoll: roll})

        let cardArray = this.state.cards.slice()

    }

    render() {
        return <div className="game">
            <div className="card-container">
                {this.state.cards.map((card) => {
                    return <Card
                        key={card.name}
                        onClick={(event) => {this.handleCardClicked(event, card)}}
                        cardData={card}
                    />
                })}
            </div>
            <div className="character-container">
                <Character value={this.state.character}/>
            </div>
            <Roll lastRoll={this.state.lastRoll}/>
        </div>
    }
}