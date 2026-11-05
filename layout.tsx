import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Mireya Bertolli | Mis XV Años', description: 'A Winter Wonderland — January 23, 2027' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
