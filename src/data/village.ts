import { MdFamilyRestroom, MdHealthAndSafety, MdOutlineLocationCity } from "react-icons/md";
import type { AgendaItem, CultureItem, Feature, GalleryImage, Official, Stat } from "@/types";

/*
 * Static content. All values are placeholders carried over from the original
 * project; replace them (or swap this file for API calls) when real data exists.
 */

export const villageStats: Stat[] = [
  { icon: MdFamilyRestroom, title: "1.234 Keluarga", description: "Total KK" },
  { icon: MdHealthAndSafety, title: "12.345 Jiwa", description: "Total Penduduk" },
  { icon: MdOutlineLocationCity, title: "120 KM", description: "Luas Desa" },
];

export const hamlets = ["Dusun Krajan", "Dusun Pendil Tengah", "Dusun Pendil Selatan"] as const;

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
      "Komitmen pelestarian lingkungan hidup dan ruang terbuka hijau berbasis partisipasi aktif masyarakat.",
  },
  {
    icon: MdHealthAndSafety,
    title: "Pelayanan Publik Cepat",
    description:
      "Kemudahan layanan administrasi kependudukan dan surat pengantar desa secara terpadu dan transparan.",
  },
  {
    icon: MdOutlineLocationCity,
    title: "Sentra Pertanian Mandiri",
    description:
      "Pengembangan komoditas pertanian unggulan lokal dengan sistem irigasi terawat dan kelompok tani berdaya.",
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
      "Ludruk adalah kesenian teater rakyat tradisional Jawa Timur yang menampilkan drama kehidupan sehari-hari masyarakat dengan balutan humor, pesan moral, dan iringan gamelan yang khas.",
  },
];

export const agenda: AgendaItem[] = [1, 2, 3, 4].map((id) => ({
  id,
  category: "Kegiatan Desa",
  title: "Peringatan Hari Jadi Desa Pendil ke-120",
  time: "09:00-13:00 WIB",
  status: "Belum Dimulai",
}));

export const leader = {
  name: "H. Machfuds",
  image: "/images/image-leader.jpg",
  speech:
    "Selamat datang di website resmi Desa Pendil, Kecamatan Banyuanyar, Kabupaten Probolinggo. Portal ini hadir sebagai wujud keterbukaan informasi publik dan komitmen kami dalam memberikan pelayanan terbaik, transparan, dan akuntabel bagi seluruh warga. Kami mengajak seluruh elemen masyarakat untuk bersama-sama membangun desa yang mandiri, sejahtera, dan berbudaya.",
};

export const villageOrigin = {
  image: "/images/image-village.jpg",
  text: "Desa Pendil merupakan salah satu desa yang terletak di Kecamatan Banyuanyar, Kabupaten Probolinggo, Jawa Timur. Memiliki hamparan lahan pertanian yang subur serta masyarakat yang menjunjung tinggi semangat gotong royong dan tradisi leluhur. Nama Pendil sarat akan nilai historis kearifan lokal yang melambangkan wadah kebersamaan warga dalam menjaga kerukunan, kelestarian lingkungan, dan kemajuan desa dari generasi ke generasi.",
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
