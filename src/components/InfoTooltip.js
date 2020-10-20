import React from 'react';
import success from '../images/Success.svg';
import fail from '../images/Fail.svg';

function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <img className="popup__info-image" src={props.infoPopup.image ? success : fail} alt="Изображение" />
                <p className="popup__info-title">{props.infoPopup.text}</p>
                <button className="popup__button-close" onClick={props.onClose} type="button"></button>
            </div>
        </div>
    )
}

export default InfoTooltip;