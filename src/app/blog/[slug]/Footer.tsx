import Image from 'next/image';

const Footer = () => (
  <footer className="mb-12">
    <dl className="prose">
      <dt>Author</dt>
      <dd>Benoit Hiller</dd>

      <dt>License</dt>
      <dd>
        <div>
          The contents of this article are licensed under{' '}
          <a
            className="inline-flex gap-1 items-center"
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="license noopener noreferrer"
          >
            CC BY 4.0
            <Image
              className="not-prose"
              src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"
              alt=""
              height={16}
              width={16}
            />
            <Image
              className="not-prose"
              src="https://mirrors.creativecommons.org/presskit/icons/by.svg"
              alt=""
              height={16}
              width={16}
            />
          </a>
          .
        </div>
        <div>
          Any code samples included within the article are additionally licensed under{' '}
          <a
            href="https://opensource.org/license/mit-0"
            target="_blank"
            rel="license noopener noreferrer"
          >
            MIT-0
          </a>
          .
        </div>
      </dd>
    </dl>
  </footer>
);

export default Footer;
