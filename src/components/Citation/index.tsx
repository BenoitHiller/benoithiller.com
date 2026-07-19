import CitationProvider, { Bibliography, Reference } from './Provider';

type Citation = {
  author?: string;
  year?: string;
  notes?: string;
  title: string;
} & (
  | ArticleProps
  | BlogProps
  | BookProps
  | ConferenceProceedingsProps
  | GovernmentActProps
  | GovernmentProceedingProps
  | LectureNotesProps
  | MastersThesisProps
);

type CitationProps<T extends string> = Citation & { type: T };

interface ArticleProps {
  type: 'article';
  journal: string;
  month: string;
  year: string;
  volume: number;
  number: number;
  doi?: string;
  pages: string;
}

interface BlogProps {
  type: 'blog';
  journal?: string;
  month: string;
  day: string;
  year: string;
  url: string;
}

interface BookProps {
  type: 'book';
  author: string;
  title: string;
  year: string;
  country?: string;
  state?: string;
  city?: string;
  publisher: string;
  edition?: string;
}

interface ConferenceProceedingsProps {
  type: 'conference-proceedings';
  author: string;
  title: string;
  conference: string;
  year: string;
  pages?: string;
  doi?: string;
}

interface LectureNotesProps {
  type: 'lecture-notes';
  year: string;
  howpublished: string;
  url: string;
}

interface GovernmentProceedingProps {
  type: 'government-proceeding';
  country?: string;
  legislativeBody: string;
  year: string;
  month: string;
  day: string;
  parliament: string;
  session: string;
  number: string;
  url?: string;
}

interface GovernmentActProps {
  type: 'government-act';
  country: string;
  year: string;
  month: string;
  day: string;
  number: string;
  url?: string;
}

interface MastersThesisProps {
  type: 'masters-thesis';
  author: string;
  year: string;
  school: string;
  country?: string;
  state?: string;
  city?: string;
  month?: string;
  day?: string;
  url?: string;
}

export { Bibliography, Reference, CitationProvider };

export type { Citation, CitationProps };
