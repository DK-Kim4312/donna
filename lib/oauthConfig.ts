// oauthConfig.ts
require('dotenv').config();
export const googleOAuthConfig = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
    scope: 'email profile', // Customize the scope as needed
  };
  