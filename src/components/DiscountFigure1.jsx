import React from 'react';
import imagen from '../../public/img/estrella.svg';
import '../styles/discountFigure1.css';


export default function DiscountFigure1({text}) {
    return (
        <div className='container-discountFigure1'>
            <img src={imagen} alt="" />
            <p>-{text}%</p>
        </div>
    );
}
