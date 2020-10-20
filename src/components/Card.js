import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext)
    const isOwn = props.card.owner._id === currentUser._id;
    const cardRemoveButtonClassName = (
        `place__button-remove ${isOwn ? 'place__button-remove_active' : ''}`
    )

    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `place__button-like ${isLiked ? 'place__button-like_active' : ''}`

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (

        <div className="place">
            <img className="place__image" src={props.card.link} onClick={handleClick} alt="Изображение" />
            <h3 className="place__title">{props.card.name}</h3>
            <div className="place__field-like">
                <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                <p className="place__button-like-number">{props.card.likes.length}</p>
            </div>
            <button className={cardRemoveButtonClassName} type="button" onClick={handleDeleteClick}></button>
        </div>

    )
}

export default Card