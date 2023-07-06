import "./global.css";
import { ReactNode } from "react";
import { AuthProvider } from "@context/AuthProvider";

export const metadata = {
  title: "Human resources",
  description: "Human resources CV acceptance website",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
