import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {

    const inputNameRef = React.useRef();
    const inputLinkRef = React.useRef();

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onAddPlace({
            name: inputNameRef.current.value,
            link: inputLinkRef.current.value
        });
    }

    return(
        <PopupWithForm name="add" title="Новое место" titleButton="Создать" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <label className="popup__field">
                <input type="text" className="popup__input popup__input_first" id="title-input" placeholder="Название"
                    name="name" ref={inputNameRef} required minLength="1" maxLength="30" />
                <span className="popup__input-error" id="title-input-error"></span>
            </label>
            <label className="popup__field">
                <input type="url" className="popup__input popup__input_second" id="url-input"
                    placeholder="Ссылка на картинку" name="link" ref={inputLinkRef} required />
                <span className="popup__input-error" id="url-input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;