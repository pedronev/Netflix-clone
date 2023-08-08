import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/libs/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end(); // Return a 405 Method Not Allowed response for non-POST requests
    }

    const { email, name, password } = req.body;

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(422).json({ error: 'Invalid email format' }); // Return a 422 Unprocessable Entity response for invalid email format
    }

    // Validate password strength (e.g., at least 8 characters with uppercase, lowercase, and numbers)
    if (!validatePasswordStrength(password)) {
      return res.status(422).json({ error: 'Password must be at least 6 characters long and contain uppercase, lowercase, and numbers' }); // Return a 422 Unprocessable Entity response for weak passwords
    }

    const existingUser = await prismadb.user.findUnique({
      where: {
        email
      }
    })

    if (existingUser) {
      return res.status(422).json({ error: 'Email taken' }); // Return a 422 Unprocessable Entity response if the email is already registered
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user in the database
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
      }
    })

    return res.status(200).json(user); // Return a 200 OK response with the created user data
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` }); // Return a 400 Bad Request response if any other error occurs
  }
}

// Helper function to validate email format
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression to match valid email format
  return emailRegex.test(email);
}

// Helper function to validate password strength
function validatePasswordStrength(password: string): boolean {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/; // Regular expression to match password criteria
  return passwordRegex.test(password);
}