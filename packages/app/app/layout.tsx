import { Roboto_Mono } from '@next/font/google';
import "@/core/styles/global.scss";

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${roboto_mono.variable}`}>
      <head />
      <body>{children}</body>
    </html>
  )
}
