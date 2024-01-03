// googleAuth.ts
import axios from 'axios';
import { googleOAuthConfig } from './oauthConfig';

export const authenticateWithGoogle = () => {
  const { clientId, clientSecret , redirectUri, scope } = googleOAuthConfig;
  const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&access_type=offline`;

  window.location.href = authUrl;
};

export const handleGoogleCallback = async (code: string) => {
  try {
    const { clientId, clientSecret, redirectUri } = googleOAuthConfig;
    const response = await axios.post(
      'https://accounts.google.com/o/oauth2/token',
      `code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&grant_type=authorization_code`
    );

    const accessToken = response.data.access_token;
    // Use the access token to make requests to Google APIs or set up user session.
    // You can also make an additional request to fetch user information.
    // Example: const userInfo = await fetchUserInfo(accessToken);
    return accessToken;
  } catch (error) {
    throw new Error('Failed to exchange code for access token');
  }
};
