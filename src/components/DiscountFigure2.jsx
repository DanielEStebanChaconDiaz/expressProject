import React from 'react';
import imagen from '../../public/img/estrella.svg';
import '../styles/discountFigure2.css';

export default function DiscountFigure2({text}) {
    return (
        <div className='container-discountFigure2'>
            <img src={imagen} alt="" />
            <p>{text}</p>
        </div>
    );
}