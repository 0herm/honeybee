'use client'

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Image from "next/image"



const formSchema = z.object({
    title: z.string(),
    image: z.instanceof(File).optional(),
    recipe: z.array(z.object({
        title: z.string(),
        ingrediens: z.object({
            quantity: z.string(),
            ingredient: z.string(),
        }),
    })),
    instructions: z.string(),
})


export default function Page() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: "",
          image: undefined,
          recipe: [],
          instructions: "",
        },
      })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    const [imageUrl, setImageUrl] = useState<string | null>(null); 

    return(
        <div className="flex flex-row *:min-w-[45vw]">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="max-w-[20rem] p-2 flex flex-col gap-[1rem]">
                        <h1>Add Recipe</h1>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Title" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <Input placeholder="Image" type="file" onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    field.onChange(file);
                                                    setImageUrl(URL.createObjectURL(file)); // Set image URL for preview
                                                }
                                            }} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="instructions"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Instructions</FormLabel>
                                <FormControl>
                                    <Input placeholder="Instruction" {...field}/>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </Form>

            <div className="w-full max-w-[40rem] p-2">
                <h1>Preview:</h1>
                <h1 className="capitalize text-2xl font-semibold">{form.watch("title")}</h1>
                    {imageUrl && <Image src={imageUrl} width={500} height={500} alt="image" className="flex w-[300px] object-cover items-center justify-center pt-4 print:hidden"/>}
                    {/* {recipe.ingredients.map((section, index) => (
                        <div key={index} className="mt-4">
                            <h1 className="capitalize font-semibold">{section.title ?`${section.title}:`:''}</h1>
                            <ul>
                                {section.ingredients.map((item, idx) => (
                                    <li key={idx}>
                                        {item.quantity} {item.ingredient}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))} */}
                    <p className="pt-4">{form.watch("instructions")}</p>
            </div>
        </div>
    )
}