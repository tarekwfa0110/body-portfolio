import { photo } from './images'
import type { Portfolio, Profile, SectionName } from './types'

export const profile: Profile = {
  name: 'Abdelrahman Alaa',
  bio: 'Intern dentist at the Faculty of Dentistry, Assiut University, Class of 2025 — graduating with an overall grade of Very Good. Driven by a deep interest in Restorative Dentistry, Endodontics, Oral Surgery, and Oral & Maxillofacial Diseases, and actively seeking observer or unpaid assistant roles to build hands-on clinical experience and grow within the disciplines that matter most.',
  portrait: photo('/portrait.webp'),
  avatar: photo('/avatar.webp'),
  contacts: [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/abdelra7maan_10',
      display: '@abdelra7maan_10',
    },
    { label: 'Phone', href: 'tel:+201067633757', display: '+20 10 67633757' },
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/share/1JrMeeykZk/',
      display: 'Facebook',
    },
    {
      label: 'TikTok',
      href: 'https://www.tiktok.com/@abderr7maan',
      display: '@abderr7maan',
    },
    {
      label: 'Email',
      href: 'mailto:bodyalaa2021@gmail.com',
      display: 'bodyalaa2021@gmail.com',
    },
  ],
}

// Case order here is the order on the site. Sections are grouped by name.
const rawCases: { section: SectionName; title: string; images: string[] }[] = [
  {
    section: 'Endodontics',
    title: 'Rct for upper 5',
    images: [
      '/cases/rct-for-upper-5-1.webp',
      '/cases/rct-for-upper-5-2.webp',
      '/cases/rct-for-upper-5-3.webp',
      '/cases/rct-for-upper-5-4.webp',
    ],
  },
  {
    section: 'Endodontics',
    title: 'Rct for lower right 7',
    images: [
      '/cases/rct-for-lower-right-7-1.webp',
      '/cases/rct-for-lower-right-7-2.webp',
    ],
  },
  {
    section: 'Endodontics',
    title: 'Rct for upper 1 & 2',
    images: [
      '/cases/rct-for-upper-1-and-2-1.webp',
      '/cases/rct-for-upper-1-and-2-2.webp',
    ],
  },
  {
    section: 'Endodontics',
    title: 'Rct for upper 7',
    images: [
      '/cases/rct-for-upper-7-1.webp',
      '/cases/rct-for-upper-7-2.webp',
      '/cases/rct-for-upper-7-3.webp',
    ],
  },
  {
    section: 'Endodontics',
    title: 'Rct for upper 7',
    images: [
      '/cases/rct-for-upper-7-1-case-2.webp',
      '/cases/rct-for-upper-7-2-case-2.webp',
      '/cases/rct-for-upper-7-3-case-2.webp',
    ],
  },
  {
    section: 'Endodontics',
    title: 'Rct for upper 4',
    images: [
      '/cases/rct-for-upper-4-1.webp',
      '/cases/rct-for-upper-4-2.webp',
      '/cases/rct-for-upper-4-3.webp',
    ],
  },
  {
    section: 'Endodontics',
    title: 'Rct for lower 8',
    images: [
      '/cases/rct-for-lower-8-1.webp',
      '/cases/rct-for-lower-8-2.webp',
      '/cases/rct-for-lower-8-3.webp',
    ],
  },
  {
    section: 'Endodontics',
    title: 'Rct for lower 6',
    images: ['/cases/rct-for-lower-6-1.webp'],
  },
  {
    section: 'Operative Dentistry',
    title: 'Class I composite restoration for lower 6 & 7',
    images: [
      '/cases/class-i-composite-restoration-for-lower-6-and-7-1.webp',
      '/cases/class-i-composite-restoration-for-lower-6-and-7-2.webp',
      '/cases/class-i-composite-restoration-for-lower-6-and-7-3.webp',
    ],
  },
  {
    section: 'Operative Dentistry',
    title: 'Simple class I composite restoration for lower 6',
    images: [
      '/cases/simple-class-i-composite-restoration-for-lower-6-1.webp',
      '/cases/simple-class-i-composite-restoration-for-lower-6-2.webp',
      '/cases/simple-class-i-composite-restoration-for-lower-6-3.webp',
    ],
  },
  {
    section: 'Operative Dentistry',
    title: 'Class I restoration for lower 6',
    images: [
      '/cases/simple-class-i-composite-restoration-for-lower-6-overview.webp',
    ],
  },
  {
    section: 'Operative Dentistry',
    title: 'Simple class I composite restoration for lower 7',
    images: ['/cases/simple-class-i-composite-restoration-for-lower-7-1.webp'],
  },
  {
    section: 'Operative Dentistry',
    title: 'Simple class I composite restoration for lower 6',
    images: [
      '/cases/simple-class-i-composite-restoration-for-lower-6-case-2-1.webp',
      '/cases/simple-class-i-composite-restoration-for-lower-6-case-2-2.webp',
      '/cases/simple-class-i-composite-restoration-for-lower-6-case-2-3.webp',
    ],
  },
  {
    section: 'Operative Dentistry',
    title: 'Direct pulp capping after pinpoint exposure in upper 6',
    images: [
      '/cases/direct-pulp-caping-after-pinpoint-exposure-in-upper-6-1.webp',
      '/cases/direct-pulp-caping-after-pinpoint-exposure-in-upper-6-2.webp',
      '/cases/direct-pulp-caping-after-pinpoint-exposure-in-upper-6-3.webp',
    ],
  },
  {
    section: 'Operative Dentistry',
    title: 'Simple class I composite restoration for lower 6',
    images: [
      '/cases/simple-class-i-composite-restoration-for-lower-6-1.webp',
      '/cases/simple-class-i-composite-restoration-for-lower-6-2.webp',
      '/cases/simple-class-i-composite-restoration-for-lower-6-3.webp',
    ],
  },
  {
    section: 'Operative Dentistry',
    title: 'MOD cavity and class I composite restoration for lower 6 & 7',
    images: [
      '/cases/mod-cavity-and-class-i-composite-restoration-for-lower-6-and-7-1.webp',
      '/cases/mod-cavity-and-class-i-composite-restoration-for-lower-6-and-7-2.webp',
      '/cases/mod-cavity-and-class-i-composite-restoration-for-lower-6-and-7-3.webp',
      '/cases/mod-cavity-and-class-i-composite-restoration-for-lower-6-and-7-4.webp',
      '/cases/mod-cavity-and-class-i-composite-restoration-for-lower-6-and-7-5.webp',
    ],
  },
  {
    section: 'Operative Dentistry',
    title: 'Class II composite restoration for upper 5',
    images: [
      '/cases/classii-composite-restoration-for-upper-5-1.webp',
      '/cases/classii-composite-restoration-for-upper-5-2.webp',
      '/cases/classii-composite-restoration-for-upper-5-3.webp',
      '/cases/classii-composite-restoration-for-upper-5-4.webp',
      '/cases/classii-composite-restoration-for-upper-5-5.webp',
      '/cases/classii-composite-restoration-for-upper-5-6.webp',
    ],
  },
  {
    section: 'Operative Dentistry',
    title: 'Class II restoration of lower 6 ( Amalgam retreatment )',
    images: ['/cases/class-ii-composite-restoration-for-lower-6-1.webp'],
  },
  {
    section: 'Operative Dentistry',
    title: 'Class II composite restoration for lower 6',
    images: [
      '/cases/class-ii-composite-restoration-for-lower-6-2.webp',
      '/cases/class-ii-composite-restoration-for-lower-6-3.webp',
      '/cases/class-ii-composite-restoration-for-lower-6-4.webp',
      '/cases/class-ii-composite-restoration-for-lower-6-5.webp',
      '/cases/class-ii-composite-restoration-for-lower-6-6.webp',
    ],
  },
  {
    section: 'Operative Dentistry',
    title: 'Composite restoration for upper centrals',
    images: [
      '/cases/composite-restoration-for-upper-centrals-1.webp',
      '/cases/composite-restoration-for-upper-centrals-2.webp',
      '/cases/composite-restoration-for-upper-centrals-3.webp',
      '/cases/composite-restoration-for-upper-centrals-4.webp',
      '/cases/composite-restoration-for-upper-centrals-5.webp',
    ],
  },
  {
    section: 'Operative Dentistry',
    title: 'Composite restoration for upper anteriors',
    images: [
      '/cases/composite-restoration-for-upper-anteriors-1.webp',
      '/cases/composite-restoration-for-upper-anteriors-2.webp',
      '/cases/composite-restoration-for-upper-anteriors-3.webp',
      '/cases/composite-restoration-for-upper-anteriors-4.webp',
      '/cases/composite-restoration-for-upper-anteriors-5.webp',
      '/cases/composite-restoration-for-upper-anteriors-6.webp',
    ],
  },
  {
    section: 'Operative Dentistry',
    title: 'Class IV for upper central',
    images: [
      '/cases/class-iv-for-upper-central-1.webp',
      '/cases/class-iv-for-upper-central-2.webp',
      '/cases/class-iv-for-upper-central-3.webp',
    ],
  },
  {
    section: 'Operative Dentistry',
    title: 'Class IV for upper lateral incisor',
    images: [
      '/cases/class-iv-for-upper-lateral-incisor-1.webp',
      '/cases/class-iv-for-upper-lateral-incisor-2.webp',
      '/cases/class-iv-for-upper-lateral-incisor-3.webp',
    ],
  },
  {
    section: 'Operative Dentistry',
    title: 'Class IV restoration for lower 1',
    images: ['/cases/class-iv-restoration-for-lower-1.webp'],
  },
  {
    section: 'Operative Dentistry',
    title: 'Class V restoration for upper 4',
    images: ['/cases/class-v-restoration-for-upper-4.webp'],
  },
  {
    section: 'Fixed Prosthodontics',
    title: 'Zirconia bridge to compensate lower 6',
    images: ['/cases/zirconia-bridge-to-compensate-lower-6-1.webp'],
  },
  {
    section: 'Fixed Prosthodontics',
    title: 'Zirconia crown for upper 2',
    images: [
      '/cases/zirconia-crown-for-upper-2-1.webp',
      '/cases/zirconia-crown-for-upper-2-2.webp',
      '/cases/zirconia-crown-for-upper-2-3.webp',
      '/cases/zirconia-crown-for-upper-2-4.webp',
    ],
  },
  {
    section: 'Fixed Prosthodontics',
    title: 'Zirconia bridge to compensate upper centrals',
    images: [
      '/cases/zirconia-bridge-to-compensate-upper-centrals-1.webp',
      '/cases/zirconia-bridge-to-compensate-upper-centrals-2.webp',
      '/cases/zirconia-bridge-to-compensate-upper-centrals-3.webp',
      '/cases/zirconia-bridge-to-compensate-upper-centrals-4.webp',
    ],
  },
  {
    section: 'Fixed Prosthodontics',
    title: '2 single crowns for lower 4 & 5',
    images: [
      '/cases/2-single-crowns-for-lower-4-and-5-1.webp',
      '/cases/2-single-crowns-for-lower-4-and-5-2.webp',
    ],
  },
  {
    section: 'Fixed Prosthodontics',
    title: 'Zirconia bridge to compensate upper 5 & 6',
    images: [
      '/cases/zirconia-bridge-to-compensate-upper-5-and-6-1.webp',
      '/cases/zirconia-bridge-to-compensate-upper-5-and-6-2.webp',
    ],
  },
  {
    section: 'Fixed Prosthodontics',
    title:
      'Surgical crown lengthening followed by post & core and zirconia crown',
    images: [
      '/cases/surgical-crown-lengthining-followed-by-post-and-core-and-zirconia-crown-1.webp',
      '/cases/surgical-crown-lengthining-followed-by-post-and-core-and-zirconia-crown-2.webp',
    ],
  },
  {
    section: 'Fixed Prosthodontics',
    title: 'Indirect occlusal overlay for upper 4',
    images: [
      '/cases/indirect-occlusal-overlay-for-upper-4-1.webp',
      '/cases/indirect-occlusal-overlay-for-upper-4-2.webp',
      '/cases/indirect-occlusal-overlay-for-upper-4-3.webp',
      '/cases/indirect-occlusal-overlay-for-upper-4-4.webp',
      '/cases/indirect-occlusal-overlay-for-upper-4-5.webp',
    ],
  },
  {
    section: 'Fixed Prosthodontics',
    title: 'E-max veneer and crown for upper centrals',
    images: [
      '/cases/e-max-veneer-and-crown-for-upper-centrals-1.webp',
      '/cases/e-max-veneer-and-crown-for-upper-centrals-2.webp',
      '/cases/e-max-veneer-and-crown-for-upper-centrals-3.webp',
      '/cases/e-max-veneer-and-crown-for-upper-centrals-4.webp',
      '/cases/e-max-veneer-and-crown-for-upper-centrals-5.webp',
      '/cases/e-max-veneer-and-crown-for-upper-centrals-6.webp',
      '/cases/e-max-veneer-and-crown-for-upper-centrals-7.webp',
    ],
  },
]

// The site's content as it ships in the code. Used when the database is not
// set up yet, or is empty.
export const staticPortfolio: Portfolio = {
  profile,
  cases: rawCases.map((c) => ({ ...c, images: c.images.map(photo) })),
}
