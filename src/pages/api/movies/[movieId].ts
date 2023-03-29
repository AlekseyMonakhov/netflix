import { NextApiHandler } from 'next';
import serverAuth from '../../../../lib/serverAuth';
import prismadb from '../../../../lib/prismadb';

const handler: NextApiHandler = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        await serverAuth(req);

        const { movieId } = req.query as { movieId: string };

        if (typeof movieId !== 'string') {
            throw new Error('Invalid Id');
        }

        if (!movieId) {
            throw new Error('Invalid id');
        }

        const movie = await prismadb.movie.findUnique({
            where: {
                id: movieId,
            },
        });

        if (!movie) {
            throw new Error('invalid Id');
        }
        
        return res.status(200).json(movie);

    } catch (err) {
        console.log(err);
        return res.status(400).end();
    }
};

export default handler;