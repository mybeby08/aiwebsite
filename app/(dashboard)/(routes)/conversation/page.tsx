"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmptyState, Heading, Loader } from "@/components/base";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionMessageParam } from "openai/resources/chat/index.mjs";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/useravatar";
import BotAvatar from "@/components/botavatar";
import { useProModal } from "@/hooks/useProModal";
const Page = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const res = await axios.post("/api/conversations", {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, res.data]);
      form.reset();
    } catch (error: any) {
      //FIX:PROMODAL ON 403
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }
    } finally {
      router.refresh();
    }
  };
  const randomPlaceholder = () => {
    const prompts = [
      "What is the best way to cook chicken?",
      "What is the best way to learn?",
      "Kevin is a software engineer, what is a software engineer?",
      "What is the best way to learn to code?",
    ];
    const random = Math.floor(Math.random() * prompts.length);
    return prompts[random];
  };
  return (
    <div>
      <Heading
        title="Conversation"
        description="Advanced AI conversation"
        icon={MessageSquare}
        iconColor={"text-violet-400"}
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              className="rounded-lg border border-slate-800 w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none font-semibold focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        {...field}
                        placeholder={randomPlaceholder()}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 bg-slate-800/90 text-md font-bold hover:bg-slate-700 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-2">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <EmptyState label="No conversation started yet." />
          )}
          <div className="flex flex-col-reverse gap-y-2">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "p-4 w-full flex items-start gap-x-8 rounded.lg",
                  message.role === "user"
                    ? "bg-slate-600 border border-slate-800"
                    : "bg-slate-800 border border-slate-600"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
