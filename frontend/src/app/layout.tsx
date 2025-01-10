import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'; 
import { Roboto } from 'next/font/google'; 
import MainNavbar from "@/components/Nav/MainNavbar";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript"
import AppThemeProvider from "@/components/context/AppThemeContext";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "Services Map",
  description: "Services Map",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
          <html lang="en" suppressHydrationWarning>
            <body className={roboto.variable} >
              <AppRouterCacheProvider options={{enableCssLayer: false}}>
                <AppThemeProvider>
                <InitColorSchemeScript attribute="class" />
                    <MainNavbar />
                      {children}
                </AppThemeProvider>
              </AppRouterCacheProvider>
            </body>
        </html>
  );
}
