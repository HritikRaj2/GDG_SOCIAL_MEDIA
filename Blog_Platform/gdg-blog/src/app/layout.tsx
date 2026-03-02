import { AuthProvider } from '@/context/AuthContext';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'GDG Social Media',
  description: 'GDG Community Social Media Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-gray-950 min-h-screen" suppressHydrationWarning={true}>
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1f2937',
                color: '#f9fafb',
                border: '1px solid #374151',
              },
              success: {
                iconTheme: {
                  primary: '#7c3aed',
                  secondary: '#f9fafb',
                },
              },
            }}
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
