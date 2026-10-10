'use client';

import classNames from 'classnames';
import { usePathname } from 'next/navigation';

const NavItem: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  const pathname = usePathname();

  return (
    <li>
      <a
        className={classNames('inline-block text-base/8 text-gray-600 hover:text-gray-950', {
          'font-semibold': href == pathname
        })}
        href={href}
      >
        {children}
      </a>
    </li>
  );
};

const Navigation: React.FC = () => (
  <div className="flex flex-col gap-2">
    <a href="/parsing">
      <h3>Parsing</h3>
    </a>
    <ul className="flex flex-col pl-3">
      <NavItem href="/parsing/definitions">1. Definitions</NavItem>
      <NavItem href="/parsing/lr0">2. LR(0)</NavItem>
      <NavItem href="/parsing/lalr">3. LALR(0)</NavItem>
    </ul>
  </div>
);

export default Navigation;
