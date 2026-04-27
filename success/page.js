'use client'
import { useEffect } from 'react';

export default function Success() {
  useEffect(() => {
    localStorage.setItem("proUser", "true");
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Payment successful 🎉</h2>
      <p>You now have unlimited rewrites.</p>
      <a href="/">Go back to app</a>
    </div>
  );
}
