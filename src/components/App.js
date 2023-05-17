import React from 'react';
import {api} from '../utils/Api.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import { Routes, Route } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import imageRegister from '../images/Register.png';
import imageNoRegister from '../images/NoRegister.png';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setСurrentUser] = React.useState({});
  const [isInfoTooltip, setIsInfoTooltip] = React.useState(false);
  


//загрузка профиля и аватара с сервера
React.useEffect(() => {
  api
  .getCurrentUser()
  .then(profile => {
    setСurrentUser(profile);
  })
  .catch((err) => {
    console.log(err);
  })
}, [])

  //загрузка карточек с сервера
  React.useEffect(() => {
    api
    .getCard()
    .then(data => {
      setCards(data)}
    )
    .catch((err) => {
      console.log(err);
    })
  }, [])

   //загрузка и обновление данные профиля
   function handleUpdateUser (profile) {
    api.editProfile(profile)
    .then(profile => {
      setСurrentUser(profile);
      setIsEditProfilePopupOpen(false);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  //загрузка и обновление данных аватара
  function handleUpdateAvatar (profile) {
    api.editAvatar(profile)
    .then(profile => {
      setСurrentUser(profile);
      setIsEditAvatarPopupOpen(false);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleUpdateNewCard (newCard) {
    api.createCardApi(newCard)
    .then(newCard => {
      setCards([newCard, ...cards]); 
      setIsAddPlacePopupOpen(false);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  //удаление карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter((c) => c._id !== card._id));
    })
      .catch((err) => {
        console.log(err);
      })
  }

  //лайк карточки через проброс на сервер
  function handleCardLike(card) {
    api.clickLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    })
  }

  //дизлайк карточки
  function handleCardDislike(card) {
    api.deleteLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    })
  }

  //открытие картинки на весь экран
  function handleCardClick (card) {
    setSelectedCard(card);
  }

  //открытие попапа аватара
  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }

  //открытие попапа редактирования профиля
  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  }

  //открытие попапа добавления карточки
  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }

  function handleInfoTooltip () {
    setIsInfoTooltip(true);
  }

  //закрытие всех попапов
  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltip(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">

        <Routes>
            <Route index element={<>
              <Header 
             headerEmail={''} headerTitle={'Регистрация'} headerLink={'/sign-in'}/>
             <Login />
             </>} />
            <Route path="/sign-up" element={<>
            <Header headerEmail={''} headerTitle={'Регистрация'} headerLink={'/sign-in'}/>
             <Login />
             </>} />
            <Route path='/sign-in' element={
            <>
            <Header headerEmail={''} headerTitle={'Вход'} headerLink={'/sign-up'}/>
            <Register onsetIsInfoTooltip={handleInfoTooltip} />
            </>
            }/>
            <Route path='/mesto-react' element={
              <>
            <Header 
            headerEmail={'123'} headerTitle={'Выйти'} headerLink={''}/>
            <Main 
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
              onCardDislike={handleCardDislike}
            />
            </>}/>
        </Routes>
             <Footer />    
        </div> 

        <ImagePopup onClose={closeAllPopups} card={selectedCard} />

        <InfoTooltip name="register" title="Вы успешно зарегистрировались!" image={imageRegister} isOpen={isInfoTooltip} onClose={closeAllPopups} />

        <InfoTooltip name="noregister" title="Что-то пошло не так! Попробуйте ещё раз." image={imageNoRegister} isOpen={isInfoTooltip} onClose={closeAllPopups} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdateNewCard={handleUpdateNewCard}/>

      </div> 
    </CurrentUserContext.Provider>
    
  );
}

export default App;
