'use client'

import { recipeTypes } from '@parent/constants'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm, useFieldArray, type Control } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { submitForm } from '@/app/actions'
import { useActionState, useEffect } from 'react'
import { formSchema, FormState, formSchemaData, defaultSchemaData } from '@/lib/schema'

const initialState: FormState = {
    error: '',
    success: false,
    initial: true
}

export default function EditPage({ values, isNew, id }:{ values?: formSchemaData, isNew: boolean, id?: number }) {
    const [state, formAction, isPending] = useActionState(submitForm, initialState)
    const { toast } = useToast()
    const router = useRouter()

    const defaultValues = values ? values : defaultSchemaData

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
        mode: 'onBlur',
    })
    const { fields: sectionFields, append: appendSection, remove: removeSection, } = useFieldArray({ control: form.control, name: 'sections', })

    async function handleSubmit() {
        const values = form.getValues()
        const newFormData = new FormData()
        newFormData.append('title', values.title)
        newFormData.append('date', values.date.toISOString())
        newFormData.append('type', values.type)
        newFormData.append('quantity', values.quantity)
        newFormData.append('time', values.time.toString())
        newFormData.append('image', values.image)
        newFormData.append('sections', JSON.stringify(values.sections))
        newFormData.append('instructions', values.instructions)
        if (id !== undefined) newFormData.append('id', id.toString())
        newFormData.append('isNew', isNew.toString())
    
        return formAction(newFormData)
    }

    useEffect(() => {
        if (state.success) {
            toast({
                title: 'Form submitted successfully!',
                description: '',
            })
            router.back()
        } else if (!state.success && !state.initial) {
            toast({
                title: 'Error',
                description: state.error || 'Please try again later.',
                variant: 'destructive',
            })
        }
    }, [state])

    return (
        <div className='flex flex-col'>
            <Button className='w-[4rem] mb-[2rem]' variant='outline' onClick={() => router.back()}>
                Back
            </Button>

            <div className='flex flex-row *:min-w-[45vw]'>
                <Form {...form}>
                    <form className='space-y-8' action={() => {handleSubmit(); form.trigger()}}>
                        <div className='max-w-[20rem] p-2 flex flex-col gap-[1rem]'>
                            <h1>Add Recipe</h1>
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
                            <FormField
                                control={form.control}
                                name='date'
                                render={({ field }) => (
                                    <FormItem className='flex flex-col'>
                                        <Popover>
                                            <FormLabel>Date</FormLabel>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={'outline'}
                                                        className={cn(
                                                            'w-[240px] pl-3 text-left font-normal',
                                                            !field.value && 'text-muted-foreground'
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, 'PPP')
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className='w-auto p-0' align='start'>
                                                <Calendar
                                                    mode='single'
                                                    selected={field.value ? new Date(field.value) : undefined}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date('1900-01-01')
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='type'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <Select onValueChange={(value) => { form.clearErrors('type'); field.onChange(value) }} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder='Select type' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    Object.entries(recipeTypes).map(([key, value]) => {
                                                        return <SelectItem key={key} value={key}>{value}</SelectItem>
                                                    })
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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
                                name='time'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Time</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Time (minutes)' type='number' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='image'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image</FormLabel>
                                        <FormControl> 
                                            <Input
                                                placeholder='Image'
                                                type='file'
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0]
                                                    if (file) field.onChange(file); form.clearErrors('image')
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                    
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
                                        <FormControl>
                                            <Textarea placeholder='Instructions' {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type='submit' disabled={isPending}>Submit {isPending ? '...' : ''}</Button>
                        </div>
                    </form>
                </Form>

                {/* PREVIEW: */}
                <div className='w-full max-w-[40rem] p-2'>
                    <h1>Preview:</h1>
                    <h1 className='capitalize text-2xl font-semibold'>{form.watch('title')}</h1>
                    {(
                        <Image
                            src={form.watch('image') instanceof File ? URL.createObjectURL(form.watch('image') as Blob) : typeof form.watch('image') === 'string' ? form.watch('image') as string : '/images/fallback.svg'}
                            width={500}
                            height={500}
                            alt='Recipe image'
                            className='flex w-[300px] object-cover items-center justify-center pt-4 print:hidden'
                        />
                    )}
                    {form.watch('sections').map((section, index) => (
                        <div key={index} className='mt-4'>
                            <h2 className='capitalize font-semibold'>
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
                    <p className='pt-4'>{form.watch('instructions')}</p>
                </div>
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