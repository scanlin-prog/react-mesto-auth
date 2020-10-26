import React from 'react';
import Header from './Header';
import { useHistory, Link } from 'react-router-dom';
import * as auth from '../utils/Auth';


function Register(props) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [name, setName] = React.useState('')
    const [about, setAbout] = React.useState('')
    const [avatar, setAvatar] = React.useState('')
    const history = useHistory();

    function handleChangeEmail(evt) {
        const { value } = evt.target;
        setEmail(value)
    }

    function handleChangePassword(evt) {
        const { value } = evt.target;
        setPassword(value)
    }

    function handleChangeName(evt) {
        const { value } = evt.target;
        setName(value)
    }

    function handleChangeAbout(evt) {
        const { value } = evt.target;
        setAbout(value)
    }

    function handleChangeAvatar(evt) {
        const { value } = evt.target;
        setAvatar(value)
    }


    function handleSubmit(evt) {
        evt.preventDefault();
        auth.register(email, password, name, about, avatar)
        .then((res) => {
            if(res) {
                props.openInfoTooltip(true, 'Вы успешно зарегистрировались!')
                history.push('/sign-in');
            } else {
                props.openInfoTooltip(false, 'Что-то пошло не так! Попробуйте еще раз.')
            }
        })
        .catch(() => alert(400 && 'Некорректно заполнено одно из полей'))
    }

    return(
        <>
            <Header sign={'/sign-in'} signLink={'Войти'} />
            <div className="login">
                <p className="login__welcome">
                    Регистрация
                </p>
                <form onSubmit={handleSubmit} className="login__form">
                    <input required className="login__input" onChange={handleChangeEmail} name="email" type="email" placeholder="Email" />
                    <input required className="login__input" onChange={handleChangePassword} name="password" type="password" placeholder="Пароль" />
                    <input required className="login__input" onChange={handleChangeName} name="name" type="text" placeholder="Имя" />
                    <input required className="login__input" onChange={handleChangeAbout} name="about" type="text" placeholder="О себе" />
                    <input required className="login__input" onChange={handleChangeAvatar} name="avatar" type="url" placeholder="Ссылка на аватар" />
                    <button type="submit" className="login__link">Зарегистрироваться</button>
                </form>
                <div className="login__signup">
                    <p>Уже зарегистрированы?</p>
                    <Link to={'/sign-in'} className="login__signup-link">Войти</Link>
                </div>
            </div>
        </>
    )
}

export default Register;