"use client";

import { useEffect, useState } from "react";

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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log("Facebook Messenger component mounted with page ID:", pageId);

    // Set up Facebook SDK initialization
    window.fbAsyncInit = function () {
      console.log("Initializing Facebook SDK...");
      window.FB.init({
        xfbml: true,
        version: "v19.0",
      });
      console.log("Facebook SDK initialized successfully");
      setIsLoaded(true);
    };

    // Load the Facebook SDK script
    const loadFacebookSDK = () => {
      if (document.getElementById("facebook-jssdk")) {
        console.log("Facebook SDK already exists");
        return;
      }

      console.log("Loading Facebook SDK...");
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      
      script.onload = () => {
        console.log("Facebook SDK script loaded successfully");
      };
      
      script.onerror = (error) => {
        console.error("Failed to load Facebook SDK:", error);
        console.error("Troubleshooting steps:");
        console.error("1. Check if your domain is whitelisted in Facebook Page settings");
        console.error("2. Verify the page ID is correct:", pageId);
        console.error("3. Make sure you're not on localhost (use deployed URL)");
        console.error("4. Check if Facebook is blocked by firewall/ad blocker");
      };

      const firstScript = document.getElementsByTagName("script")[0];
      firstScript.parentNode?.insertBefore(script, firstScript);
    };

    loadFacebookSDK();

    // Cleanup
    return () => {
      const script = document.getElementById("facebook-jssdk");
      if (script) {
        script.remove();
      }
    };
  }, [pageId]);

  return (
    <>
      {/* Facebook SDK Root */}
      <div id="fb-root"></div>

      {/* Facebook Customer Chat Plugin */}
      <div
        id="fb-customer-chat"
        className="fb-customerchat"
        {...({
          page_id: pageId,
          attribution: "biz_inbox",
          theme_color: themeColor,
          logged_in_greeting: loggedInGreeting,
          logged_out_greeting: loggedOutGreeting,
        } as any)}
      ></div>
    </>
  );
}
