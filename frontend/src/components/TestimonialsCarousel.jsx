import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const FALLBACK_TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Ratnayake',
    city: 'Colombo',
    review: 'Fresh Grocers has completely changed how I shop. The produce arrives crisp and fragrant — just like picking it from the market myself. Truly remarkable service.',
    rating: 5,
    color: '#3B2798',
  },
  {
    id: 2,
    name: 'Chaminda Silva',
    city: 'Kandy',
    review: 'I was skeptical at first, but the quality blew me away. Vegetables are always fresh, deliveries are on time, and the team is incredibly helpful. Highly recommend.',
    rating: 5,
    color: '#FEA82F',
  },
  {
    id: 3,
    name: 'Anusha Perera',
    city: 'Galle',
    review: 'As a busy mother of three, Fresh Grocers is a lifesaver. The app is simple, the prices are fair, and I never worry about freshness. Five stars without hesitation.',
    rating: 5,
    color: '#3B8A78',
  },
  {
    id: 4,
    name: 'Roshan Fernando',
    city: 'Negombo',
    review: 'Order arrived within the hour — perfectly packed, nothing bruised. The customer support team even followed up to confirm I was happy. That level of care is rare.',
    rating: 4,
    color: '#9B4E97',
  },
  {
    id: 5,
    name: 'Dilani Wickrama',
    city: 'Matara',
    review: 'Reliable, affordable, and genuinely fresh. I have been using Fresh Grocers for over two years and the consistency is what keeps me coming back every single week.',
    rating: 5,
    color: '#C0533A',
  },
];

function StarRating({ rating }) {
  const StarFull = Icons['Star'] || Icons['HelpCircle'];
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarFull
          key={i}
          size={16}
          className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 fill-gray-200'}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function Monogram({ name, color }) {
  const initials = name
    ?.split(' ')
    ?.slice(0, 2)
    ?.map((n) => n?.[0]?.toUpperCase())
    ?.join('') || '?';
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-base font-inter select-none"
      style={{ backgroundColor: color }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

function TestimonialCard({ testimonial, index }) {
  const QuoteIcon = Icons['Quote'] || Icons['HelpCircle'];
  return (
    <motion.div
      key={testimonial?.id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.08 }}
      className="bg-white rounded-2xl shadow-md border border-stone-100 p-8 flex flex-col gap-5 h-full"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Monogram name={testimonial?.name} color={testimonial?.color} />
          <div className="flex flex-col">
            <span
              data-imagine-id={`testimonialscarousel-name-${testimonial?.id}`}
              className="font-bold text-indigo-900 text-sm font-inter leading-tight"
            >
              {testimonial?.name}
            </span>
            <span
              data-imagine-id={`testimonialscarousel-city-${testimonial?.id}`}
              className="text-xs text-stone-400 font-inter mt-0.5"
            >
              {testimonial?.city}, Sri Lanka
            </span>
          </div>
        </div>
        <QuoteIcon size={28} className="text-indigo-100 fill-indigo-100 flex-shrink-0 mt-1" aria-hidden="true" />
      </div>

      <blockquote
        data-imagine-id={`testimonialscarousel-review-${testimonial?.id}`}
        className="italic text-stone-700 text-sm leading-relaxed font-playfair flex-1"
      >
        &ldquo;{testimonial?.review}&rdquo;
      </blockquote>

      <StarRating rating={testimonial?.rating} />
    </motion.div>
  );
}

export default function TestimonialsCarousel({ testimonials }) {
  const ChevronLeft = Icons['ChevronLeft'] || Icons['HelpCircle'];
  const ChevronRight = Icons['ChevronRight'] || Icons['HelpCircle'];

  const data = testimonials?.length ? testimonials : FALLBACK_TESTIMONIALS;

  const [page, setPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const getCardsPerPage = useCallback(() => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }, []);

  const [cardsPerPage, setCardsPerPage] = useState(getCardsPerPage);

  useEffect(() => {
    const handleResize = () => setCardsPerPage(getCardsPerPage());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getCardsPerPage]);

  const totalPages = Math.ceil((data?.length || 0) / cardsPerPage);

  const goNext = useCallback(() => {
    setPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const goPrev = useCallback(() => {
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  useEffect(() => {
    if (isPaused) {
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(goNext, 6000);
    return () => clearInterval(intervalRef.current);
  }, [isPaused, goNext]);

  const visibleCards = data?.slice(page * cardsPerPage, page * cardsPerPage + cardsPerPage) || [];

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    },
    [goPrev, goNext]
  );

  return (
    <section
      className="w-full bg-[#FEF9F6] py-20 md:py-28 px-4 relative overflow-hidden"
      aria-label="Customer Testimonials"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 80% 10%, rgba(59,39,152,0.05) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 10% 90%, rgba(254,168,47,0.07) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <p
            data-imagine-id="testimonialscarousel-eyebrow"
            className="text-xs font-semibold uppercase tracking-widest text-amber-500 font-inter mb-3"
          >
            What Our Customers Say
          </p>
          <h2
            data-imagine-id="testimonialscarousel-heading"
            className="text-3xl md:text-4xl font-playfair font-bold text-indigo-950 leading-tight"
          >
            Trusted by Thousands Across Sri Lanka
          </h2>
          <p
            data-imagine-id="testimonialscarousel-subheading"
            className="mt-4 text-stone-500 font-inter text-sm md:text-base max-w-xl mx-auto"
          >
            Real voices. Real freshness. Real satisfaction — delivered to doorsteps island-wide.
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              className={`grid gap-6 ${
                cardsPerPage === 1
                  ? 'grid-cols-1'
                  : cardsPerPage === 2
                  ? 'grid-cols-2'
                  : 'grid-cols-3'
              }`}
            >
              {visibleCards.map((t, idx) => (
                <TestimonialCard key={t?.id} testimonial={t} index={idx} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={goPrev}
            aria-label="Previous testimonials"
            className="w-10 h-10 rounded-full border border-indigo-200 bg-white flex items-center justify-center text-indigo-700 hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-200 shadow-sm"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial pages">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === page}
                aria-label={`Go to page ${i + 1}`}
                onClick={() => setPage(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === page
                    ? 'bg-indigo-700 w-6 h-2.5'
                    : 'bg-indigo-200 hover:bg-indigo-400 w-2.5 h-2.5'
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            aria-label="Next testimonials"
            className="w-10 h-10 rounded-full border border-indigo-200 bg-white flex items-center justify-center text-indigo-700 hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-200 shadow-sm"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
