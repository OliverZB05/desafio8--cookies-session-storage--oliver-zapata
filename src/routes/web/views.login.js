import { Router } from 'express';
import { getProducts } from './views.products.js';


const router = Router();

//Acceso público y privado
const publicAccess = (req, res, next) => {
    /* if(req.session.user) return res.redirect('/'); */
    next();
}

const privateAccess = (req, res, next) => {
    if(!req.session.user) return res.redirect('/login');
    next();
}

router.get('/register', publicAccess, (req, res) => {
    res.render('register');
});

router.get('/login', privateAccess, (req, res) => {
    res.render('login');
});

/* router.get('/', privateAccess, (req, res) => {
    res.render('products', {
        user: req.session.user,
        products: products
    });
}); */

/* router.get('/', privateAccess, async (req, res) => {
    const productsData = await getProducts();
    res.render('products', {
        user: req.session.user,
        ...productsData
    });
});  */


/* router.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;

    const data = await getProducts(page, limit);

    res.render("products", {
        user: req.session.user,
        ...data
    });
}); */

router.get('/', publicAccess, (req, res) => {
    res.render('login');
});




export default router;