import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MindFlow AI - Membros',
  description: 'Área de membros profissional para entusiastas de IA',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-black text-white">
        {children}
      </body>
    </html>
  );
}