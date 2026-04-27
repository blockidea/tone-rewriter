'use client';

import { useEffect } from 'react';

export default function Success() {
  useEffect(() => {
    localStorage.setItem('proUser', 'true');
  }, []);

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Payment Successful 🎉</h1>
      <p>You now have unlimited access.</p >
      <a href=" ">Go back</a >
    </div>
  );
}
