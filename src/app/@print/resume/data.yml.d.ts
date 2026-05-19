declare type Skill = string | { [key: string]: string[] };
declare interface InfoItem {
  text: string;
  link: string;
}

declare interface Job {
  title: string;
  company: string;
  from: string;
  to: string;
  tasks: string[];
  achievements?: string[];
}

declare interface Other {
  title: string;
  from: string;
  to: string;
  tasks: string[];
}

export const version: string;
export const info: { [key: string]: InfoItem };
export const experience: Job[];
export const other: Other[];
export const skills: { [key: string]: string[] };
export const education: {
  school: string;
  degree: string;
  field: string;
  from: string;
  to: string;
  year: string;
};

export const summary: string;
