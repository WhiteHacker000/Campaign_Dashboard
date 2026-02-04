import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Campaign Analytics Dashboard',
    description: 'View and analyze your marketing campaigns',
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
