import React from 'react';
import type { IconType } from 'react-icons';
import {
  FaChalkboardTeacher, FaEnvelope, FaGithub, FaGraduationCap, FaLinkedin,
  FaMicrophone, FaPlane, FaRegFileAlt, FaTrophy, FaUniversity,
} from 'react-icons/fa';

// Plain one-colour glyphs, picked by name (the names in home.json's news "icon").
const ICONS: Record<string, IconType> = {
  email: FaEnvelope,
  cv: FaRegFileAlt,
  github: FaGithub,
  linkedin: FaLinkedin,
  'research-paper': FaRegFileAlt,
  teaching: FaChalkboardTeacher,
  'conference-talk': FaMicrophone,
  award: FaTrophy,
  'graduate-school': FaUniversity,
  graduation: FaGraduationCap,
  travel: FaPlane,
};

const HomeIcon: React.FC<{ name: string; className?: string }> = ({ name, className = 'home-icon' }) => {
  const Icon = ICONS[name];
  return Icon ? <Icon className={className} aria-hidden="true" /> : null;
};

export default HomeIcon;
