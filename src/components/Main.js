import React from 'react';
import Card from './Card.js';
import Header from './Header.js';
import { CurrentUserContext } from '../context/CurrentUserContext.js';

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <>
            <Header sign={'/mesto-react/sign-in'} signLink={'Выйти'} handleLogout={props.handleLogout} >
                <p className="header__nickname">{props.user.email}</p>
            </Header>
            <main className="content">
                <section className="profile">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Лицо" />
                    <div className="profile__overlay" onClick={props.onEditAvatar}></div>
                    <div className="profile__info">
                        <div className="profile__info-heading">
                            <h1 className="profile__info-title">{currentUser.name}</h1>
                            <button className="profile__button-edit" onClick={props.onEditProfile} type="button"></button>
                        </div>
                        <p className="profile__info-subtitle">{currentUser.about}</p>
                    </div>
                    <button className="profile__button-add" onClick={props.onAddPlace} type="button"></button>
                </section>
                <section className="places">
                    {
                        props.cards.map((card) => {

                            return (
                                <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
                            )
                        })
                    }
                </section>
            </main>
        </>
    )


}

export default Main


