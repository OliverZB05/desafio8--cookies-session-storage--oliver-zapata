import { Router } from 'express';
import userModel from '../../dao/models/users.js';

const router = Router();

router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        const exists = await userModel.findOne({ email });

        if (exists) return res.status(400).send({ status: 'error', error: 'User already exists' });

        const user = {
            first_name,
            last_name,
            email,
            age,
            password
        }

        await userModel.create(user);
        res.send({ status: 'success', message: 'User registered' })
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
})

/* router.post('/register', async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;
        const exists = await userModel.findOne({ email });

        if (exists) return res.status(400).send({ status: 'error', error: 'User already exists' });

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = {
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword
        }

        await userModel.create(user);
        res.send({ status: 'success', message: 'User registered' })
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
}) */


router.post('/login', async (req, res) => {
    try {
        // await userModel.deleteMany({});
        const { email, password } = req.body;

        const user = await userModel.findOne({ email, password });

        if (!user) return res.status(400).send({ status: 'error', error: 'Incorrect credentials' });

        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age
        }

        res.redirect('/products');
        /* res.send({ status: 'success', message: 'Login success' }) */
    } catch (error) {
        res.status(500).send({ status: 'error', error });
        console.log(error);
    }
});

/* router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Email: ${email}, Password: ${password}`); // Verifica si las variables email y password están definidas correctamente
        const user = await userModel.findOne({ email, password });
        console.log(`User: ${user}`); // Verifica si se encontró un usuario en la base de datos
        if (!user) return res.status(400).send({ status: 'error', error: 'Incorrect credentials' });
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age
        }
        res.redirect('/products');
    } catch (error) {
        console.log(error); // Muestra el error en la consola del servidor
        res.status(500).send({ status: 'error', error });
    }
}); */


/* router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email, password });
        console.log(`User: ${user}`);
        console.log(`UserModel: ${userModel}`);
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);

        if (!user) return res.status(400).send({ status: 'error', error: 'Incorrect credentials' });

        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age
        }
        // console.log(`Session user: ${req.session.user}`); // Verifica si se está estableciendo correctamente la información del usuario en la sesión

        // res.redirect('/products');
        res.send({ status: 'success', message: 'Login success' })
    } catch (error) {
        res.status(500).send({ status: 'error', error });
        console.log(error);
    }
}); */

/* router.post('/login', async (req, res) => {
    try {
        // await userModel.deleteMany({});
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).send({ status: 'error', error: 'Incorrect credentials' });
        }

        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age
        }
    
        res.send({ status: 'success', message: 'Login success' })
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
}); */



router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) return res.status(500).send({ status: 'error', error: 'Logout fail' });
        res.redirect('/')
    })
});

export default router;