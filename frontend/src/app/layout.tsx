'use client';

import { ReactNode } from 'react';
import './globals.css';
import { Poppins } from 'next/font/google';
import { Provider } from 'react-redux';
import store from '@/lib/redux/store';
import Header from './components/Header';
import Footer from './components/Footer';

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '500', '700'] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={`${poppins.className} flex flex-col bg-secondary-50`}>
          <Header title="My Portfolio" />
          {children}
          <Footer title="My Portfolio" />
        </body>
      </html>
    </Provider>
  );
}
