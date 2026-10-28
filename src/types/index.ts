import type { IconType } from "react-icons";

export interface Article {
  id: string;
  title: string;
  /** ISO date string */
  date: string;
  image: string;
  /** Body text, when the API provides it. */
  content?: string;
  author?: string;
}

export interface Official {
  name: string;
  position: string;
  image: string;
}

export interface Stat {
  icon: IconType;
  title: string;
  description: string;
}

export interface Feature {
  icon: IconType;
  title: string;
  description: string;
}

export interface CultureItem {
  title: string;
  description: string;
  image: string;
}

export interface AgendaItem {
  id: number;
  category: string;
  title: string;
  time: string;
  status: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface NavItem {
  label: string;
  href: string;
}
