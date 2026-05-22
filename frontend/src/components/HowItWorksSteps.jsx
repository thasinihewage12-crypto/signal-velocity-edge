import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import * as Icons from 'lucide-react';

const DEFAULT_STEPS = [
  {
    id: 1,
    title: 'Browse Fresh Produce',
    description: 'Explore our curated selection of locally-sourced fruits, vegetables, and pantry essentials — all quality-checked and ready to order.',
    icon: 'Leaf',
  },
  {
    id: 2,
    title: 'Place Your Order',
    description: 'Add items to your basket and check out in seconds. We accept cash on delivery and all major digital payment methods.',
    icon: 'ShoppingBasket',
  },
  {
    id: 3,
    title: 'Get Fast Delivery',
    description: 'Sit back while our riders bring your groceries straight to your door — fresh, on time, and packed with care.',
    icon: 'Bike',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const connectorVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
      delay: 0.3,
    },
  },
};

export default function HowItWorksSteps({ steps }) {
  const resolvedSteps = steps ?? DEFAULT_STEPS;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FEF9F6] py-20 px-4 md:px-8 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-indigo-50/60 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <span
            data-imagine-id="howitworkssteps-label"
            className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-indigo-500 font-inter mb-3"
          >
            Simple &amp; Seamless
          </span>
          <h2
            data-imagine-id="howitworkssteps-heading"
            className="font-playfair text-3xl md:text-4xl lg:text-5xl text-[#1a1614] leading-tight tracking-tight"
          >
            How It Works
          </h2>
          <p
            data-imagine-id="howitworkssteps-subheading"
            className="mt-4 text-[#979188] font-inter text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          >
            From your first browse to your doorstep — fresh groceries in three easy steps.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative flex flex-col md:flex-row items-stretch gap-0"
        >
          {resolvedSteps?.map((step, idx) => {
            const IconComponent = Icons[step?.icon] || Icons['HelpCircle'];
            const isLast = idx === resolvedSteps.length - 1;

            return (
              <div key={step?.id ?? idx} className="relative flex flex-col md:flex-row flex-1">
                <motion.div
                  variants={itemVariants}
                  className="group flex-1 flex flex-col bg-white border border-[#f0ece6] rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8 md:p-10 mx-0 md:mx-2 my-3 md:my-0"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                        <span
                          data-imagine-id={`howitworkssteps-step-${idx}-number`}
                          className="font-playfair text-white text-lg font-bold leading-none"
                        >
                          {step?.id ?? idx + 1}
                        </span>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                      <IconComponent
                        size={20}
                        strokeWidth={1.8}
                        className="text-indigo-600"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  <h3
                    data-imagine-id={`howitworkssteps-step-${idx}-title`}
                    className="font-playfair text-xl md:text-2xl font-bold text-indigo-700 mb-3 leading-snug"
                  >
                    {step?.title}
                  </h3>
                  <p
                    data-imagine-id={`howitworkssteps-step-${idx}-description`}
                    className="font-inter text-sm text-[#6b6560] leading-relaxed flex-1"
                  >
                    {step?.description}
                  </p>

                  <div className="mt-6 h-0.5 w-10 bg-indigo-200 rounded-full group-hover:w-16 group-hover:bg-indigo-400 transition-all duration-500" />
                </motion.div>

                {!isLast && (
                  <div className="hidden md:flex items-center justify-center z-10 relative -mx-3">
                    <motion.div
                      variants={connectorVariants}
                      className="flex flex-col items-center justify-center"
                      style={{ originX: 0 }}
                    >
                      <div className="w-8 h-px bg-gradient-to-r from-indigo-300 to-indigo-500 rounded-full" />
                      <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-t-transparent border-b-transparent border-l-indigo-400 mt-px -mr-1" />
                    </motion.div>
                  </div>
                )}

                {!isLast && (
                  <div className="flex md:hidden items-center justify-start pl-[2.75rem] py-1">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-px h-6 bg-gradient-to-b from-indigo-300 to-indigo-400 rounded-full" />
                      <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-indigo-400" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
