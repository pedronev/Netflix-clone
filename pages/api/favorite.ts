import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res);
      const { movieId, action } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        }
      });

      if (!existingMovie) {
        throw new Error('Invalid ID');
      }

      let updatedFavoriteIds;

      if (action === 'add') {
        // Add the movieId to the favoriteIds array
        updatedFavoriteIds = [...currentUser.favoriteIds, movieId];
      } else if (action === 'remove') {
        // Remove the movieId from the favoriteIds array
        updatedFavoriteIds = currentUser.favoriteIds.filter(id => id !== movieId);
      } else {
        throw new Error('Invalid action');
      }

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        }
      });

      return res.status(200).json(updatedUser);
    } else {
      return res.status(405).end(); // Method Not Allowed for other methods
    }
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}