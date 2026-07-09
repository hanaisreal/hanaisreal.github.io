import React from 'react';
import { useLocation } from 'react-router-dom';
import { getProjectBySlug } from './components/data/projectData';
import { getPublicationBySlug } from './components/data/publicationsData';

const SITE_NAME = 'Hana Oh';
const SITE_URL = 'https://hanaisreal.github.io';
const DEFAULT_IMAGE = `${SITE_URL}/pictures/profile_main.png`;
const DEFAULT_ROBOTS = 'index,follow,max-image-preview:large';

type StructuredData = Record<string, unknown>;

interface SeoConfig {
  title: string;
  description: string;
  canonicalPath: string;
  image?: string;
  type?: string;
  robots?: string;
  structuredData: StructuredData[];
}

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }

  return pathname || '/';
}

function absoluteUrl(path: string): string {
  const normalized = normalizePath(path);
  return normalized === '/' ? SITE_URL : `${SITE_URL}${normalized}`;
}

function upsertMeta(selector: string, attributes: Record<string, string>): void {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement('meta');
    element.dataset.seoManaged = 'true';
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element!.setAttribute(key, value);
  });
}

function upsertLink(selector: string, attributes: Record<string, string>): void {
  let element = document.head.querySelector<HTMLLinkElement>(selector);

  if (!element) {
    element = document.createElement('link');
    element.dataset.seoManaged = 'true';
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element!.setAttribute(key, value);
  });
}

function upsertJsonLd(payload: StructuredData[]): void {
  let script = document.head.querySelector<HTMLScriptElement>('script[data-seo-jsonld="true"]');

  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.seoJsonld = 'true';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(payload);
}

function buildBreadcrumb(items: Array<{ name: string; path: string }>): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function splitAuthors(authors: string): Array<{ '@type': 'Person'; name: string }> {
  return authors.split(', ').map((name) => ({
    '@type': 'Person',
    name,
  }));
}

