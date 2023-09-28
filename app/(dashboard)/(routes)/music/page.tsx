"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmptyState, Heading, Loader } from "@/components/base";
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
const Page = () => {
  const router = useRouter();
  const [music, setMusic] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);

      const res = await axios.post("/api/music", values);
      setMusic(res.data.audio);
      form.reset();
    } catch (e) {
      console.log(e);
    } finally {
      router.refresh();
    }
  };

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  const randomPlaceholder = () => {
    const prompts = ["Violin Concerto in D major.", "Guitar solo"];
    const random = Math.floor(Math.random() * prompts.length);
    return prompts[random];
  };
  return (
    <div>
      <Heading
        title="Music Generation"
        description="Turn your text into music"
        icon={Music}
        iconColor={"text-pink-700"}
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
          {!music && !isLoading && <EmptyState label="No music generated" />}
          {music && (
            <audio controls className="w-full mt-8">
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
