import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const defaultFeatures = [
  {
    id: 'fast-delivery',
    iconName: 'Zap',
    title: 'Fast Delivery',
    body: 'From cart to doorstep in under 90 minutes. We cover Colombo, Kandy, Galle, and beyond — rain or shine.',
  },
  {
    id: 'fresh-produce',
    iconName: 'Leaf',
    title: 'Farm-Fresh Produce',
    body: 'Sourced daily from trusted local farms across Sri Lanka. Every fruit, vegetable, and herb arrives at peak freshness.',
  },
  {
    id: 'easy-ordering',
    iconName: 'ShoppingCart',
    title: 'Easy Ordering',
    body: 'Place your weekly order in minutes via WhatsApp or our website. No app download required — simple as that.',
  },
  {
    id: 'customer-support',
    iconName: 'HeadphonesIcon',
    title: 'Dedicated Support',
    body: 'Our friendly team is available 7 days a week to help with substitutions, delivery updates, and anything in between.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: 'easeOut',
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function FeaturesGrid({ features }) {
  const items = features ?? defaultFeatures;

  return (
    <section
      className="relative w-full py-20 md:py-28 overflow-hidden"
      style={undefined}
    >
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#FEF9F6] via-[#FAF4EF] to-[#F3EDE7]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full bg-indigo-50 opacity-40 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full bg-amber-50 opacity-50 blur-2xl" />
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <motion.div
          className="text-center mb-14 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={headingVariants}
        >
          <span
            className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#FEA82F] mb-4 font-inter"
            data-imagine-id="featuresgrid-eyebrow"
          >
            Why Fresh Grocers
          </span>
          <h2
            className="font-playfair text-4xl md:text-5xl font-bold text-[#3B2798] leading-tight mb-4"
            data-imagine-id="featuresgrid-heading"
          >
            Sri Lanka's Grocery,{' '}
            <em className="not-italic text-[#FEA82F]">Delivered Right</em>
          </h2>
          <p
            className="font-inter text-base md:text-lg text-[#979188] max-w-xl mx-auto leading-relaxed"
            data-imagine-id="featuresgrid-subheading"
          >
            Over a decade of trusted service, bringing the best of Sri Lankan markets to your home.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
        >
          {items?.map((feature, idx) => {
            const RawIcon = Icons[feature?.iconName] || Icons['HelpCircle'];
            return (
              <motion.div
                key={feature?.id ?? idx}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  boxShadow: '0 16px 40px 0 rgba(59, 39, 152, 0.13)',
                  transition: { duration: 0.25, ease: 'easeOut' },
                }}
                className="group bg-[#FEF9F6] rounded-2xl p-8 flex flex-col gap-5 shadow-sm border border-[#EDE8E3] cursor-default"
                style={undefined}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-50 group-hover:bg-indigo-100 transition-colors duration-300"
                  aria-hidden="true"
                >
                  <RawIcon
                    className="text-[#3B2798] w-6 h-6"
                    strokeWidth={1.75}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h3
                    className="font-playfair text-lg font-bold text-[#3B2798] leading-snug"
                    data-imagine-id={`featuresgrid-card-${idx}-title`}
                  >
                    {feature?.title}
                  </h3>
                  <p
                    className="font-inter text-sm text-[#6B6560] leading-relaxed font-medium"
                    data-imagine-id={`featuresgrid-card-${idx}-body`}
                  >
                    {feature?.body}
                  </p>
                </div>

                <div
                  className="mt-auto pt-2 border-t border-[#EDE8E3] flex items-center gap-1.5 text-xs font-semibold text-[#3B2798] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                >
                  <span data-imagine-id={`featuresgrid-card-${idx}-learn-more`}>Learn more</span>
                  <span className="text-[#FEA82F]">&rarr;</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
