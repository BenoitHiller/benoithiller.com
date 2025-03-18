import Link from 'next/link';

const Tag: React.FC<{ tag: string }> = ({ tag }) => (
  <li className="inline px-2 rounded-sm bg-blue-50 text-gray-500 font-light">{tag}</li>
);

const Card: React.FC<{ title: string; tags?: string; href: string; children: React.ReactNode }> = ({
  title,
  tags,
  href,
  children
}) => {
  return (
    <div className="px-4 pt-6 mb-6 rounded-md border border-gray-300">
      <Link href={href}>{title}</Link>
      <p>{children}</p>

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
