import "./globals.css";
import { Nunito, Roboto_Mono } from "next/font/google";
import Nav from "./Components/Nav";

const nunito = Nunito({
  subsets: ["latin"],
  weight: "800",
  display: "swap",
  variable: "--font-nunito",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
  weight: "500",
});

export const metadata = {
  title: "Rebirth glossary",
  description: "a glossary for the rebirth sessions discussed",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${roboto_mono.variable} bg-back bg-cover bg-no-repeat`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
