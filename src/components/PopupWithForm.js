import React from 'react';

function PopupWithForm(props) {
    return(
        <div className={`popup ${props.isOpen ? "popup_opened" : ""}`} id={`popup-${props.name}`}>
            <form className="popup__container" name="popup-window" onSubmit={props.onSubmit} noValidate>
                <h3 className="popup__title">{props.title}</h3>
                {props.children}
                <button className="popup__button-create">{props.titleButton}</button>
                <button className="popup__button-close" type="button" onClick={props.onClose}></button>
            </form>
        </div>
    )
}

export default PopupWithForm;