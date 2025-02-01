import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'XYFlow App',
  description: 'A simple app using XYFlow and Next.js',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen w-screen flex">
        {children}
      </body>
    </html>
  );
}
