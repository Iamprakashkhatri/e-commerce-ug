import React, { useEffect } from 'react';

export default function AboutUs() {
  useEffect(() => {
    window.location.href = 'https://ultragroup.com.np/introduction/';
  }, []);

  return <div>Redirecting...</div>;
}
