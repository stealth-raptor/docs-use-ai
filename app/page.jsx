'use client';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function Home() {
  const router = useRouter();

  const features = [
    { title: "Smart Diagnostics", description: "AI-powered symptom analysis for accurate diagnoses" },
    { title: "Quick Reports", description: "Generate detailed medical reports in seconds" },
    { title: "Patient History", description: "Secure storage and easy access to patient records" },
    { title: "24/7 Support", description: "Round-the-clock assistance for healthcare providers" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-background">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50  backdrop-blur-sm border-b-2">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cursor-pointer">
              DoC.AI
            </h2>
          </a>
          <Button variant="" className="bg-primary"onClick={() => router.push("/dashboard")}>
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <Badge variant="outline" className="bg-accent/30 border-primary mb-4 px-4 py-1.5 text-sm font-medium">
            Trusted by 1000+ Healthcare Providers
          </Badge>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6">
            AI-Powered <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Clinical Decision Support
            </span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Enhance your medical practice with advanced AI technology. Make faster, 
            more accurate diagnoses and provide better patient care.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8"
              onClick={() => router.push("/dashboard")}
            >
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" onClick={() => router.push("/about")}>
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need for modern healthcare
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CheckCircle className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Ready to transform your practice?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of healthcare providers who are already using DoC.AI
              to improve patient outcomes.
            </p>
            <Button
              size="lg"
              className="text-lg px-8"
              onClick={() => router.push("/dashboard")}
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}