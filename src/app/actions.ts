'use server'

import { formSchema, type FormState, formSchemaData } from '@/lib/schema'
import { addRecipe, editRecipe } from '@/utils/fetch'

export async function submitForm(prevState: FormState, formData: FormData): Promise<FormState> {
    const formObject = {
        title: formData.get('title') as string,
        date: new Date(formData.get('date') as string),
        type: formData.get('type') as string,
        quantity: formData.get('quantity') as string,
        time: formData.get('time') as string,
        image: formData.get('image') as string | File,
        sections: JSON.parse(formData.get('sections') as string) as {
            ingredients: { quantity: string; ingredient: string }[]
            title?: string
        }[],
        instructions: formData.get('instructions') as string,
    } as formSchemaData

    const result = formSchema.safeParse(formObject)

    if (!result.success) {
        return {
            error: 'Invalid form data. Please check your inputs.',
            success: false,
            initial: false,
        }
    }

    try {
        const queryBody = {
            title:          result.data.title,
            date:           result.data.date.toISOString().split('T')[0],
            type:           result.data.type,
            quantity:       result.data.quantity,
            time:           Number(result.data.time),
            ingredients:    JSON.stringify(result.data.sections),
            instructions:   result.data.instructions,
            image:          typeof result.data.image === 'string' ? null : result.data.image
        }

        const isNewString = formData.get('isNew')
        const id = Number(formData.get('id'))

        const isNew = isNewString === 'true' ? true : false
        if (isNewString !== 'true' && isNewString !== 'false'){
            return { 
                error: 'Malformed data', 
                success: false, 
                initial: false, 
            }
        }

        if (isNew === true) {
            console.log('?',isNew)
            const res = await addRecipe(queryBody)
            if (res === null) return { error: 'Failed to add recipe', success: false, initial: false, }
        }
        else if (!isNew && id) {
            const res = await editRecipe({ ...queryBody, id: id })
            if (res === null) return { error: 'Failed to edit recipe', success: false, initial: false, }
        } else {
            return { 
                error: 'Missing data', 
                success: false, 
                initial: false, 
            }
        }

        return { 
            error: '', 
            success: true, 
            initial: false, 
        }
    } catch (error) {
        console.error('Form submission error:', error)
        return {
            error: 'Unknown error',
            success: false,
            initial: false,
        }
    }
}
