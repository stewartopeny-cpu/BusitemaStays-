import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title:"Busitema Stays", description:"Compare affordable hostels, room types and services near Busitema University.", icons:{icon:"/logo-mark.svg",shortcut:"/logo-mark.svg"} };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
