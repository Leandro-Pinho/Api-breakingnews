import bcrypt from 'bcrypt';
import { generateToken, loginService } from '../service/auth.service.js';

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await loginService(email)

        if (!user) {
            return res.status(404).send({ message: "usuario ou senha invalido!" })
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password)

        if (!passwordIsValid) {
            return res.status(400).send({ message: "usuario ou senha invalido!" })
        }

        const token = generateToken(user.id)

        res.send({ "token": token })

    } catch (error) {
        res.status(500).send(error.message)
    }
}