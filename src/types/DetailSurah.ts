export type ListSurah = {
  nomor: number;
};

export type Ayat = {
  id: number;
  surah: number;
  nomor: number;
  ar: string;
  tr: string;
  idn: string;
};

export type DetailSurah = {
  nomor: number;
  nama: string;
  jumlah_ayat: number;
  nama_latin: string;
  arti: string;
  tempat_turun: string;
  deskripsi: string;
  audio: string;
  ayat: Ayat[];
};

export type Params = {
  nomor: string;
};
