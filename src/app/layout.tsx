import { Nunito } from "next/font/google";

import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/UI/modals/RegisterModal";
import LoginModal from "./components/UI/modals/LoginModal";
import ToasterProvider from "./providers/ToasterProvider";
import RentModal from "./components/UI/modals/RentModal";
import { getCurrentUser } from "./actions/getCurrentUser";
import type { SafeUser } from "./types";

import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Groundbnb",
  description:
    "Groundbnb is a vacation rental online marketplace company based in San Francisco, California, United States. It was founded in August 2008 and operates in 191 countries and territories.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = (await getCurrentUser()) as SafeUser | null;

  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        <Navbar currentUser={currentUser} />
        <LoginModal />
        <RegisterModal />
        <RentModal />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
