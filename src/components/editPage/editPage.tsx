'use client'

import { recipeTypes, recipeDifficulty } from '@parent/constants'
import { useRouter } from 'next/navigation'
import { useForm, useFieldArray, type Control } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { ArrowLeft, Upload } from 'lucide-react'
import { Plus, Minus } from 'lucide-react'
import { submitForm } from '@/app/actions'
import { useActionState, useEffect } from 'react'
import { formSchema, FormState, formSchemaData, defaultSchemaData } from '@/lib/schema'
import Image from 'next/image'

const initialState: FormState = {
    success: null
}

export default function EditPage({ values, isNew, id }:{ values?: formSchemaData, isNew: boolean, id?: number }) {
    const [state, formAction, isPending] = useActionState(submitForm, initialState)
    const router = useRouter()

    const defaultValues = values ? values : defaultSchemaData

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
        mode: 'onBlur',
    })
    const { fields: sectionFields, append: appendSection, remove: removeSection, } = useFieldArray({ control: form.control, name: 'sections', })

    
    function handleSubmit(formData: FormData) {
        formData.set('sections', JSON.stringify(form.getValues('sections')))
        const image = form.getValues('image')
        if (image instanceof Blob) {
            formData.set('image', image)
        }
        formData.set('instructions', JSON.stringify(form.getValues('instructions')))
        return formAction(formData)
    }

    useEffect(() => {
        if (state.success) {
            toast.success('Form submitted successfully!')
            router.back()
        } else if (state.success === false) {
            toast.error(state.error || 'Error: Please try again later.')
        }
    }, [state])

    return (
        <div className='relative w-full'>
            <Form {...form}>
                <form className='space-y-8' action={handleSubmit} onSubmit={() => form.trigger()}>
                    <div className='max-w-3xl mx-auto p-2 flex flex-col gap-[1rem]'>
                        <Button className='w-fit text-base cursor-pointer hover:bg-transparent dark:hover:bg-transparent' variant='ghost' size='icon' onClick={() => router.back()}>
                            <ArrowLeft />
                            Back to recipe
                        </Button>
                        <h1 className='text-2xl'>{isNew ? 'Add Recipe' : 'Edit Recipe'}</h1>

                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Title' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='grid grid-cols-2 gap-[2rem]'>
                            <FormField
                                control={form.control}
                                name='category'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select 
                                            name='category'
                                            onValueChange={(value) => {
                                                field.onChange(value)
                                                form.clearErrors('category')
                                            }}
                                        >
                                            <FormControl className='w-full'>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Select category' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.entries(recipeTypes).map(([key, value]) => (
                                                    <SelectItem key={key} value={key}>
                                                        {value}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='difficulty'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Difficulty</FormLabel>
                                        <Select 
                                            name='difficulty'
                                            onValueChange={(value) => {
                                                field.onChange(value)
                                                form.clearErrors('difficulty')
                                            }}
                                        >
                                            <FormControl className='w-full'>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Select difficulty' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {Object.entries(recipeDifficulty).map(([key, value]) => (
                                                    <SelectItem key={key} value={key}>
                                                        {value}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='grid grid-cols-2 gap-[2rem]'>
                            <FormField
                                control={form.control}
                                name='quantity'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Quantity' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='duration'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Duration</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Duration (min)' type='number' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='flex flex-col gap-[0.5rem]'>
                            <FormLabel>Ingredients</FormLabel>
                            <div className='w-full flex flex-col justify-center items-center bg-input/30 border border-input rounded-md p-[1rem]'>
                                <Image
                                    src={form.watch('image') instanceof File ? URL.createObjectURL(form.watch('image') as Blob) : typeof form.watch('image') === 'string' ? form.watch('image') as string : '/images/fallback.svg'}
                                    width={300}
                                    height={300}
                                    alt='Recipe image'
                                    className='object-cover rounded-md'
                                />

                                <FormField
                                    control={form.control}
                                    name='image'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel />
                                            <FormControl>
                                                <div>
                                                    <Button
                                                        type='button'
                                                        onClick={() => document.getElementById('file-input')?.click()}
                                                        className='w-full'
                                                    >
                                                        <Upload />
                                                        Select Image
                                                    </Button>
                                                    <Input
                                                        id='file-input'
                                                        type='file'
                                                        className='hidden'
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0]
                                                            if (file) field.onChange(file); form.clearErrors('image')
                                                        }}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <FormLabel>Ingredients</FormLabel>
                        {sectionFields.map((section, sectionIndex) => (
                            <div key={section.id} className='border p-4 rounded-md'>
                                <FormField
                                    control={form.control}
                                    name={`sections.${sectionIndex}.title`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Section Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder='Section Title' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className='mt-2'>
                                    <IngredientFields nestIndex={sectionIndex} control={form.control} />
                                </div>
                                <Button
                                    type='button'
                                    variant='outline'
                                    onClick={() => removeSection(sectionIndex)}
                                    className='mt-2'
                                    disabled={sectionFields.length === 1}
                                >
                                    <Minus className='h-4 w-4 mr-2' />
                                    Remove Section
                                </Button>
                            </div>
                        ))}
                        <Button
                            type='button'
                            variant='outline'
                            onClick={() => appendSection({ title: '', ingredients: [{ quantity: '', ingredient: '' }] })}
                        >
                            <Plus className='h-4 w-4 mr-2' />
                            Add Section
                        </Button>

                        <FormField
                            control={form.control}
                            name='instructions'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Instructions</FormLabel>
                                    <div className='flex flex-col gap-2'>
                                        {form.watch('instructions').map((instruction, index) => (
                                            <div key={index} className='flex gap-2'>
                                                <FormControl>
                                                    <Input
                                                        placeholder={`Instruction ${index + 1}`}
                                                        value={instruction}
                                                        onChange={(e) => {
                                                            const updatedInstructions = [...form.watch('instructions')]
                                                            updatedInstructions[index] = e.target.value
                                                            field.onChange(updatedInstructions)
                                                        }}
                                                    />
                                                </FormControl>
                                                <Button
                                                    type='button'
                                                    variant='outline'
                                                    size='icon'
                                                    onClick={() => {
                                                        const updatedInstructions = [...form.watch('instructions')]
                                                        updatedInstructions.splice(index, 1)
                                                        field.onChange(updatedInstructions)
                                                    }}
                                                    disabled={form.watch('instructions').length === 1}
                                                >
                                                    <Minus className='h-4 w-4' />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button
                                            type='button'
                                            variant='outline'
                                            onClick={() => field.onChange([...form.watch('instructions'), ''])}
                                        >
                                            <Plus className='h-4 w-4 mr-2' />
                                            Add Instruction
                                        </Button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {!isNew && id &&
                            <FormField
                                control={form.control}
                                name='id'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type='hidden' {...field} value={id} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        }

                        <Button type='submit' disabled={isPending}>Submit {isPending ? '...' : ''}</Button>
                    </div>
                </form>
            </Form>
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
                <div key={item.id} className='flex gap-2 mt-2'>
                    <FormField
                        control={control}
                        name={`sections.${nestIndex}.ingredients.${k}.quantity`}
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormControl>
                                    <Input placeholder='Quantity' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name={`sections.${nestIndex}.ingredients.${k}.ingredient`}
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormControl>
                                    <Input placeholder='Ingredient' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='button' variant='outline' size='icon' onClick={() => remove(k)} disabled={fields.length === 1}>
                        <Minus className='h-4 w-4' />
                    </Button>
                </div>
            ))}
            <Button type='button' variant='outline' onClick={() => append({ quantity: '', ingredient: '' })} className='mt-2'>
                <Plus className='h-4 w-4 mr-2' />
                Add Ingredient
            </Button>
        </div>
    )
}