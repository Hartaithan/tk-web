import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FC, PropsWithChildren } from "react";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Транспортное приложение АСОП",
  description:
    "Мобильное приложение АСОП (Автоматизированная система оплаты проезда) - удобный инструмент для оплаты проезда смартфоном и проверки баланса транспортных карт",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
