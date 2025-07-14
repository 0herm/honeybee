import { z } from 'zod'

export const formSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1,{message:'Required'}),
    category: z.string().min(1,{message:'Required'}),
    difficulty: z.string().min(1,{message:'Required'}),
    quantity: z.string().min(1,{message:'Required'}),
    duration: z.string().min(1,{message:'Required'}),
    image: z.instanceof(File).or(z.string()).optional(),
    sections: z.array(
        z.object({
            title: z.string(),
            ingredients: z.array(
                z.object({
                    quantity: z.string(),
                    ingredient: z.string(),
                }),
            ),
        }),
    ),
    instructions: z.array(z.string())
})

export type formSchemaData = z.infer<typeof formSchema>

export type FormState = {
    error?: string
    success?: boolean | null
}

export const defaultSchemaData = {
    title:          '',
    category:       '', 
    difficulty:     '',
    quantity:       '',
    duration:       '',
    image:          undefined,
    sections:       [{ title: '', ingredients: [{ quantity: '', ingredient: '' }] }],
    instructions:   [''],
}