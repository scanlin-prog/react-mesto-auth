import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {

    const inputRef = React.useRef();

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateAvatar({
            
            link: inputRef.current.value,
        });


    }

    return (
        <PopupWithForm name="avatar" title="Обновить аватар" titleButton="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <label className="popup__field">
                <input type="url" className="popup__input popup__input_second" id="url-input"
                    placeholder="Ссылка на картинку" name="link" ref={inputRef} required />
                <span className="popup__input-error" id="url-input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;