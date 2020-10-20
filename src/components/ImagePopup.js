import React from 'react';

function ImagePopup(props) {
    return(
        <div className={`popup ${props.card && 'popup_opened'}`} id="popup-image">
            <div className="popup__container-image">
                <p className="popup__image-title">{props.card ? props.card.name : ''}</p>
                <img className="popup__image" src={props.card ? props.card.link : ''} alt="Изображение" />
                <button className="popup__button-close popup__button-close_theme_image" onClick={props.onClose} type="button"></button>
            </div>
        </div>
    )
}

export default ImagePopup;