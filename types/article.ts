export interface ContentPoint {
  heading: string;
  description?: string;
  details?: string;
  lessons?: string[];
  values?: string[];
  skills?: string[];
  media?: string[];
}

export interface Article {
  id: number;
  title: string;
  institution?: string;
  course?: string;
  duration?: string;
  company?: string;
  role?: string;
  teaching_schedule?: string;
  summary: string;
  content_points: ContentPoint[];
  media?: string[];
  note?: string;
  author: string;
  date: string;
  read_time: string;
  views: number;
}