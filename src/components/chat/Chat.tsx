"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Message } from "../../../types/Message";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { toast } from "../ui/use-toast";

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const { data: session, status } = useSession();
  const t = useTranslations("Chat");
  const buttonTranslation = useTranslations("Signup");
  const toastTranslation = useTranslations("Toast");
  const [isLoading, setIsLoading] = useState(false);

  // Load messages from the server when component mounts
  useEffect(() => {
    const loadMessages = async () => {
      const response = await fetch("/api/messages");
      console.log(response);
      const savedMessages = await response.json();
      setMessages(savedMessages);
    };
    loadMessages();
  }, []);

  // Send a new message to the server
  const handleSend = async () => {
    setIsLoading(true);
    try {
      if (input.trim() !== "") {
        const newMessage = input;
        setInput("");

        // Get username
        const username = session?.user.username || "Anonymous" + Math.random();

        // Send the new message to the server
        const response = await fetch("/api/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: newMessage,
            username: username,
            timeStamp: new Date(),
          }),
        });

         // If the response is ok, reload texts and add text locally, otherwise display an error toast
        if (response?.ok) {
          // Reload the messages from the server
          const messages = await fetch("/api/messages");
          const updatedMessages = await messages.json();
          setMessages(updatedMessages);
        } else {
          toast({
            description: toastTranslation("addMessage.fail"),
            variant: "destructive",
            duration: 2000,
          });
        }
      }
    } catch (error) {
      toast({
        description: toastTranslation("addMessage.error"),
        variant: "destructive",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger className="fixed bottom-5 right-5 bg-primary text-primary-foreground rounded-full p-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="white"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          />
        </svg>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader className="mb-4">
          <SheetTitle className="text-3xl">{t("title")}</SheetTitle>
          <SheetDescription>{t("description")}</SheetDescription>
        </SheetHeader>
        {status === "loading" ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : session ? (
          <>
            {/* Messages */}
            <ScrollArea className="w-full h-5/6 rounded-md border border-primary p-4 mb-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 mb-4 relative border-secondary-foreground/30"
                >
                  <h4
                    className={
                      message.username === session?.user.username
                        ? "text-red-500"
                        : "text-primary mb-1"
                    }
                  >
                    {message.username}
                  </h4>
                  <p>{message.content}</p>
                  <span className="absolute bottom-0 right-1 text-xs text-gray-500">
                    {new Date(message.timeStamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </ScrollArea>

            {/* Input and Button */}
            <div className="flex gap-4">
              <Input
                className="border border-primary focus-visible:ring-1 focus-visible:ring-offset-0"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={isLoading}
              />
              <Button
                className="bg-primary text-primary-foreground"
                onClick={handleSend}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="white"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                    />
                  </svg>
                )}
              </Button>
            </div>
          </>
        ) : (
          <SheetFooter>
            <div className="w-full flex flex-col gap-3 items-center justify-center">
              {/* No user text */}
              <p className="text-center">{t("noUser")}</p>
              <SheetClose asChild>
                {/* Login link */}
                <Link
                  href="/signin"
                  className="text-primary hover:text-primary/70"
                >
                  <p className="text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                    {buttonTranslation("loginHere")}
                  </p>
                </Link>
              </SheetClose>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Chat;
