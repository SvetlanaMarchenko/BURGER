import React from 'react';

const CountIngredients = ({ current, clickCounts }) => {
    return (
        <div>
            <h2>Количество нажатий:</h2>
            <p>Булки: {clickCounts.Булки}</p>
            <p>Соусы: {clickCounts.Соусы}</p>
            <p>Начинки: {clickCounts.Начинки}</p>
        </div>
    );
};

export default CountIngredients;
