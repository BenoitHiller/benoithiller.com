import * as R from 'ramda';
import './resume.css';

const HeaderLink: React.FC<{ label: string; href?: string; text: string }> = ({
  label,
  href,
  text
}) => (
  <div className="relative">
    <div className="absolute -top-full light-text">{label}</div>
    <a target="_blank" href={href ?? text}>
      {text}
    </a>
  </div>
);

const Task: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="list-disc list-slate-400 mb-[2px]">{children}</li>
);

const Job: React.FC<{
  title: string;
  company: string;
  from: string;
  to: string;
  children?: React.ReactNode;
}> = ({ title, company, from, to, children }) => (
  <div className="flex gap-4 resume-section">
    <div className="resume-column-1">
      <div className="header">{company}</div>
      <div>{title}</div>
      <div className="font-light">
        {from}&ndash;{to}
      </div>
    </div>
    <ul className="w-full shrink light-text">{children}</ul>
  </div>
);

const normalizeSkill = R.pipe(R.replace(/^\./, ''), R.toLower);
const skillSort = R.sort<string>(R.ascend(normalizeSkill));
const buildSkillsList = R.pipe(skillSort, R.intersperse(', '), R.join(''));

const SkillsSection: React.FC<{ title: string; skills: string[] }> = ({ title, skills }) => (
  <div className="resume-section flex gap-4">
    <div className="resume-column-1">{title}</div>

    <ul className="shrink light-text">{buildSkillsList(skills)}</ul>
  </div>
);

function Page() {
  return (
    <article className="text-sm text-gray-700">
      <div className="resume-section flex gap-4 items-baseline">
        <h1 className="resume-column-1">Benoit Hiller</h1>
        <div className="flex items-baseline gap-8 w-full shrink">
          <HeaderLink
            label="email:"
            href="mailto:benoit.hiller@gmail.com"
            text="benoit.hiller@gmail.com"
          />
          <HeaderLink label="website:" href="https://benoithiller.com" text="benoithiller.com" />
          <HeaderLink
            label="LinkedIn:"
            href="https://linkedin.com/in/BenoitHiller"
            text="linkedin.com/in/BenoitHiller"
          />
        </div>
      </div>
      <Job
        title="Senior Software Engineer"
        company="Hockeystick.co inc."
        from="Sept 2017"
        to="Apr 2022"
      >
        <Task>
          Led the frontend development team on multiple flagship products using JavaScript,
          TypeScript, React, Next.js, Gatsby, and GraphQL.
        </Task>
        <Task>
          Simultaneously contributed to backend development for those products in C# and Elixir, as
          well as to infrastructure design and implementation on AWS and Azure.
        </Task>
        <Task>
          Designed and implemented a shared authentication service for Hockeystick's applications in
          Ruby on Rails, providing a GraphQL API for user management as well as OIDC and SAML IdP
          integration.
        </Task>
        <Task>
          Championed numerous engineering processes improvements including:
          <ul className="ml-[1em]">
            <Task>Developing code style guides.</Task>
            <Task>Implementing PR checks and CI build infrastructure.</Task>
            <Task>
              Building custom Jira and Slack integrations to ease coordination with the rest of the
              team.
            </Task>
            <Task>
              Identifying developer pain points and building out tooling or code solutions to
              address them.
            </Task>
            <Task>
              Maintaining the corresponding editor configurations and documentation for all of the
              aforementioned.
            </Task>
          </ul>
        </Task>
        <Task>
          Mentored junior team members, co-op students, and even a few outside contractors in
          software development.
        </Task>
        <Task>
          Coordinated directly with clients on technical specifications for custom features,
          external API integrations, and integrations with external authentication providers.
        </Task>
        <Task>
          Took over full platform ownership during the interim when the company was looking for a
          new CTO and performed the technical interviews for that position.
        </Task>
      </Job>
      <Job title="Software Engineer" company="Hockeystick.co inc." from="Jan 2017" to="Sep 2017">
        <Task>
          Acted as the primary contributor on Hockeystick's Reporting and Dealflow applications in
          Ruby on Rails.
        </Task>
        <Task>
          Designed and built a React GUI for parsing income statements and balance sheets into a
          standard format so as to aggregate data between differing company reporting practices.
        </Task>
      </Job>
      <Job title="Software Developer" company="Imation (now Nexsan)" from="May 2013" to="Jul 2014">
        <Task>
          Worked as a fullstack developer on the configuration UI for Imation's NAS products using
          ActionScript and Java.
        </Task>
        <Task>Implemented libzfs JNA bindings for configuring ZFS from Java.</Task>
        <Task>
          Wrote software to apply, verify, and rollback network setting changes via the
          configuration UI without interrupting the connection to the user.
        </Task>
      </Job>
      <SkillsSection
        title="Programming Languages"
        skills={[
          'TypeScript',
          'JavaScript',
          'Ruby',
          'C#',
          'Elixir',
          'Bash',
          'SQL',
          'Java',
          'ActionScript',
          'Python'
        ]}
      />
      <SkillsSection
        title="Frameworks &amp; Libraries"
        skills={[
          'React',
          'Rails',
          '.NET Core',
          'Next.js',
          'Gatsby',
          'Ecto',
          'EFCore',
          'HotChocolate',
          'Ramda',
          'Apollo Client',
          'Relay',
          'Redux',
          'Redux-Saga',
          'Flask',
          'SQLAlchemy'
        ]}
      />
      <SkillsSection
        title="Tools &amp; Infrastructure"
        skills={[
          'Azure',
          'AWS',
          'Docker',
          'Git',
          'GraphQL',
          'SAML',
          'OAuth2',
          'OIDC',
          'PostgreSQL',
          'SQL Server',
          'NGINX',
          'GitHub Actions',
          'CircleCI',
          'BitBucket Pipelines',
          'Vagrant'
        ]}
      />
      <div className="resume-section flex gap-4">
        <div className="resume-column-1">Education</div>

        <div className="shrink light-text">
          Bachelor of Science: Computer Science from McGill University (2013)
        </div>
      </div>
    </article>
  );
}

export default Page;
