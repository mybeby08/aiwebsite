import {
  LandingNavbar,
  LandingHero,
  LandingContent,
} from "@/components/landing";

const LandingPage = () => {
  return (
    <div className="h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  );
};

export default LandingPage;
