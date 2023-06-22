import "@styles/global.css";
import { ReactNode } from "react";
import Provider from "@components/Provider";
import { AuthProvider } from "@context/AuthProvider";

export const metadata = {
  title: "Human resources",
  description: "Human resources CV acceptance website",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Provider session={undefined}>
          <AuthProvider>
            <main>{children}</main>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
