"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmptyState, Heading, Loader } from "@/components/base";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
const Page = () => {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolutions: "256x256x",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      const res = await axios.post("/api/image", values);

      const urls = res.data.map((image: { url: string }) => image.url);

      setImages(urls);

      form.reset();
    } catch (e) {
      console.log(e);
    } finally {
      router.refresh();
    }
  };
  return (
    <div>
      <Heading
        title="Image Generation"
        description="Advanced Image Generation"
        icon={ImageIcon}
        iconColor={"text-yellow-400"}
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
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none font-semibold focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        {...field}
                        placeholder="A picture of a cat eating banana"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                name="resolutions"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
            <div className="p-20 w-full">
              <Loader />
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <EmptyState label="No images generated." />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {images.map((image) => (
              <Card key={image} className="rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                  <Image alt="image" src={image} fill />
                </div>
                <CardFooter className="p-1">
                  <Button
                    onClick={() => window.open(image)}
                    variant="secondary"
                    className="w-full bg-slate-800 text-lg"
                  >
                    <Download className="h-6 w-6 mr-2" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
