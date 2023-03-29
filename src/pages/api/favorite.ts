import { NextApiHandler } from 'next';
import prismadb from '../../../lib/prismadb';
import serverAuth from '../../../lib/serverAuth';
import { without } from 'lodash';


const handler: NextApiHandler = async (req, res) => {
    try {
        if (req.method === 'POST') {
            const { currentUser } = await serverAuth(req);
            const { movieId } = req.body as { movieId: string };

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                },
            });

            if (!existingMovie) {
                throw new Error('Invalid id');
            }

            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email || '',
                },
                data: {
                    favoriteIds: {
                        push: movieId,
                    },
                },
            });

            return res.status(200).json(user);
        }

        if (req.method === 'DELETE') {
            const { currentUser } = await serverAuth(req);
            const { movieId } = req.body as { movieId: string };

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                },
            });

            if (!existingMovie) {
                throw new Error('Invalid ID');
            }

            const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

            const updatedUser = await prismadb.user.update({
                where: {
                    email: currentUser.email || '',
                },
                data: {
                    favoriteIds: updatedFavoriteIds,
                },
            });

            return res.status(200).json(updatedUser);

        }

        return res.status(405).end();
    } catch (err) {
        console.log(err);
        return res.status(400).end();
    }
};

export default handler;