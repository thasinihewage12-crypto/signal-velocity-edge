import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

const MapPinIcon = Icons['MapPin'] || Icons['HelpCircle'];
const PhoneIcon = Icons['Phone'] || Icons['HelpCircle'];
const MailIcon = Icons['Mail'] || Icons['HelpCircle'];
const ExternalLinkIcon = Icons['ExternalLink'] || Icons['HelpCircle'];
const FacebookIcon = Icons['Facebook'] || Icons['HelpCircle'];
const InstagramIcon = Icons['Instagram'] || Icons['HelpCircle'];
const TwitterIcon = Icons['Twitter'] || Icons['HelpCircle'];

const socialLinks = [
  { name: 'Facebook', Icon: FacebookIcon, href: '#' },
  { name: 'Instagram', Icon: InstagramIcon, href: '#' },
  { name: 'Twitter', Icon: TwitterIcon, href: '#' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
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

export default function Footer() {
  return (
    <footer className="bg-[#FEF9F6] border-t border-indigo-50">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 pt-12 pb-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <span
              data-imagine-id="footer-logo"
              className="font-playfair text-2xl font-bold tracking-tight text-[#3B2798] leading-tight"
            >
              Fresh Grocers
            </span>
            <p
              data-imagine-id="footer-tagline"
              className="text-sm font-inter text-[#979188] leading-relaxed max-w-xs"
            >
              Sri Lanka&rsquo;s trusted grocery delivery, bringing farm-fresh goodness to your doorstep since 2008.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h3
              data-imagine-id="footer-contact-heading"
              className="font-playfair text-base font-semibold text-gray-800 tracking-wide"
            >
              Contact Us
            </h3>
            <div className="flex items-start gap-3">
              <MapPinIcon size={16} className="text-[#979188] mt-0.5 shrink-0" />
              <p
                data-imagine-id="footer-address"
                className="text-sm font-inter text-[#979188] leading-relaxed"
              >
                42 Galle Road, Colombo 03,<br />Sri Lanka
              </p>
            </div>
            <div className="flex items-center gap-3">
              <PhoneIcon size={16} className="text-[#979188] shrink-0" />
              <motion.a
                href="tel:+94112345678"
                data-imagine-id="footer-phone"
                className="text-sm font-inter text-[#979188] hover:text-[#3B2798] transition-colors duration-200"
                whileHover={{ x: 2 }}
              >
                +94 11 234 5678
              </motion.a>
            </div>
            <div className="flex items-center gap-3">
              <MailIcon size={16} className="text-[#979188] shrink-0" />
              <motion.a
                href="mailto:hello@freshgrocers.lk"
                data-imagine-id="footer-email"
                className="text-sm font-inter text-[#979188] hover:text-[#3B2798] transition-colors duration-200"
                whileHover={{ x: 2 }}
              >
                hello@freshgrocers.lk
              </motion.a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h3
              data-imagine-id="footer-follow-heading"
              className="font-playfair text-base font-semibold text-gray-800 tracking-wide"
            >
              Follow Us
            </h3>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ name, Icon: SocialIcon, href }) => (
                <motion.a
                  key={name}
                  href={href}
                  aria-label={name}
                  data-imagine-id={`footer-social-${name.toLowerCase()}`}
                  className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-[#3B2798] hover:bg-[#3B2798] hover:text-white transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SocialIcon size={16} />
                </motion.a>
              ))}
            </div>
            <div className="flex flex-col gap-2 mt-1">
              <motion.a
                href="/privacy"
                data-imagine-id="footer-privacy-link"
                className="inline-flex items-center gap-1 text-sm font-inter text-[#979188] hover:text-[#3B2798] transition-colors duration-200 w-fit"
                whileHover={{ x: 2 }}
              >
                Privacy Policy
                <ExternalLinkIcon size={12} />
              </motion.a>
              <motion.a
                href="/terms"
                data-imagine-id="footer-terms-link"
                className="inline-flex items-center gap-1 text-sm font-inter text-[#979188] hover:text-[#3B2798] transition-colors duration-200 w-fit"
                whileHover={{ x: 2 }}
              >
                Terms of Service
                <ExternalLinkIcon size={12} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-10 pt-5 border-t border-indigo-50 flex flex-col sm:flex-row items-center justify-between gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
        >
          <p
            data-imagine-id="footer-copyright"
            className="text-xs font-inter text-[#979188] text-center sm:text-left"
          >
            &copy; {new Date().getFullYear()} Fresh Grocers (Pvt) Ltd. All rights reserved.
          </p>
          <p
            data-imagine-id="footer-tagline-short"
            className="text-xs font-inter text-[#979188] text-center sm:text-right"
          >
            Delivering freshness across Sri Lanka.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
