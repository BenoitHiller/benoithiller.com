import Image from 'next/image';
import Timestamp from '@/components/Timestamp';

const Footer: React.FC<{ publishedAt?: Date; updatedAt?: Date }> = ({ publishedAt, updatedAt }) => (
  <footer className="print:hidden my-8 pt-6 border-t-1 border-t-gray-950/5 expand-to-edge">
    <dl className="prose">
      <dt>Author</dt>
      <dd>Benoit Hiller</dd>
      {publishedAt && (
        <>
          <dt>Published At</dt>
          <dd>
            <Timestamp value={publishedAt} />
          </dd>
        </>
      )}
      {updatedAt && (
        <>
          <dt>Updated At</dt>
          <dd>
            <Timestamp value={updatedAt} />
          </dd>
        </>
      )}

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
            target="_:blank"
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
