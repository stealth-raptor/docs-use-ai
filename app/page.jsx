'use client'
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {

  const router=useRouter();

  const toAuth=()=>{
    router.push("/dashboard");
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f1a] to-[#09090f] text-white flex flex-col items-center justify-center px-4">

      <header className="absolute top-6 left-6 flex items-center gap-2">
        <span className="text-lg font-semibold tracking-tight">DoC.AI</span>
      </header>

      <main className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
          AI-Powered Fast and Simple<br />
        <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Clinical Decision Support Tool</span>
        </h1>

        <div className="mt-8 flex gap-4 justify-center">
          <Button className='text-2xl p-7 rounded-2xl' onClick={toAuth}>Get Started</Button>
        </div>
      </main>
    </div>
  );
}