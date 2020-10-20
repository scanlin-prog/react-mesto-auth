import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import * as auth from '../utils/Auth';

function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function resetForm() {
        setEmail('');
        setPassword('');
    }

    function handleChangeEmail(evt) {
        const { value } = evt.target;
        setEmail(value)
    }

    function handleChangePassword(evt) {
        const { value } = evt.target;
        setPassword(value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if (!email || !password) {
            alert('Неверный email или пароль')
            return;
        }
        auth.authorize(email, password)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    resetForm();
                    props.handleLogin();
                } else {
                    return
                }
            })
            .catch(() => alert(401 && 'Пользователь с email не найден'))
    }


    return (
        <>
            <Header sign={'/react-mesto-auth/sign-up'} signLink={'Регистрация'} />
            <div className="login">
                <p className="login__welcome">
                    Вход
                </p>
                <form onSubmit={handleSubmit} className="login__form">
                    <input required className="login__input" onChange={handleChangeEmail} name="email" type="email" placeholder="Email" />
                    <input required className="login__input" onChange={handleChangePassword} name="password" type="password" placeholder="Пароль" />
                    <button type="submit" className="login__link">Войти</button>
                </form>
                <div className="login__signup">
                    <p>Ещё не зарегистрированы?</p>
                    <Link to={'/react-mesto-auth/sign-up'} className="login__signup-link">Регистрация</Link>
                </div>
            </div>
        </>
    )
}

export default Login;