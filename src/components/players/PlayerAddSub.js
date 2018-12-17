import React from 'react';
import PropTypes from 'prop-types';
import './playerAddSub.css'

function PlayerAddSub({player: {firstName, uid, value}, onAdd, onSubstract}) {
    return (
        <div className="game-form">
            <div className="margin"> {firstName}</div>
            <div className="margin">
                <button onClick={() => onSubstract(uid)}> -</button>
            </div>
            <div className="margin">
                {value}</div>
            <div className="margin">
                <button onClick={() => onAdd(uid)}> +</button>
            </div>
        </div>
    )
}

PlayerAddSub.propTypes = {
    player: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        value: PropTypes.number,
    }),
    onAdd: PropTypes.func,
    onSubstract: PropTypes.func,
};


export default PlayerAddSub
