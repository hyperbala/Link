import { Inter } from "next/font/google";
import "./globals.css";
import { SocketProvider } from "@/context/socket";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LinkUp",
  description: "One on One interaction app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SocketProvider>
        <body className={inter.className}>{children}</body>
      </SocketProvider>
    </html>
  );
}
