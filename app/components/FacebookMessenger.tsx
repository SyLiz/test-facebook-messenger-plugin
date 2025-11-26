"use client";

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
  return (
    <div
      className="fb-customerchat"
      {...({
        attribution: "biz_inbox",
        page_id: pageId,
        theme_color: themeColor,
        logged_in_greeting: loggedInGreeting,
        logged_out_greeting: loggedOutGreeting,
      } as any)}
    ></div>
  );
}
