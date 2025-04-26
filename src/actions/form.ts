'use server'

import { addRecipe, editRecipe } from '@/utils/fetch'
import { z } from 'zod'

const formSchema = z.object({
    title: z.string().min(1),
    date: z.date(),
    type: z.string().min(1),
    quantity: z.string().min(1),
    time: z.string().min(1),
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
    instructions: z.string().min(1),
})

type FormData = z.infer<typeof formSchema>

export async function submitForm(formData: FormData, id: number | undefined, isNew: boolean) {
    const validationResult = formSchema.safeParse(formData)

    if (!validationResult.success) {
        return {
            success: false,
            error: 'Invalid form data. Please check your inputs.',
        }
    }

    try {
        const queryBody = {
            title:          formData.title,
            date:           formData.date.toISOString().split('T')[0],
            type:           formData.type,
            quantity:       formData.quantity,
            time:           Number(formData.time),
            ingredients:    JSON.stringify(formData.sections),
            instructions:   formData.instructions,
            image:          formData.image instanceof File ? formData.image : null
        }

        if (isNew) {
            const res = await addRecipe(queryBody)
            if (typeof res === 'string') return { success: false }
        }
        else if (!isNew && id) {
            const res = await editRecipe({ ...queryBody, id: id })
            if (typeof res === 'string') return { success: false }
        }

        return {
            success: true,
        }
    } catch (error) {
        console.error('Form submission error:', error)
        return {
            success: false,
            error: 'Failed to process your submission. Please try again later.',
        }
    }
}
