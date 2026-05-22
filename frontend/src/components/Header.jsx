import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';

const MenuIcon = Icons['Menu'] || Icons['HelpCircle'];
const XIcon = Icons['X'] || Icons['HelpCircle'];
const ShoppingBagIcon = Icons['ShoppingBag'] || Icons['HelpCircle'];

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Delivery', href: '#delivery' },
  { label: 'Coverage', href: '#coverage' },
  { label: 'Reviews', href: '#reviews' },
];

export default function Header({ onOrderClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleOrderClick() {
    if (typeof onOrderClick === 'function') {
      onOrderClick();
    } else {
      window.location.href = 'tel:+94112345678';
    }
  }

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#FEF9F6] border-b border-[#EDE8E3]"
    >
      <div className="max-w-screen-xl mx-auto px-8 py-5 flex items-center justify-between">

        <a
          href="#home"
          className="flex items-center gap-2 no-underline"
          aria-label="Fresh Grocers home"
        >
          <ShoppingBagIcon className="w-5 h-5 text-[#3B2798]" strokeWidth={2} />
          <span
            data-imagine-id="header-logo-text"
            className="font-playfair text-xl font-bold tracking-tight text-[#2D2926] leading-none select-none"
          >
            Fresh
            <span className="text-[#3B2798] ml-1">Grocers</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          {NAV_LINKS.map((link, idx) => (
            <motion.a
              key={link.label}
              href={link?.href}
              data-imagine-id={`header-nav-link-${idx}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.07, duration: 0.38, ease: 'easeOut' }}
              whileHover={{ y: -1 }}
              className="font-inter text-sm font-medium text-[#6B6560] hover:text-[#2D2926] transition-colors duration-200 no-underline tracking-wide"
            >
              {link?.label}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <motion.button
            onClick={handleOrderClick}
            data-imagine-id="header-cta-button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 340, damping: 22 }}
            className="hidden md:inline-flex items-center gap-2 bg-[#3B2798] text-white text-sm font-inter font-semibold px-6 py-3 rounded-full shadow-sm hover:bg-[#2e1f78] transition-colors duration-200 cursor-pointer"
            aria-label="Order Now"
          >
            <ShoppingBagIcon className="w-4 h-4" strokeWidth={2} />
            <span data-imagine-id="header-cta-label">Order Now</span>
          </motion.button>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-[#2D2926] hover:bg-[#F0EBE6] transition-colors duration-200 cursor-pointer"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <XIcon className="w-5 h-5" strokeWidth={2} />
            ) : (
              <MenuIcon className="w-5 h-5" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-[#FEF9F6] border-t border-[#EDE8E3]"
          >
            <nav className="flex flex-col px-8 py-6 gap-5" aria-label="Mobile navigation">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link?.href}
                  data-imagine-id={`header-mobile-nav-link-${idx}`}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.28, ease: 'easeOut' }}
                  onClick={() => setMobileOpen(false)}
                  className="font-inter text-base font-medium text-[#2D2926] hover:text-[#3B2798] transition-colors duration-200 no-underline"
                >
                  {link?.label}
                </motion.a>
              ))}
              <motion.button
                onClick={() => { setMobileOpen(false); handleOrderClick(); }}
                data-imagine-id="header-mobile-cta-button"
                whileTap={{ scale: 0.97 }}
                className="mt-2 inline-flex items-center justify-center gap-2 bg-[#3B2798] text-white text-sm font-inter font-semibold px-6 py-3 rounded-full shadow-sm hover:bg-[#2e1f78] transition-colors duration-200 cursor-pointer w-full"
                aria-label="Order Now"
              >
                <ShoppingBagIcon className="w-4 h-4" strokeWidth={2} />
                <span data-imagine-id="header-mobile-cta-label">Order Now</span>
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}