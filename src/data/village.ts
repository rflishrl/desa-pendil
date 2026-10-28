import {
  MdFamilyRestroom,
  MdHealthAndSafety,
  MdOutlineLocationCity,
} from "react-icons/md";
import type {
  AgendaItem,
  CultureItem,
  Feature,
  GalleryImage,
  Official,
  Stat,
} from "@/types";

/*
 * Static content. All values are placeholders carried over from the original
 * project; replace them (or swap this file for API calls) when real data exists.
 */

const LOREM =
  "Lörem ipsum låbel minidator, tesade bese telestat. Krosat. Sysäst man. Latret gektig. Prelabel viligen, i vidat misk om dertad. Hojat diprerat efterföljarskap att parade. Dekapp nede om suska. Bende digur: en megagens. Fanuning mikrokade. Berat spepås spektigt, spesa respektive nilaning. Pseudolig trekaskade. Arade";

export const villageStats: Stat[] = [
  { icon: MdFamilyRestroom, title: "1.234 Keluarga", description: "Total KK" },
  { icon: MdHealthAndSafety, title: "12.345 Jiwa", description: "Total Penduduk" },
  { icon: MdOutlineLocationCity, title: "120 KM", description: "Luas Desa" },
];

export const hamlets = ["Dusun A", "Dusun B", "Dusun C"] as const;

export const officials: Official[] = [
  { name: "H. Machfuds", position: "Kepala Desa" },
  { name: "Edi Susanto", position: "Sekretaris" },
  { name: "Mamuriyah", position: "Bendahara" },
  { name: "Anwar", position: "Kaur Pemerintahan" },
  { name: "Achmad", position: "Kaur Pembangunan" },
  { name: "Maksum", position: "Kaur Perencanaan" },
  { name: "Hj. Sobri", position: "Kaur Kesra" },
  { name: "Taufiq W.", position: "Kaur Umum" },
].map((o) => ({ ...o, image: "/images/dummy-people.jpg" }));

export const features: Feature[] = [
  {
    icon: MdFamilyRestroom,
    title: "Desa Adiwiyata",
    description:
      "Desa yang peduli dan berbudaya lingkungan. Deskripsi ini masih contoh.",
  },
  {
    icon: MdHealthAndSafety,
    title: "Keunggulan 2",
    description:
      "Desa yang peduli dan berbudaya lingkungan. Deskripsi ini masih contoh.",
  },
  {
    icon: MdOutlineLocationCity,
    title: "Keunggulan 3",
    description:
      "Desa yang peduli dan berbudaya lingkungan. Deskripsi ini masih contoh.",
  },
];

export const cultures: CultureItem[] = [
  {
    title: "Tari Kiprah",
    image: "/images/dummy-culture.jpg",
    description:
      "Tari Kiprah Glipang berfungsi sebagai tari penyambutan pada kesenian Glipang. Tari ini merupakan tarian tunggal yang ditarikan oleh penari laki-laki. Tari Kiprah Glipang dapat ditarikan secara berkelompok, namun dari segi gerak yang dilakukan tetap sama.",
  },
  {
    title: "Tari Remo",
    image: "/images/dummy-culture.jpg",
    description:
      "Tari Remo adalah salah satu tarian untuk penyambutan tamu yang ditampilkan baik oleh satu atau lebih, Remo berasal dari kata Reyoge Cak Mo. Tarian ini berasal dari Jombang, Provinsi Jawa Timur.",
  },
  {
    title: "Ludruk",
    image: "/images/dummy-culture.jpg",
    description:
      "Ludruk adalah suatu kesenian drama tradisional dari Jawa Timur. Ludruk merupakan suatu drama tradisional...",
  },
];

export const agenda: AgendaItem[] = [1, 2, 3, 4].map((id) => ({
  id,
  category: "Kategori",
  title: "Peringatan Hari Jadi Desa Pendil ke-120",
  time: "09:00-13:00 WIB",
  status: "Belum Dimulai",
}));

export const leader = {
  name: "H. Machfuds",
  image: "/images/image-leader.jpg",
  speech: LOREM,
};

export const villageOrigin = {
  image: "/images/image-village.jpg",
  text: LOREM,
};

export const galleryImages: GalleryImage[] = [
  { src: "/images/dummy-news.jpg", alt: "Kegiatan warga Desa Pendil" },
  { src: "/images/dummy-people.jpg", alt: "Warga Desa Pendil berkumpul" },
  { src: "/images/dummy-culture.jpg", alt: "Pertunjukan kesenian khas Desa Pendil" },
  { src: "/images/image-village.jpg", alt: "Pemandangan Desa Pendil" },
  { src: "/images/image-leader.jpg", alt: "Kepala Desa Pendil" },
  { src: "/images/dummy-news.jpg", alt: "Kegiatan warga Desa Pendil" },
  { src: "/images/dummy-people.jpg", alt: "Warga Desa Pendil berkumpul" },
  { src: "/images/dummy-culture.jpg", alt: "Pertunjukan kesenian khas Desa Pendil" },
  { src: "/images/image-village.jpg", alt: "Pemandangan Desa Pendil" },
];
