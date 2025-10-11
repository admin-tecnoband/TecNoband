"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  text: string;
};

export function Chatbot({
  systemPrompt = "You are TechNoBand's assistant. Answer concisely, help users learn about the product, pricing, and IoT management dashboard features. Be friendly.",
}: {
  systemPrompt?: string;
}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "system-1", role: "system", text: systemPrompt },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GORQ_API_KEY;

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Show welcome message when chatbot opens
  useEffect(() => {
    if (open && messages.length === 1) {
      const welcomeMsg: Message = {
        id: "welcome-1",
        role: "assistant",
        text: "👋 Hi! I'm TechNoBand's AI assistant. How can I help you today?",
      };
      setMessages((m) => [...m, welcomeMsg]);
    }
  }, [open]);

  async function sendMessage(text: string) {
    if (!text) return;
    const userMsg: Message = { id: String(Date.now()), role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      if (!apiKey) {
        throw new Error(
          "Gorq API key missing. Set NEXT_PUBLIC_GORQ_API_KEY in your environment."
        );
      }

      // Build simple Gorq-compatible request (chat completion)
      const payload = {
        model: "openai/gpt-oss-20b",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages
            .filter((m) => m.role !== "system")
            .map((m) => ({ role: m.role, content: m.text })),
          { role: "user", content: text },
        ],
      };

      const resp = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!resp.ok) {
        const body = await resp.text();
        throw new Error(`API error: ${resp.status} ${body}`);
      }

      const data = await resp.json();
      // Try to pull assistant text in common locations
      const assistantText =
        data?.choices?.[0]?.message?.content ??
        data?.choices?.[0]?.message ??
        JSON.stringify(data);

      const assistantMsg: Message = {
        id: String(Date.now() + 1),
        role: "assistant",
        text: String(assistantText),
      };
      setMessages((m) => [...m, assistantMsg]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      const errMsg: Message = {
        id: String(Date.now() + 2),
        role: "assistant",
        text: `⚠️ ${message}`,
      };
      setMessages((m) => [...m, errMsg]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-20 right-6 z-50 w-[90vw] max-w-md transition-all duration-300 ease-out",
          open
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        )}
      >
        <div className='bg-card border border-border rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm'>
          {/* Header */}
          <div className='bg-gradient-to-r from-primary/90 to-primary px-4 py-3 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center'>
                <Sparkles className='w-4 h-4 text-white' />
              </div>
              <div>
                <h3 className='font-semibold text-white text-sm'>
                  TechNoBand Assistant
                </h3>
                <p className='text-xs text-white/80'>AI-powered support</p>
              </div>
            </div>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setOpen(false)}
              className='text-white hover:bg-white/20 h-8 w-8 p-0'
            >
              <X className='w-4 h-4' />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className='h-96 bg-background/50'>
            <div className='p-4 space-y-4'>
              {messages
                .filter((m) => m.role !== "system")
                .map((m, idx) => (
                  <div
                    key={m.id}
                    className={cn(
                      "flex gap-2 animate-in fade-in slide-in-from-bottom-2",
                      m.role === "user" ? "justify-end" : "justify-start"
                    )}
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    {m.role === "assistant" && (
                      <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1'>
                        <Sparkles className='w-4 h-4 text-primary' />
                      </div>
                    )}
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-2.5 max-w-[80%] shadow-sm",
                        m.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-muted/50 text-foreground rounded-bl-sm border border-border/50"
                      )}
                    >
                      <p className='text-sm leading-relaxed whitespace-pre-wrap break-words'>
                        {m.text}
                      </p>
                    </div>
                    {m.role === "user" && (
                      <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1 text-xs font-bold text-primary-foreground'>
                        U
                      </div>
                    )}
                  </div>
                ))}
              {loading && (
                <div className='flex gap-2 justify-start animate-in fade-in'>
                  <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0'>
                    <Sparkles className='w-4 h-4 text-primary animate-pulse' />
                  </div>
                  <div className='bg-muted/50 border border-border/50 rounded-2xl rounded-bl-sm px-4 py-2.5'>
                    <div className='flex gap-1'>
                      <div
                        className='w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce'
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className='w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce'
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className='w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce'
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className='p-4 border-t bg-background/80 backdrop-blur-sm'>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className='flex gap-2'
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Ask about devices, pricing, features...'
                disabled={loading}
                className='flex-1 bg-background focus-visible:ring-primary'
              />
              <Button
                type='submit'
                disabled={loading || !input.trim()}
                size='icon'
                className='shrink-0'
              >
                <Send className='w-4 h-4' />
              </Button>
            </form>
            <p className='text-xs text-muted-foreground mt-2 text-center'>
              Powered by AI • TechNoBand
            </p>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl transition-all duration-300",
          "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground",
          "hover:shadow-glow-lg hover:scale-110 active:scale-95",
          "flex items-center justify-center group"
        )}
        title='Chat with TechNoBand AI'
      >
        <MessageCircle
          className={cn(
            "w-6 h-6 transition-all duration-300",
            open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
          )}
        />
        <X
          className={cn(
            "w-6 h-6 absolute transition-all duration-300",
            open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
          )}
        />
        {!open && messages.filter((m) => m.role !== "system").length > 1 && (
          <span className='absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center font-bold animate-pulse'>
            {messages.filter((m) => m.role === "assistant").length}
          </span>
        )}
      </button>
    </>
  );
}
