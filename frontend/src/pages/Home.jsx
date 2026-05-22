import { useState, useEffect, lazy, Suspense } from 'react';
import Header from '../components/Header';
import HeroLanding from '../components/HeroLanding';
import FeaturesGrid from '../components/FeaturesGrid';
import HowItWorksSteps from '../components/HowItWorksSteps';
import DeliveryCoverageMap from '../components/DeliveryCoverageMap';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import Footer from '../components/Footer';

const FALLBACK_AREAS = [
  { id: 1, city: 'Colombo', region: 'Western' },
  { id: 2, city: 'Kandy', region: 'Central' },
  { id: 3, city: 'Galle', region: 'Southern' },
  { id: 4, city: 'Negombo', region: 'Western' },
  { id: 5, city: 'Jaffna', region: 'Northern' },
];

const FALLBACK_TESTIMONIALS = [
  { id: 1, customer_name: 'Priya Ratnayake', city: 'Colombo', review: 'Fresh Grocers has completely changed how I shop. The produce arrives crisp and fragrant every time.', rating: 5 },
  { id: 2, customer_name: 'Chaminda Silva', city: 'Kandy', review: 'Vegetables are always fresh, deliveries are on time, and the team is incredibly helpful.', rating: 5 },
  { id: 3, customer_name: 'Anusha Perera', city: 'Galle', review: 'As a busy mother of three, Fresh Grocers is a lifesaver. Five stars without hesitation.', rating: 5 },
];

const CARD_COLORS = ['#3B2798', '#FEA82F', '#3B8A78', '#9B4E97', '#C0533A'];

function normalizeTestimonials(raw) {
  return raw?.map((t, i) => ({
    id: t?.id ?? i,
    name: t?.customer_name ?? '',
    city: t?.city ?? '',
    review: t?.review ?? '',
    rating: t?.rating ?? 5,
    color: CARD_COLORS[i % CARD_COLORS.length],
  }));
}

function normalizeAreas(raw) {
  return raw?.map((a) => a?.city ?? '')?.filter(Boolean);
}

export default function Home() {
  const [testimonials, setTestimonials] = useState(normalizeTestimonials(FALLBACK_TESTIMONIALS));
  const [areas, setAreas] = useState(normalizeAreas(FALLBACK_AREAS));
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);
  const [loadingAreas, setLoadingAreas] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        await new Promise((res) => setTimeout(res, 800));
        const res = await fetch('/api/testimonials', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ page: 1, page_size: 9 }),
        });
        if (!res.ok) throw new Error('fetch failed');
        const data = await res.json();
        if (data?.testimonials?.length) {
          setTestimonials(normalizeTestimonials(data.testimonials));
        }
      } catch {
        setTestimonials(normalizeTestimonials(FALLBACK_TESTIMONIALS));
      } finally {
        setLoadingTestimonials(false);
      }
    }
    fetchTestimonials();
  }, []);

  useEffect(() => {
    async function fetchAreas() {
      try {
        await new Promise((res) => setTimeout(res, 600));
        const res = await fetch('/api/delivery-areas', { method: 'GET' });
        if (!res.ok) throw new Error('fetch failed');
        const data = await res.json();
        if (data?.areas?.length) {
          setAreas(normalizeAreas(data.areas));
        }
      } catch {
        setAreas(normalizeAreas(FALLBACK_AREAS));
      } finally {
        setLoadingAreas(false);
      }
    }
    fetchAreas();
  }, []);

  function handleOrder() {
    window.location.href = 'tel:+94112345678';
  }

  return (
    <div className="min-h-screen bg-[#FEF9F6] flex flex-col">
      <Header onOrderClick={handleOrder} />
      <main className="flex-1 flex flex-col pt-[72px]">
        <section id="home">
          <HeroLanding onCTA={handleOrder} />
        </section>
        <section id="features">
          <FeaturesGrid />
        </section>
        <section id="how-it-works">
          <HowItWorksSteps />
        </section>
        <section id="coverage">
          <DeliveryCoverageMap areas={loadingAreas ? normalizeAreas(FALLBACK_AREAS) : areas} />
        </section>
        <section id="reviews">
          <TestimonialsCarousel testimonials={loadingTestimonials ? normalizeTestimonials(FALLBACK_TESTIMONIALS) : testimonials} />
        </section>
      </main>
      <Footer />
    </div>
  );
}
