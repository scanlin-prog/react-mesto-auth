import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function EditProfilePopup(props) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm name="edit" title="Редактировать" titleButton="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <label className="popup__field">
                <input type="text" value={name || ''} onChange={handleChangeName} className="popup__input popup__input_first" id="name-input" placeholder="Имя" name="name"
                    required minLength="2" maxLength="40" />
                <span className="popup__input-error" id="name-input-error"></span>
            </label>
            <label className="popup__field">
                <input type="text" value={description || ''} onChange={handleChangeDescription} className="popup__input popup__input_second" id="job-input" placeholder="О себе"
                    name="about" required minLength="2" maxLength="200" />
                <span className="popup__input-error" id="job-input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup

