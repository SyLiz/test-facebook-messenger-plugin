import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Facebook Messenger Integration",
  description: "Website with Facebook Messenger chat integration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div id="fb-root"></div>
        {children}
        
        {/* Facebook SDK Initialization */}
        <Script
          id="fb-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.fbAsyncInit = function() {
                FB.init({
                  xfbml: true,
                  version: 'v21.0'
                });
                console.log("✅ Facebook SDK initialized successfully");
              };
            `,
          }}
        />
        
        {/* Facebook SDK Script */}
        <Script
          id="facebook-jssdk"
          strategy="afterInteractive"
          src="https://connect.facebook.net/en_US/sdk.js"
          async
          defer
          crossOrigin="anonymous"
          onLoad={() => {
            console.log("✅ Facebook SDK loaded successfully");
          }}
          onError={(e) => {
            console.error("❌ Failed to load Facebook SDK:", e);
          }}
        />
      </body>
    </html>
  );
}
