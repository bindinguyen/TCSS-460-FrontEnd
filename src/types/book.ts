export interface IBook {
  isbn13: number;
  authors: string;
  publication_year: number;
  original_title: string;
  title: string;
  rating_avg: string;
  rating_count: number;
  rating_1: number;
  rating_2: number;
  rating_3: number;
  rating_4: number;
  rating_5: number;
  image_url: string;
  image_small_url: string;
}

// This interface is for book
export interface BookFormData {
  isbn13: number;
  authors: string;
  publication_year: number; // API expects publication_year
  original_title: string;
  title: string;
  rating_1: number;
  rating_2: number;
  rating_3: number;
  rating_4: number;
  rating_5: number;
  image_url?: string;
  image_small_url?: string;
}
