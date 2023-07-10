import { type FC, type PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo state machine',
  description: `Tutorial on how to use XState to build a todo app.
  https://www.youtube.com/watch?v=_5dAlGaqhck&list=PLvWgkXBB3dd4ocSi17y1JmMmz7S5cV8vI`,
}

export const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body className={inter.className}>{children}</body>
  </html>
);

export default RootLayout;