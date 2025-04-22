import HeroSection from "@/components/home/HeroSection"
// import FeaturesSection from "@/components/home/FeaturesSection"
import CallToAction from "@/components/home/CallToAction"

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white dark:bg-black">
      <HeroSection 
        backgroundImage="/images/study-background.jpg"
        title="Ace Your Exams with Confidence"
        subtitle="Experience seamless online testing with instant results and comprehensive performance analysis. Join thousands of students preparing smarter."
        linkHref="/exams"
        linkText="Start Your Assessment"
      />
      {/* <div className="w-full max-w-5xl px-4 md:px-0 py-16">
        <CallToAction />
      </div> */}
    </div>
  )
}
