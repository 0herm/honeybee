import { z } from 'zod'

export const formSchema = z.object({
    title: z.string().min(1,{message:'Required'}),
    date: z.date(),
    type: z.string().min(1,{message:'Required'}),
    quantity: z.string().min(1,{message:'Required'}),
    time: z.string().min(1,{message:'Required'}),
    image: z.instanceof(File).or(z.string()),
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
    instructions: z.string().min(1,{message:'Required'}),
})

export type formSchemaData = z.infer<typeof formSchema>

export type FormState = {
    error: string
    success: boolean
    initial: boolean
}

export const defaultSchemaData = {
    title:          '',
    date:           new Date,
    type:           '',
    quantity:       '',
    time:           '',
    image:          undefined,
    sections:       [{ title: '', ingredients: [{ quantity: '', ingredient: '' }] }],
    instructions:   '',
}