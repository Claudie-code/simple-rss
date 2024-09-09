"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  url: z
    .string()
    .min(1, {
      message: "Feed URL is required",
    })
    .url({
      message: "Invalid URL format",
    }),
});

const AddFeedForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/feeds", values);
      toast.success("Feed created");
      form.reset();
      router.refresh();
    } catch (error) {
      toast.error("Feed URL is invalid or unreachable.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="grow">
              {/* <FormLabel>Feed title</FormLabel> */}
              <FormControl>
                <Input
                  className="rounded-none rounded-l"
                  disabled={isSubmitting}
                  placeholder="Add feed URL"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
                What will you teach in this course?
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!isValid || isSubmitting}
          className="rounded-none rounded-r"
        >
          +
        </Button>
      </form>
    </Form>
  );
};

export default AddFeedForm;
