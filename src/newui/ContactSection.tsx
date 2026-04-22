import React from 'react';
import { motion } from 'framer-motion';

const links = [
  { label: 'hana2001@snu.ac.kr', href: 'mailto:hana2001@snu.ac.kr' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/hana-oh-921945290/' },
  { label: 'GitHub', href: 'https://github.com/hanaisreal' },
];

const ContactSection: React.FC = () => (
  <footer className="ed-footer" id="contact">
    <motion.div
      className="ed-footer__inner"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="ed-footer__name">Hana Oh</div>

      <nav className="ed-footer__links" aria-label="Footer">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="ed-footer__link"
            target={l.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
          >
            {l.label}
          </a>
        ))}
      </nav>

      <span className="ed-footer__copy">
        © {new Date().getFullYear()} Hana Oh
      </span>
    </motion.div>
  </footer>
);

export default ContactSection;
