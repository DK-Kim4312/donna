'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const UpdatePassword = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState(null);
  const [password, setPassword] = useState('');

  async function updatePassword() {
    if (!password) {
      setErrorMsg('Password is required');
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      // Go to Home page
      router.replace('/');
    }
  }

  return (
    <div className="card">
      <h2 className="w-full text-center">Update Password</h2>
      <label htmlFor="password">New Password</label>
      <input
        className="input"
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMsg && <div className="text-red-600">{errorMsg}</div>}
      <button className="button-inverse w-full" onClick={updatePassword}>
        Update Password
      </button>
    </div>
  );
};

export default UpdatePassword;
