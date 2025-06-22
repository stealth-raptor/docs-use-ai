'use client';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const router = useRouter();

  const toAuth = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/30 to-background text-foreground flex flex-col items-center justify-center px-4 font-sans">

      {/* Header */}
      <header className="absolute top-6 left-6 flex items-center gap-2 w-350">
        <div className="flex justify-between w-full items-center">
          <h2 className="text-2xl font-extrabold tracking-tight">DoC.AI</h2>
          <Button onClick={()=>router.push("/auth")}>Sign In</Button>
        </div>
      </header>

      {/* Hero Content */}
      <main className="text-center">
        <Badge variant="secondary" className='border-1 border-black p-1.5 font-semibold tex-2xl'>🔥Reliable and Fast</Badge>
        <h1 className="text-5xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          AI-Powered <br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Clinical Decision Support Tool
          </span>
        </h1>

        <div className="mt-8 flex gap-4 justify-center">
          <Button
            className="text-2xl px-8 py-6 rounded-2xl"
            onClick={()=>router.push("/dashboard")}
          >
            Get Started
          </Button>
        </div>
      </main>
    </div>
  );
}
