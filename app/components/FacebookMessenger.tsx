"use client";

import { useEffect } from "react";
import Script from "next/script";

// Extend Window interface for TypeScript
declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

interface FacebookMessengerProps {
  pageId: string;
  themeColor?: string;
  loggedInGreeting?: string;
  loggedOutGreeting?: string;
}

export default function FacebookMessenger({
  pageId,
  themeColor = "#0084ff",
  loggedInGreeting = "Hi! How can we help you?",
  loggedOutGreeting = "Hi! How can we help you?",
}: FacebookMessengerProps) {
  useEffect(() => {
    console.log("Facebook Messenger component mounted with page ID:", pageId);
  }, [pageId]);

  return (
    <>
      {/* Facebook SDK Root */}
      <div id="fb-root"></div>

      {/* Facebook Customer Chat Plugin */}
      <div id="fb-customer-chat" className="fb-customerchat"></div>

      {/* Facebook SDK Script */}
      <Script
        id="facebook-messenger-sdk"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            console.log("Loading Facebook Messenger SDK...");
            
            var chatbox = document.getElementById('fb-customer-chat');
            if (chatbox) {
              chatbox.setAttribute("page_id", "${pageId}");
              chatbox.setAttribute("attribution", "biz_inbox");
              chatbox.setAttribute("theme_color", "${themeColor}");
              chatbox.setAttribute("logged_in_greeting", "${loggedInGreeting}");
              chatbox.setAttribute("logged_out_greeting", "${loggedOutGreeting}");
              console.log("Facebook Messenger chatbox configured");
            }

            window.fbAsyncInit = function() {
              console.log("Initializing Facebook SDK...");
              FB.init({
                xfbml: true,
                version: 'v18.0'
              });
              console.log("Facebook SDK initialized successfully");
            };

            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) {
                console.log("Facebook SDK already loaded");
                return;
              }
              js = d.createElement(s); 
              js.id = id;
              js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
              js.onload = function() {
                console.log("Facebook SDK script loaded");
              };
              js.onerror = function() {
                console.error("Failed to load Facebook SDK");
              };
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
          `,
        }}
      />
    </>
  );
}
