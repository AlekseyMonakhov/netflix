import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '../../../lib/prismadb';
import { hash } from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        const { email, name, password } = req.body as { email: string; name: string; password: string };

        const existingUser = await prismadb.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            return res.status(422).json({ error: 'email taken' });
        }

        const hashedPassword = await hash(password, 12);

        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            },
        });

        return res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.status(400).end();
    }
}
