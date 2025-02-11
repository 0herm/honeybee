"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray, type Control } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Image from "next/image"
import { Plus, Minus } from "lucide-react"

const formSchema = z.object({
	title: z.string(),
	image: z.instanceof(File).optional(),
	sections: z.array(
		z.object({
			title: z.string().optional(),
			ingredients: z.array(
				z.object({
					quantity: z.string(),
					ingredient: z.string(),
				}),
			),
		}),
	),
	instructions: z.string(),
})

export default function Page() {
  	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
			defaultValues: {
			title: "",
			image: undefined,
			sections: [{ title: "", ingredients: [{ quantity: "", ingredient: "" }] }],
			instructions: "",
		},
  	})

	const {
		fields: sectionFields,
		append: appendSection,
		remove: removeSection,
	} = useFieldArray({
		control: form.control,
		name: "sections",
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
	}

  	const [imageUrl, setImageUrl] = useState<string | null>(null)

	return (
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
								<Input
									placeholder="Image"
									type="file"
									onChange={(e) => {
										const file = e.target.files?.[0]
										if (file) {
										field.onChange(file)
										setImageUrl(URL.createObjectURL(file))
										}
									}}
								/>
								</FormControl>
								<FormMessage />
								</FormItem>
							)}
					/>
					
					{sectionFields.map((section, sectionIndex) => (
                        <div key={section.id} className="border p-4 rounded-md">
                            <FormField
                                control={form.control}
                                name={`sections.${sectionIndex}.title`}
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Section Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Section Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="mt-2">
                                <IngredientFields nestIndex={sectionIndex} control={form.control} />
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => removeSection(sectionIndex)}
                                className="mt-2"
                                disabled={sectionFields.length === 1}
                            >
                                Remove Section
                            </Button>
                        </div>
					))}
					<Button
                        type="button"
                        variant="outline"
                        onClick={() => appendSection({ title: "", ingredients: [{ quantity: "", ingredient: "" }] })}
					>
					    <Plus className="h-4 w-4 mr-2" />
					    Add Section
					</Button>
					
                    <FormField
                        control={form.control}
                        name="instructions"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Instructions</FormLabel>
                            <FormControl>
                                <Input placeholder="Instructions" {...field} />
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
			{imageUrl && (
                <Image
                    src={imageUrl || "/placeholder.svg"}
                    width={500}
                    height={500}
                    alt="Recipe image"
                    className="flex w-[300px] object-cover items-center justify-center pt-4 print:hidden"
                />
			)}
			{form.watch("sections").map((section, index) => (
                <div key={index} className="mt-4">
                    <h2 className="capitalize font-semibold">
                        {section.title ? `${section.title}:` : ''}
                    </h2>
                    <ul>
                    {section.ingredients.map((item, idx) => (
                        <li key={idx}>
                        {item.quantity} {item.ingredient}
                        </li>
                    ))}
                    </ul>
                </div>
			))}
			<p className="pt-4">{form.watch("instructions")}</p>
		</div>
		</div>
	)
	}

	function IngredientFields({ nestIndex, control }: {nestIndex:number, control:Control<z.infer<typeof formSchema>>}) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: `sections.${nestIndex}.ingredients`,
	})

	return (
		<div>
		{fields.map((item, k) => (
			<div key={item.id} className="flex gap-2 mt-2">
			<FormField
				control={control}
				name={`sections.${nestIndex}.ingredients.${k}.quantity`}
				render={({ field }) => (
				<FormItem className="flex-1">
					<FormControl>
					<Input placeholder="Quantity" {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
				)}
			/>
			<FormField
				control={control}
				name={`sections.${nestIndex}.ingredients.${k}.ingredient`}
				render={({ field }) => (
				<FormItem className="flex-1">
					<FormControl>
					<Input placeholder="Ingredient" {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
				)}
			/>
			<Button type="button" variant="outline" size="icon" onClick={() => remove(k)} disabled={fields.length === 1}>
				<Minus className="h-4 w-4" />
			</Button>
			</div>
		))}
		<Button type="button" variant="outline" onClick={() => append({ quantity: "", ingredient: "" })} className="mt-2">
			<Plus className="h-4 w-4 mr-2" />
			Add Ingredient
		</Button>
		</div>
	)
}

