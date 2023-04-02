import './globals.css'

export const metadata = {
  title: 'Baobab Room',
  description: 'Baobab Room',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
