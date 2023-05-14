import { Nunito } from "next/font/google";

import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/UI/modals/RegisterModal";
import LoginModal from "./components/UI/modals/LoginModal";
import ToasterProvider from "./providers/ToasterProvider";

import "./globals.css";
import { getCurrentUser } from "./actions/getCurrentUser";

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
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <ToasterProvider />
        <Navbar currentUser={currentUser} />
        <LoginModal />
        <RegisterModal />
        {children}
      </body>
    </html>
  );
}
