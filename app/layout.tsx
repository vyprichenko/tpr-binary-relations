import './globals.css';
import { Roboto } from 'next/font/google';

const inter = Roboto({
    subsets: ['latin', 'cyrillic-ext'],
    weight: ['300', '400', '500', '700']
});

export const metadata = {
    title: 'Властивості бінарних відношень',
    description: 'ПРАКТИКА ПРИЙНЯТТЯ РІШЕНЬ. Властивості бінарних відношень.'
};

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="uk">
            <body className={inter.className}>{children}</body>
        </html>
    );
}

