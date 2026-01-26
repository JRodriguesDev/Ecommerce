import "./globals.css";
import SessionWrapper from "@/components/sessionProvider";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {  
  return (
    <html lang="en">
      <body className="dark">
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}

export default RootLayout
