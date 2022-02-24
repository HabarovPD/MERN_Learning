import React, { useState } from "react";
import { useHttp } from "../hooks/http.hook"


export const AuthPage = () => {

    // нипанятная хирня разобраться
    const { loading, request } = useHttp();
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form });
            console.log('Data:', data);

        } catch (error) {

        }
    }
    // вот по сюда.. как работает этот хэндлер


    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Сократи ссылку</h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>

                            <div className="row">
                                <div className="input-field col s6">
                                    <input
                                        placeholder="Введите email"
                                        id="email"
                                        type="text"
                                        //<className="validate">
                                        name="email"
                                        onChange={changeHandler}
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input
                                        placeholder="Введите пароль"
                                        id="password"
                                        type="password"
                                        //className="validate"
                                        name="password"
                                        onChange={changeHandler}
                                    />
                                    <label htmlFor="password">Пароль</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn orange darken-4 white-text"
                            style={{ marginRight: 10 }}
                            disabled={loading}>
                            Войти
                        </button>
                        <button
                            className="btn teal darken-4 white-text"
                            onClick={registerHandler}
                            disabled={loading}>
                            Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}