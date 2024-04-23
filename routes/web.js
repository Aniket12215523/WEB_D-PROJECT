const homeController = require('../app/https/controllers/homeController');
const authController = require('../app/https/controllers/authController');
const cartController = require('../app/https/controllers/customers/cartController');

function initRoutes(app) {
    // Route handler for home page
    app.get('/', homeController().index);
    
    // Route handler for login page
    app.get('/login', authController().login);

    // Route handler for Register page
    app.get('/register', authController().register);

    // Route for  user registration using post method
    app.post('/register', authController().postRegister);

    // Route handler for cart page
    app.get('/cart', cartController().index);

    // Route handler for update-cart
    app.post('/update-cart', cartController().update);
}

// Exporting the routes module to be used in server.js file
module.exports = initRoutes;
