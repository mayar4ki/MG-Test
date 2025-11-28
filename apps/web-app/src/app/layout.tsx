import { ThemeProvider } from '@acme/ui/provider/theme-provider';
import { Toaster } from '@acme/ui/sonner';
import { siteName, tagline } from '@acme/white-label/web-app';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import AppLayout from '~/_components/layout/AppLayout';
import { ReactQueryProvider } from '~/_components/providers/ReactQueryProvider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: siteName,
  description: tagline,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

          <ReactQueryProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <AppLayout>
                <Toaster />
                {children}
              </AppLayout>
            </ThemeProvider>
          </ReactQueryProvider>

      </body>
    </html>
  );
}
