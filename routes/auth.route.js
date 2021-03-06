const { Router } = require("express");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator")

const router = Router();


// api/auth/register
router.post(
    '/register', [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длинна пароля 6 символов')
        .isLength({ min: 6 })
    ],
    async(req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации'
                })
            }

            const { email, password } = req.body;
            const candidate = await User.findOne({ email });

            if (candidate) {
                res.status(400).json({ message: 'Такой пользователь уже существует' });
            }

            const hashedPassword = await bcrypt.hash(password, config.get("sol"));
            const user = new User({ email, password: hashedPassword });
            await user.save();

            res.status(201).json({ message: 'Пользователь создан' });
        } catch (error) {
            res.status(500).json({ messge: 'Роутер register  вернул ошибку' });
        }
    })

// api/auth/login
router.post(
    '/login', [
        check('email', 'Некорректный email').normalizeEmail().isEmail(),
        check('password', 'Минимальная длинна пароля 6 символов')
        .isLength({ min: 6 }).exists()
    ],
    async(req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе'
                });
            }

            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Не верный пароль' });
            }

            const token = jwt.sign({ UserId: user.id },
                config.get("jwtKey"), { expiresIn: '1h' }
            );

            res.json({ token, userId: user.id });

        } catch (error) {
            res.status(500).json({ messge: 'Роутер login вернул ошибку' });
        }
    })

module.exports = router;