import React from "react";

import { CreatePage } from "./pages/CreatePage";
import { DetailPage } from "./pages/DetailPage.js";
import { LinksPage } from "./pages/LinksPage";
import { AuthPage } from "./pages/AuthPage";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';

// роутеры необходимы для singl-page приложения 
// по сути мы динамически заменяем часть кода (или весь код) на странице
// в данном случае меняем целиком страницу


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        // для авторизированных 
        return (
            <Router>
                <Routes>
                    <Route path="/links" element={<LinksPage />} exact />
                    <Route path="/create" element={<CreatePage />} exact />
                    <Route path="/detail/:id" element={<DetailPage />} />
                    <Route path="*" element={<Navigate replace to="/create" />} />
                </Routes>
            </Router>
        )
    }
    // для неавторизированных пользователей
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthPage />} exact />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </Router>
    )
}