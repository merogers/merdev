'use client';

import { Poppins } from 'next/font/google';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ReduxProvider from '../redux/provider';
import { Node } from '../types';

import './globals.css';

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '500', '700'] });

export default function RootLayout({ children }: Node) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ReduxProvider>
          <div className="flex flex-col h-full">
            <Header title="My Portfolio" />
            {children}
            <Footer title="My Portfolio" />
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
