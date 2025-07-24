'use server'

import EditPage from '@/components/editPage/editPage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getRecipeById, searchRecipes } from '@/utils/api'
import { Search } from 'lucide-react'
import Form from 'next/form'
import Link from 'next/link'

export default async function Page({ params, searchParams }: { params: Promise<{ id?: string[] }>, searchParams: Promise<{ [key: string]: string | undefined }> }) {

    const { id } = await params
    const recipeId = id?.[0] ? id[0] : undefined

    if(recipeId){
        const recipe = await getRecipeById(Number(recipeId))
        if(typeof recipe !== 'string'){
            const values = {
                title:          recipe.title,
                category:       recipe.category,
                difficulty:     recipe.difficulty,
                quantity:       recipe.quantity,
                duration:       String(recipe.duration),
                published:      recipe.published,
                image:          recipe.image ? Buffer.from(recipe.image).toString('base64') : null,
                sections:       recipe.ingredients,
                instructions:   recipe.instructions,
            }

            return (<EditPage isNew={false} values={values} id={Number(id)} />)
        }
        return <div className='p-5'>Feil ved henting av data</div>
    }

    const param = await searchParams
    const search = typeof param.q === 'string' ? param.q : ''

    const recipes = await searchRecipes(search, 8, 0, {})

    if(typeof recipes === 'string'){
        <div className='p-5'>Feil: ingen oppskrifter lik {`'${search}'`}</div>
    }

    return(
        <div className='flex flex-col w-full'>
            <Button className='w-[4rem] mb-[2rem]' variant='outline' asChild>
                <Link href='/protected'>Back</Link>
            </Button>

            <div className='w-full flex items-center flex-col'>
                <RecipesInput search={search} />
                <div className='pt-6 flex flex-col w-[10rem]'>
                    {typeof recipes === 'object' && recipes.recipes.map((recipe) => (
                        <Button 
                            key={recipe.id}
                            asChild
                            type='button' 
                            variant='outline'
                            className='mt-2'
                        >
                            <Link href={`/protected/edit/${recipe.id}`}>
                                {recipe.title}
                            </Link>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}

function RecipesInput({search}:{search: string}){
    return (
        <Form 
            action='/protected/edit'
        >
            <div className='relative w-full md:max-w-[300px]'>
                <Input 
                    type='search'
                    name='q' 
                    placeholder='Søk'
                    defaultValue={search}
                    className='pr-10'
                />
                <div className='absolute inset-y-0 right-0 flex items-center cursor-pointer'>
                    <Button variant='ghost' type='submit'>
                        <Search/>
                    </Button>
                </div>
            </div>
        </Form>
    )
}