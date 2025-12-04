import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const contactLinks = [
  {
    label: 'Email',
    href: 'mailto:hana2001@snu.ac.kr',
    icon: <HiOutlineMail />,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/hana-oh-921945290/',
    icon: <FaLinkedin />,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/hanaisreal',
    icon: <FaGithub />,
  },
];

const ContactSection: React.FC = () => (
  <motion.section
    id="contact"
    className="hana-section hana-section--white contact"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.75, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.3 }}
  >
    <div className="section-inner contact__inner">
      <motion.span
        className="section-eyebrow text-themeMint"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.5, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.4 }}
      >
        Contact
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.65, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.4 }}
      >
        Get in touch
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.4 }}
      >
        I'm always open to discussing research collaborations, HCI projects, or opportunities in human-centered computing and AI.
      </motion.p>
      <motion.div
        className="contact__links"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.35,
            },
          },
        }}
      >
        {contactLinks.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            className="contact__link hana-card-hover"
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="contact__link-icon">{link.icon}</span>
            {link.label}
          </motion.a>
        ))}
      </motion.div>
      <motion.p
        className="contact__footer"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.4 }}
      >
        © {new Date().getFullYear()} Hana Oh. Built with Curiosity and Care.
      </motion.p>
    </div>
  </motion.section>
);

export default ContactSection;
