import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const contactLinks = [
  {
    label: 'Email',
    href: 'mailto:ohhanathefirst@gmail.com',
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
  <section id="contact" className="hana-section hana-section--white contact">
    <div className="section-inner contact__inner">
      <span className="section-eyebrow text-themeMint">Contact</span>
      <h2>Let&apos;s build the next story together</h2>
      <p>
        I’m currently open to research collaborations, internships, and thoughtful conversations about AI, design,
        and education. Drop me a line—coffee chat invitations always welcome.
      </p>
      <div className="contact__links">
        {contactLinks.map((link) => (
          <a key={link.label} href={link.href} className="contact__link hana-card-hover">
            <span className="contact__link-icon">{link.icon}</span>
            {link.label}
          </a>
        ))}
      </div>
      <p className="contact__footer">
        © {new Date().getFullYear()} Hana Oh. Crafted with curiosity and care.
      </p>
    </div>
  </section>
);

export default ContactSection;
