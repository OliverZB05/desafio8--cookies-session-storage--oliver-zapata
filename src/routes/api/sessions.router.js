import { Router } from 'express';
import userModel from '../../dao/models/users.js';

const router = Router();

router.post('/register', async (req, res) => {
    try {
        let { first_name, last_name, email, age, password } = req.body;
        first_name = first_name.trim();
        last_name = last_name.trim();
        email = email.trim();
        age = age.trim();
        password = password.trim();

        const missingFields = [];
        if (!first_name) missingFields.push('nombre');
        if (!last_name) missingFields.push('apellido');
        if (!email) missingFields.push('correo');
        if (!age) missingFields.push('edad');
        if (!password) missingFields.push('contraseña');

        if (missingFields.length > 0) {
            const fields = missingFields.join(', ');
            return res.status(400).send({ status: 'warning', warning: `Debes ingresar ${missingFields.length === 1 ? 'el' : 'los'} campo${missingFields.length === 1 ? '' : 's'} ${fields}` });
        }

        const exists = await userModel.findOne({ email });

        if (exists) return res.status(400).send({ status: 'warning', warning: 'Ya hay un usuario registrado con ese correo' });

        let role;
        if(email === "adminCoder@coder.com" && password === "adminCod3r123"){
            role = "admin";
        }
        else {
            role = "usuario";
        }

        const user = {
            first_name,
            last_name,
            email,
            age,
            password,
            role
        }

        await userModel.create(user);

        res.send({ status: 'success', message: 'User registered' })
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
})

router.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.trim();
        password = password.trim();

        if (!email && !password) return res.status(400).send({ status: 'warning', warning: 'Debes ingresar tus datos para iniciar sesión' });
        if (!email) return res.status(400).send({ status: 'warning', warning: 'Debes ingresar tu correo' });
        if (!password) return res.status(400).send({ status: 'warning', warning: 'Debes ingresar la contraseña' });

        const user = await userModel.findOne({ email });
        const emailExists = await userModel.exists({ email });

        if (!emailExists) return res.status(400).send({ status: 'error', error: 'El correo que ingresaste no coincide con ningún usuario registrado' });
        if (!user) return res.status(400).send({ status: 'error', error: 'Contraseña incorrecta' });

        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            password: user.password,
            role: user.role
        }

        res.redirect('/products');
    } catch (error) {
        res.status(500).send({ status: 'error', error });
        console.log(error);
    }
});


router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) return res.status(500).send({ status: 'error', error: 'Logout fail' });
        res.redirect('/')
    })
});

export default router;