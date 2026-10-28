import type { NavItem } from "@/types";

export const siteConfig = {
  name: "Desa Pendil",
  description:
    "Website resmi Desa Pendil, Kecamatan Banyuanyar, Kabupaten Probolinggo. Berita, layanan publik, dan profil desa.",
  address:
    "Kecamatan Banyuanyar, Kabupaten Probolinggo, Jawa Timur, Indonesia.",
  copyright: "Desa Pendil",
} as const;

export const mainNav: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Berita Desa", href: "/article" },
  { label: "Layanan Publik", href: "/services" },
  { label: "Profil Desa", href: "/profile" },
];

export const footerGroups: { title: string; links: NavItem[] }[] = [
  {
    title: "Berita Desa Pendil",
    links: [{ label: "Semua Berita", href: "/article" }],
  },
  {
    title: "Layanan Publik",
    links: [
      { label: "Data Desa", href: "/services#data-desa" },
      { label: "Data Dusun", href: "/services#data-dusun" },
    ],
  },
  {
    title: "Profil Desa",
    links: [
      { label: "Sambutan Kepala Desa", href: "/profile#sambutan" },
      { label: "Perangkat Desa", href: "/profile#perangkat" },
      { label: "Keunggulan", href: "/profile#keunggulan" },
      { label: "Kesenian Khas", href: "/profile#kesenian" },
      { label: "Galeri", href: "/gallery" },
    ],
  },
];

export const socialLinks = [
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "X (Twitter)", href: "#", icon: "x" },
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "YouTube", href: "#", icon: "youtube" },
] as const;

export const popularSearches = ["Desa Pendil", "Tari Remo", "Reog"];
