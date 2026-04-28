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
      <a
  href="https://tone-rewriter-eight.vercel.app/"
  style={{ fontSize: '20px', color: 'blue' }}
>
  Go back to app
</a>
    </div>
  );
}
