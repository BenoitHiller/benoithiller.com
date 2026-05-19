import * as R from 'ramda';
import './resume.css';
import data from './data.yml';
import type { InfoItem } from './data.yml';
import type { Metadata } from 'next';

const info = data.info;

const joinWithCommas = R.pipe(R.intersperse(', '), R.join(''));

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-lg">{children}</h2>
);

const SubSectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-sm text-gray-700">{children}</h3>
);

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h1 className="resume-column-1 text-lg font-semibold text-gray-800">{children}</h1>
);

const HeaderLink: React.FC<{ label: string; info: InfoItem }> = ({ label, info }) => (
  <div className="relative">
    <div className="absolute -top-full light-text">{label}</div>
    <a target="_blank" href={info.link}>
      {info.text}
    </a>
  </div>
);

const Summary: React.FC = () => (
  <>
    <SectionHeader>Summary</SectionHeader>
    <div className="light-text section-border-bottom">{data.summary}</div>
  </>
);

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="list-disc list-slate-400 mb-[2px]">{children}</li>
);

const UnorderedList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="mt-1 ml-[1em] shrink light-text">
    {items.map((item, i) => (
      <ListItem key={i}>{item}</ListItem>
    ))}
  </ul>
);

const Job: React.FC<{
  title: string;
  company: string;
  from: string;
  to: string;
  tasks: string[];
  achievements?: string[];
}> = ({ title, company, from, to, tasks, achievements }) => (
  <div className="flex flex-col">
    <div className="flex gap-2">
      <div className="font-semibold text-gray-800">{company}</div>
      <div>{title}</div>
      <div className="font-light">
        {from}&ndash;{to}
      </div>
    </div>
    <UnorderedList items={tasks} />
    {achievements?.length && (
      <>
        <SubSectionHeader>Key Achievements</SubSectionHeader>
        <UnorderedList items={achievements} />
      </>
    )}
  </div>
);

const Other: React.FC<{
  title: string;
  from: string;
  to: string;
  tasks: string[];
}> = ({ title, from, to, tasks }) => (
  <div className="flex flex-col">
    <div className="flex gap-2">
      <div>{title}</div>
      <div className="font-light">
        {from}&ndash;{to}
      </div>
    </div>
    <UnorderedList items={tasks} />
  </div>
);

const Experience: React.FC = () => (
  <>
    <SectionHeader>Work Experience</SectionHeader>
    <div className="flex flex-col gap-2 section-border-bottom">
      {data.experience.map((job) => (
        <Job key={job.from} {...job} />
      ))}
    </div>
  </>
);

const OtherExperience: React.FC = () => (
  <>
    <SectionHeader>Other Experience</SectionHeader>
    <div className="flex flex-col gap-2 section-border-bottom">
      {data.other.map((other) => (
        <Other key={other.from} {...other} />
      ))}
    </div>
  </>
);

const SkillsSection: React.FC<{ label: string; skills: string[] }> = ({ label, skills }) => (
  <div>
    <SubSectionHeader>{label}</SubSectionHeader>

    <ul className="shrink light-text">{joinWithCommas(skills)}</ul>
  </div>
);

const Skills: React.FC = () => (
  <>
    <SectionHeader>Skills</SectionHeader>
    <div className="flex flex-col gap-2 section-border-bottom">
      {Object.entries(data.skills).map(([label, skills]) => (
        <SkillsSection key={label} label={label} skills={skills} />
      ))}
    </div>
  </>
);

const Education: React.FC = () => {
  const { school, field, degree, year } = data.education;

  return (
    <div className="resume-section">
      <SectionHeader>Education</SectionHeader>

      <div className="shrink light-text">
        {degree}: {field} from {school} ({year})
      </div>
    </div>
  );
};

export const metadata: Metadata = { title: `Benoit Hiller-v${data.version}` };

function Page() {
  return (
    <article className="text-sm text-gray-700">
      <div className="resume-section flex gap-4 items-baseline">
        <Title>Benoit Hiller</Title>
        <div className="flex items-baseline gap-8 w-full shrink">
          <HeaderLink label="email:" info={info['email']} />
          <HeaderLink label="website:" info={info['website']} />
          <HeaderLink label="LinkedIn:" info={info['linkedin']} />
        </div>
      </div>
      <Summary />
      <Skills />
      <Experience />
      <OtherExperience />
      <Education />
    </article>
  );
}

export default Page;
