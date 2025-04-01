import Link from 'next/link';

const Tag: React.FC<{ tag: string }> = ({ tag }) => (
  <li className="inline px-2 rounded-sm bg-blue-50 text-gray-600 font-light">{tag}</li>
);

const Card: React.FC<{
  title: string;
  subTitle?: React.ReactNode;
  tags?: string;
  href: string;
  children: React.ReactNode;
}> = ({ title, subTitle, tags, href, children }) => {
  return (
    <div className="px-4 pt-6 mb-6 rounded-md border border-gray-300">
      <Link href={href}>{title}</Link>
      {subTitle && <div className="text-gray-500 text-xs font-light">{subTitle}</div>}
      <p className="mt-3">{children}</p>

      {tags && (
        <ul className="not-prose inline-flex gap-2 mb-6">
          {tags.split(' ').map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Card;
