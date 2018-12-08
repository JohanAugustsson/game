import React from 'react';
import PropTypes from 'prop-types';
import './playerAddSub.css'

function PlayerAddSub({task: {name, id, value}, onAdd, onSubstract}) {
    return (
        <div className="game-form">
            <div className="margin"> {name}</div>
            <div className="margin">
                <button onClick={() => onAdd(id)}> -</button>
            </div>
            <div className="margin">
                {value}</div>
            <div className="margin">
                <button onClick={() => onSubstract(id)}> +</button>
            </div>
        </div>
    )
}


PlayerAddSub.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.string,
    }),
    onAdd: PropTypes.func,
    onSubstract: PropTypes.func,
};


export default PlayerAddSub