"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';



const Page = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to '/dashboard' when component mounts
    router.push('/character');
  }, []);
  return null;
};
export default Page;


