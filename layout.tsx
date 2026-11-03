import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Mireya Bertolli | A Winter Wonderland', description: 'You are invited to celebrate Mireya’s Mis XV Años — January 23, 2027.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
