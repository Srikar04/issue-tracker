'use client';

import { useRouter } from "next/navigation";
import {useEffect} from "react";

export default function Home() {

  const router = useRouter();

  useEffect(() => {
    router.push('/issues/list');
  },[router])
  return (
    <main>
       Coming soon..
    </main>
  );
}