function getSeoConfig(pathname: string): SeoConfig {
  const path = normalizePath(pathname);

  if (path === '/') {
    return {
      title: 'Hana Oh | HCI and AI Researcher at Seoul National University',
      description:
        'Portfolio of Hana Oh, an HCI and AI researcher and M.S. student at Seoul National University, with work in human-AI interaction, educational AI, cybersecurity awareness, and interactive systems.',
      canonicalPath: '/',
      type: 'website',
      structuredData: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE_NAME,
          url: SITE_URL,
          inLanguage: 'en-US',
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Hana Oh',
          url: SITE_URL,
          image: DEFAULT_IMAGE,
          jobTitle: 'HCI and AI Researcher',
          affiliation: {
            '@type': 'CollegeOrUniversity',
            name: 'Seoul National University',
          },
          sameAs: [
            'https://github.com/hanaisreal',
            'https://linkedin.com/in/hana-oh-921945290/',
          ],
          knowsAbout: [
            'Human-Computer Interaction',
            'Human-AI Interaction',
            'Educational AI',
            'Cybersecurity Awareness',
            'Interactive Systems',
          ],
        },
      ],
    };
  }

  if (path === '/research') {
    return {
      title: 'Research | Hana Oh',
      description:
        'Publications and research projects by Hana Oh in HCI, human-AI interaction, educational AI, cybersecurity awareness, and interactive AI systems.',
      canonicalPath: '/research',
      type: 'website',
      structuredData: [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Research',
          url: absoluteUrl('/research'),
          description:
            'Publications and research projects by Hana Oh in HCI, human-AI interaction, educational AI, cybersecurity awareness, and interactive AI systems.',
          isPartOf: absoluteUrl('/'),
        },
        buildBreadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Research', path: '/research' },
        ]),
      ],
    };
  }

  if (path === '/collections') {
    return {
      title: 'Collections | Hana Oh',
      description:
        'A personal worldbuilding and visual archive by Hana Oh, gathering words, images, and references into an interactive collection.',
      canonicalPath: '/collections',
      type: 'website',
      structuredData: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Collections',
          url: absoluteUrl('/collections'),
          description:
            'A personal worldbuilding and visual archive by Hana Oh, gathering words, images, and references into an interactive collection.',
          isPartOf: absoluteUrl('/'),
        },
        buildBreadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Collections', path: '/collections' },
        ]),
      ],
    };
  }

  if (path.startsWith('/projects/')) {
    const slug = path.replace('/projects/', '');
    const project = getProjectBySlug(slug);

    if (project) {
      return {
        title: `${project.title} | Hana Oh`,
        description: project.tldr,
        canonicalPath: `/projects/${project.slug}`,
        image: project.image ? `${SITE_URL}${project.image}` : DEFAULT_IMAGE,
        type: 'article',
        structuredData: [
          {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title,
            url: absoluteUrl(`/projects/${project.slug}`),
            description: project.tldr,
            creator: {
              '@type': 'Person',
              name: 'Hana Oh',
              url: SITE_URL,
            },
            keywords: project.tags,
            image: project.image ? `${SITE_URL}${project.image}` : DEFAULT_IMAGE,
          },
          buildBreadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Research', path: '/research' },
            { name: project.title, path: `/projects/${project.slug}` },
          ]),
        ],
      };
    }
  }

  if (path.startsWith('/publications/')) {
    const slug = path.replace('/publications/', '');
    const publication = getPublicationBySlug(slug);

    if (publication) {
      return {
        title: `${publication.title} | Hana Oh`,
        description: publication.tldr,
        canonicalPath: `/publications/${publication.slug}`,
        image: publication.image ? `${SITE_URL}${publication.image}` : DEFAULT_IMAGE,
        type: 'article',
        structuredData: [
          {
            '@context': 'https://schema.org',
            '@type': 'ScholarlyArticle',
            headline: publication.title,
            description: publication.tldr,
            url: absoluteUrl(`/publications/${publication.slug}`),
            author: splitAuthors(publication.authors),
            about: publication.venue,
            image: publication.image ? `${SITE_URL}${publication.image}` : DEFAULT_IMAGE,
          },
          buildBreadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Research', path: '/research' },
            { name: publication.title, path: `/publications/${publication.slug}` },
          ]),
        ],
      };
    }
  }

  return {
    title: 'Hana Oh',
    description:
      'Portfolio of Hana Oh, an HCI and AI researcher at Seoul National University.',
    canonicalPath: path,
    type: 'website',
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: SITE_NAME,
        url: absoluteUrl(path),
      },
    ],
  };
}

const SeoHead: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    const config = getSeoConfig(location.pathname);
    const canonicalUrl = absoluteUrl(config.canonicalPath);
    const ogType = config.type || 'website';
    const imageUrl = config.image || DEFAULT_IMAGE;

    document.documentElement.lang = 'en-US';
    document.title = config.title;

    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: config.description,
    });
    upsertMeta('meta[name="author"]', {
      name: 'author',
      content: 'Hana Oh',
    });
    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: config.robots || DEFAULT_ROBOTS,
    });
    upsertMeta('meta[name="googlebot"]', {
      name: 'googlebot',
      content: config.robots || DEFAULT_ROBOTS,
    });
    upsertMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: config.title,
    });
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: config.description,
    });
    upsertMeta('meta[property="og:type"]', {
      property: 'og:type',
      content: ogType,
    });
    upsertMeta('meta[property="og:url"]', {
      property: 'og:url',
      content: canonicalUrl,
    });
    upsertMeta('meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: SITE_NAME,
    });
    upsertMeta('meta[property="og:image"]', {
      property: 'og:image',
      content: imageUrl,
    });
    upsertMeta('meta[property="og:locale"]', {
      property: 'og:locale',
      content: 'en_US',
    });
    upsertMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: config.title,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: config.description,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: 'twitter:image',
      content: imageUrl,
    });

    upsertLink('link[rel="canonical"]', {
      rel: 'canonical',
      href: canonicalUrl,
    });

    upsertJsonLd(config.structuredData);
  }, [location.pathname]);

  return null;
};

export default SeoHead;
