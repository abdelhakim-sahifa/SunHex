## Error Type
Build Error

## Error Message
  × `ssr: false` is not allowed with `next/dynamic` in Server Components. Please move it into a Client Component.

## Build Output
./src/app/page.tsx
Error:   × `ssr: false` is not allowed with `next/dynamic` in Server Components. Please move it into a Client Component.
    ╭─[C:\Users\abdelhakim sahifa\Desktop\SunHex - render\api-src\src\app\page.tsx:5:1]
  2 │     import dynamic from 'next/dynamic';
  3 │     import ThemeToggle from '@/components/ThemeToggle';
  4 │     
  5 │ ╭─▶ const BackgroundAnimation = dynamic(() => import('@/components/BackgroundAnimation'), {
  6 │ │     ssr: false
  7 │ ╰─▶ });
  8 │     
  9 │     export default function Home() {
 10 │       return (
    ╰────

Next.js version: 15.5.4 (Webpack)
