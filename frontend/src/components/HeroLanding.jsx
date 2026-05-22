import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import freshFruitsImg from '../assets/fresh_fruits_market_colorful.jpg';

const ArrowRight = Icons['ArrowRight'] || Icons['HelpCircle'];
const ShoppingBag = Icons['ShoppingBag'] || Icons['HelpCircle'];
const PlayCircle = Icons['PlayCircle'] || Icons['HelpCircle'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: 'easeOut',
    },
  },
};

function HeroLanding({ headline, subheadline, ctaText, onCTA }) {
  const displayHeadline = headline || 'Fresh From the Farm, Straight to Your Door';
  const displaySubheadline =
    subheadline ||
    'Sri Lanka\'s most trusted grocery delivery service. Premium produce, local favorites, and everyday essentials — delivered fresh to your home.';
  const displayCta = ctaText || 'Get Started';

  const handleCTA = () => {
    if (typeof onCTA === 'function') {
      onCTA();
    } else {
      const target = document.getElementById('how-it-works');
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearnMore = () => {
    const target = document.getElementById('how-it-works');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
      style={undefined}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FEF9F6] via-[#FDF4EE] to-[#F5EDE3] -z-10" />

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full bg-indigo-100/40 blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-[420px] h-[420px] rounded-full bg-amber-100/50 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-orange-50/30 blur-3xl" />
      </div>

      <motion.div
        className="absolute inset-0 -z-10 opacity-[0.06]"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 0.06, scale: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
      >
        <img
          src={freshFruitsImg}
          alt="Fresh produce background"
          data-imagine-id="herolanding-bg-image"
          className="w-full h-full object-cover object-center"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </motion.div>

      <div className="relative w-full max-w-[1240px] mx-auto px-6 md:px-10 lg:px-16 py-[60px]">
        <motion.div
          className="flex flex-col items-center text-center gap-6 md:gap-7"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <span
              data-imagine-id="herolanding-badge"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium font-inter tracking-wide"
            >
              <ShoppingBag size={14} />
              Delivering Across Sri Lanka Since 2012
            </span>
          </motion.div>

          <motion.h1
            data-imagine-id="herolanding-headline"
            variants={itemVariants}
            className="font-playfair font-bold text-3xl md:text-5xl lg:text-6xl text-indigo-700 leading-tight max-w-3xl"
          >
            {displayHeadline}
          </motion.h1>

          <motion.p
            data-imagine-id="herolanding-subheadline"
            variants={itemVariants}
            className="font-inter text-base md:text-lg text-[#979188] leading-relaxed max-w-xl"
          >
            {displaySubheadline}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-2"
          >
            <motion.button
              data-imagine-id="herolanding-cta-primary"
              onClick={handleCTA}
              className="inline-flex items-center gap-2 bg-[#3B2798] text-white font-inter font-semibold text-base px-8 py-4 rounded-xl shadow-lg cursor-pointer border-0 outline-none"
              whileHover={{ scale: 1.045, boxShadow: '0 12px 32px rgba(59,39,152,0.28)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {displayCta}
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              data-imagine-id="herolanding-cta-secondary"
              onClick={handleLearnMore}
              className="inline-flex items-center gap-2 bg-transparent text-[#3B2798] font-inter font-medium text-base px-8 py-4 rounded-xl border border-indigo-200 cursor-pointer outline-none hover:border-indigo-400 hover:bg-indigo-50/60 transition-colors duration-200"
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <PlayCircle size={18} />
              How It Works
            </motion.button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-6 mt-4 pt-6 border-t border-[#EAE3DC] w-full max-w-md"
          >
            <div className="flex flex-col items-center">
              <span
                data-imagine-id="herolanding-stat-orders"
                className="font-playfair font-bold text-2xl text-indigo-700"
              >
                50,000+
              </span>
              <span
                data-imagine-id="herolanding-stat-orders-label"
                className="font-inter text-xs text-[#979188] mt-0.5 tracking-wide uppercase"
              >
                Orders Delivered
              </span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-[#EAE3DC]" />
            <div className="flex flex-col items-center">
              <span
                data-imagine-id="herolanding-stat-cities"
                className="font-playfair font-bold text-2xl text-indigo-700"
              >
                12 Cities
              </span>
              <span
                data-imagine-id="herolanding-stat-cities-label"
                className="font-inter text-xs text-[#979188] mt-0.5 tracking-wide uppercase"
              >
                Across Sri Lanka
              </span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-[#EAE3DC]" />
            <div className="flex flex-col items-center">
              <span
                data-imagine-id="herolanding-stat-rating"
                className="font-playfair font-bold text-2xl text-indigo-700"
              >
                4.9 ★
              </span>
              <span
                data-imagine-id="herolanding-stat-rating-label"
                className="font-inter text-xs text-[#979188] mt-0.5 tracking-wide uppercase"
              >
                Customer Rating
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroLanding;
