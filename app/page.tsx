import { SiteHeader } from '@/app/components/layout/site-header';
import { SiteFooter } from '@/app/components/layout/site-footer';
import { HeroIntro } from '@/app/components/home/hero-intro';
import { HowItWorks } from '@/app/components/home/how-it-works';
import { PracticalGuide } from '@/app/components/home/practical-guide';
import { FrequentlyAskedQuestions } from '@/app/components/home/frequently-asked-questions';
import { RescisaoCalculator } from '@/app/components/calculator/rescisao-calculator';

export default function Home() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <HeroIntro />
          <RescisaoCalculator />
        </section>
        <HowItWorks />
        <PracticalGuide />
        <FrequentlyAskedQuestions />
      </main>
      <SiteFooter />
    </div>
  );
}
