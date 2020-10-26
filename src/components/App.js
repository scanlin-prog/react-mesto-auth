import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import { api } from '../utils/Api.js';
import Login from './Login.js';
import Register from './Register.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import InfoTooltip from './InfoTooltip.js';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/Auth';

function App() {

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltip, setInfoTooltip] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(undefined);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [infoPopup, setInfoPopup] = React.useState({});

  const history = useHistory();

  React.useEffect(() => {
    tokenCheck();
    api.getProfileData()
      .then((result) => {
        setCurrentUser(result);
      }).catch((err) => {
        console.log(err)
      })

    api.getCardsData()
      .then((result) => {
        setCards(result)
      }).catch((err) => {
        console.log(err)
      })
  }, [])


  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(dataCard) {
    setSelectedCard(dataCard);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.toggleLikeCard(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      }).catch((err) => {
        console.log(err)
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      }).catch((err) => {
        console.log(err)
      })
  }

  function handleUpdateUser(data) {
    api.sendProfileData(data)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      }).catch((err) => {
        console.log(err)
      })
  }

  function handleUpdateAvatar(data) {
    api.changeAvatar(data)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      }).catch((err) => {
        console.log(err)
      })
  }

  function handleAddPlaceSubmit(data) {
    api.sendCardData(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.log(err)
    })
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(undefined);
    setInfoTooltip(false)
  }

  function handleLogin() {
    tokenCheck()
  }
  
  function handleLogout() {
    localStorage.removeItem('token')
    setLoggedIn(false)
  }

  function tokenCheck() {
    let token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res)
            history.push('/main');
          }
        })
        .catch(() => {
          alert(401 && 'Переданный токен некорректен')
        })
    }
  }

  function openInfoTooltip(boolean, text) {
    setInfoPopup({
      image: boolean,
      text: text
    })
    setTimeout(setInfoTooltip, 300, true)
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute path="/main" loggedIn={loggedIn} user={currentUser} component={Main} handleLogout={handleLogout} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
          <Route path="/sign-up">
            <Register openInfoTooltip={openInfoTooltip} />
          </Route>
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <PopupWithForm name="confirm" title="Вы уверены?" titleButton="Да"></PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
        <InfoTooltip isOpen={isInfoTooltip} infoPopup={infoPopup} onClose={closeAllPopups}></InfoTooltip>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

