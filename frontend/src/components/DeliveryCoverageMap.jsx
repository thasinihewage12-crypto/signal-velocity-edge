import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import * as Icons from 'lucide-react';

const MapPin = Icons['MapPin'] || Icons['HelpCircle'];
const CheckCircle = Icons['CheckCircle'] || Icons['HelpCircle'];

const SRI_LANKA_PATH = `M 148 10 C 152 12 158 16 162 22 C 168 30 170 40 168 52 C 166 62 160 70 158 80 C 156 90 158 100 155 110 C 152 120 146 128 142 138 C 138 148 136 160 130 170 C 124 180 116 188 110 198 C 104 208 100 220 92 228 C 86 234 78 238 72 244 C 66 250 62 258 56 262 C 50 266 42 266 36 262 C 30 258 26 250 24 242 C 22 234 24 224 26 216 C 28 208 32 200 32 192 C 32 184 28 176 28 168 C 28 160 32 152 34 144 C 36 136 36 128 38 120 C 40 112 44 104 48 96 C 52 88 58 82 62 74 C 66 66 68 56 72 48 C 76 40 82 34 88 28 C 94 22 102 18 110 14 C 118 10 126 8 134 8 C 140 8 144 9 148 10 Z`;

const CITY_MARKERS = [
  { id: 'colombo', name: 'Colombo', cx: 52, cy: 128, primary: true },
  { id: 'kandy', name: 'Kandy', cx: 88, cy: 100 },
  { id: 'galle', name: 'Galle', cx: 52, cy: 220 },
  { id: 'jaffna', name: 'Jaffna', cx: 100, cy: 22 },
  { id: 'negombo', name: 'Negombo', cx: 46, cy: 114 },
  { id: 'trincomalee', name: 'Trincomalee', cx: 128, cy: 72 },
  { id: 'batticaloa', name: 'Batticaloa', cx: 140, cy: 130 },
  { id: 'anuradhapura', name: 'Anuradhapura', cx: 86, cy: 62 },
  { id: 'matara', name: 'Matara', cx: 68, cy: 238 },
  { id: 'ratnapura', name: 'Ratnapura', cx: 72, cy: 170 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const mapVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

export default function DeliveryCoverageMap({ areas }) {
  const [hoveredCity, setHoveredCity] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const cityList = areas?.length > 0 ? areas : CITY_MARKERS.map((c) => c.name);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 md:py-28"
      aria-labelledby="coverage-heading"
      style={{}}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FEF9F6] via-[#FDF3EA] to-[#F5EEE8]" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-indigo-50/60 blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-amber-50/50 blur-2xl translate-y-1/3 -translate-x-1/4" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-14 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#3B2798]/40" />
            <span
              data-imagine-id="deliverycoveragemap-eyebrow"
              className="text-xs font-inter font-semibold tracking-[0.18em] uppercase text-[#3B2798]/70"
            >
              Service Coverage
            </span>
          </div>
          <h2
            id="coverage-heading"
            data-imagine-id="deliverycoveragemap-heading"
            className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a2e] leading-tight"
          >
            We Deliver Across Sri Lanka
          </h2>
          <p
            data-imagine-id="deliverycoveragemap-subheading"
            className="mt-4 font-inter text-[#979188] text-base md:text-lg max-w-xl leading-relaxed"
          >
            From the bustling streets of Colombo to the highlands of Kandy — fresh groceries reach your door, wherever you are.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-start gap-12 md:gap-16 lg:gap-20">
          <motion.div
            variants={mapVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="w-full md:w-[300px] flex-shrink-0 flex justify-center"
            aria-label="Map of Sri Lanka showing delivery coverage areas"
          >
            <div className="relative w-full max-w-[280px] md:w-[300px]">
              <div className="absolute inset-0 rounded-3xl bg-white/60 backdrop-blur-sm shadow-lg border border-white/80" />
              <div className="relative p-6">
                <svg
                  viewBox="0 0 190 280"
                  className="w-full h-auto"
                  aria-hidden="true"
                  role="img"
                >
                  <defs>
                    <linearGradient id="srilankaFill" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#EDE8FF" />
                      <stop offset="100%" stopColor="#D6CCFF" />
                    </linearGradient>
                    <filter id="pinShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#3B2798" floodOpacity="0.25" />
                    </filter>
                  </defs>

                  <path
                    d={SRI_LANKA_PATH}
                    fill="url(#srilankaFill)"
                    stroke="#3B2798"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />

                  {CITY_MARKERS.map((city) => (
                    <g
                      key={city.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`${city.name} delivery zone`}
                      onMouseEnter={() => setHoveredCity(city.id)}
                      onMouseLeave={() => setHoveredCity(null)}
                      onFocus={() => setHoveredCity(city.id)}
                      onBlur={() => setHoveredCity(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      <circle
                        cx={city.cx}
                        cy={city.cy}
                        r={hoveredCity === city.id ? 8 : city.primary ? 7 : 5}
                        fill={city.primary ? '#3B2798' : hoveredCity === city.id ? '#3B2798' : '#6355C7'}
                        opacity={hoveredCity === city.id ? 1 : 0.85}
                        filter="url(#pinShadow)"
                        style={{ transition: 'all 0.2s ease' }}
                      />
                      <circle
                        cx={city.cx}
                        cy={city.cy}
                        r={city.primary ? 3 : 2}
                        fill="white"
                      />
                      {(hoveredCity === city.id || city.primary) && (
                        <text
                          x={city.cx + 10}
                          y={city.cy + 4}
                          fontSize="8"
                          fontFamily="Inter, sans-serif"
                          fontWeight={city.primary ? '700' : '500'}
                          fill="#1a1a2e"
                        >
                          {city.name}
                        </text>
                      )}
                    </g>
                  ))}
                </svg>

                <div className="mt-4 flex items-center gap-2 px-2">
                  <div className="w-3 h-3 rounded-full bg-[#3B2798]" />
                  <span
                    data-imagine-id="deliverycoveragemap-map-legend"
                    className="font-inter text-xs text-[#979188]"
                  >
                    Active delivery zones
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex-1 w-full">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <motion.div variants={itemVariants} className="mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-[#3B2798] w-5 h-5" aria-hidden="true" />
                  <span
                    data-imagine-id="deliverycoveragemap-city-count"
                    className="font-inter text-sm font-semibold text-[#1a1a2e]"
                  >
                    {cityList?.length || 0} cities &amp; districts covered
                  </span>
                </div>
              </motion.div>

              <div
                className="flex flex-wrap gap-[14px]"
                role="list"
                aria-label="Cities with delivery coverage"
              >
                {cityList?.map((city, idx) => (
                  <motion.div
                    key={typeof city === 'string' ? city : (city?.name || idx)}
                    variants={itemVariants}
                    role="listitem"
                    whileHover={{ scale: 1.04, y: -2 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                  >
                    <span
                      data-imagine-id={`deliverycoveragemap-city-tag-${idx}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#3B2798]/15 shadow-sm font-inter text-sm font-medium text-[#3B2798] hover:bg-[#3B2798] hover:text-white hover:border-[#3B2798] transition-colors duration-200 cursor-default select-none"
                    >
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                      {typeof city === 'string' ? city : (city?.name || '')}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={itemVariants}
                className="mt-10 p-6 rounded-2xl bg-white/70 border border-[#3B2798]/10 shadow-sm"
              >
                <p
                  data-imagine-id="deliverycoveragemap-note"
                  className="font-inter text-sm text-[#979188] leading-relaxed"
                >
                  Don&apos;t see your city?{' '}
                  <a
                    href="#order"
                    data-imagine-id="deliverycoveragemap-note-link"
                    className="font-semibold text-[#3B2798] underline underline-offset-2 hover:text-[#FEA82F] transition-colors duration-200"
                  >
                    Contact us
                  </a>{' '}
                  — we&apos;re expanding rapidly across Sri Lanka.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}