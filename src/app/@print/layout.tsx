import './print.css';
import type { Viewport } from 'next';

export const viewport: Viewport = {
  // 8.5 inches at the CSS standard of 96dpi
  width: `${8.5 * 96}px`,
  // Show the whole thing zoomed out
  initialScale: undefined
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
