import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from '@/store/Provider';

export const metadata = {
  title: 'City Projects',
  description: 'Real-time city project listings',
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}