import NextAuth, { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';

const adminEmails = ['admin@example.com', 'anotheradmin@example.com']; // Define admin emails here

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({ session }) => {
      if (adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return null; // Return null if the user is not an admin
      }
    },
  },
};

export default NextAuth(authOptions);

// export async function isAdminRequest(req, res) {
//   const session = await getServerSession(req, res, authOptions);
//   if (!session || !adminEmails.includes(session?.user?.email)) {
//     res.status(401).end('Unauthorized: Not an admin');
//     throw new Error('Unauthorized access - not an admin');
//   }
// }
