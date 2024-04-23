const User = require('../../models/user');
const bcrypt = require('bcrypt');

function authController() {
    return {
        login(req, res) {
            res.render('auth/login');
        },
        register(req, res) {
            res.render('auth/register');
        },
        async postRegister(req, res) {
            const { name, email, password } = req.body;
            // validate request
            if (!name || !email || !password) {
                req.flash('error', 'Please fill out all fields!');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register');
            }

            try {
                //  Check if email exists
                const emailExists = await User.exists({ email: email });
                if (emailExists) {
                    req.flash('error', 'Email already taken!');
                    req.flash('name', name);
                    req.flash('email', email);
                    return res.redirect('/register');
                }

                // hash password
                const hashedPassword = await bcrypt.hash(password, 10);

                // Create a user
                const user = new User({
                    name,
                    email,
                    password: hashedPassword
                });

                await user.save();
                return res.redirect('/');
            } catch (error) {
                console.error('Error during user registration:', error);
                req.flash('error', 'Something went wrong');
                return res.redirect('/register');
            }
        }
    };
}

module.exports = authController;
