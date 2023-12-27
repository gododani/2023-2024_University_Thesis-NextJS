"use client";

// import { CldImage } from "next-cloudinary";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    <main className="">
      Home
      {/* <CldImage width={400} height={0} src="ma9q9bj3tvlduaguc22w" alt="ma9q9bj3tvlduaguc22w" /> */}
      {session ? `${JSON.stringify(session.data?.user)}` : `You are not logged in`}
    </main>
  );
}
