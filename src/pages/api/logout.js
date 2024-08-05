import cookie from 'cookie';

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Clear the token by setting an empty cookie with an immediate expiration date
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure secure cookies in production
        maxAge: -1, // Expire immediately
        sameSite: 'strict',
        path: '/', // Path where the cookie is valid
      })
    );

    return res.status(200).json({ message: 'Logout successful' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
