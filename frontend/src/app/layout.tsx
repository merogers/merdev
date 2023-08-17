'use client';

import { ReactNode } from 'react';
import { Poppins } from 'next/font/google';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import './globals.css';

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '500', '700'] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={poppins.className}>
          <div className="flex flex-col  h-full">
            <Header title="My Portfolio" />
            {children}
            <Footer title="My Portfolio" />
          </div>
        </body>
      </html>
    </Provider>
  );
}
