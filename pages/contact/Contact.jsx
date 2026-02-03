import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Contact = ({ user, loading: isLoading }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
      return;
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return <CircularProgress />;
  }
  return <div>Contact</div>;
};

export default Contact;
