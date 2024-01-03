// pages/auth/callback.tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { handleGoogleCallback } from '../../lib/googleAuth';

const GoogleCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const { code } = router.query;

    if (code) {
      handleGoogleCallback(code as string)
        .then((accessToken) => {
            // TODO: save accessToken to database

            //redirect to home page
            router.push('/');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [router.query]);

  return <div>Processing...</div>;
};

export default GoogleCallback;
