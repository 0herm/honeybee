import { fetchByTitle } from '@/utils/fetch'
import Link from 'next/link'
import {
    Card,
    CardDescription,
    CardTitle,
    CardContent
} from '@/components/ui/card'
import LoadImage from '@/components/img/img'
import PageOverview from '@/components/pagination/pagination'
import Form from 'next/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BadgePlus, Clock, Filter, Search, Shapes } from 'lucide-react'
import { recipeTypes } from '@parent/constants'
import Filters from '@/components/filters/filters'

export default async function Page({searchParams}: {searchParams: Promise<{ [key: string]: string | undefined }>}) {
    const paramsSearch = await searchParams

    const search = typeof paramsSearch.q    === 'string' ? paramsSearch.q           : ''
    const offset = typeof paramsSearch.p    === 'string' ? Number(paramsSearch.p)   : 1
    const time   = typeof paramsSearch.time === 'string' ? paramsSearch.time        : '0'
    const type   = typeof paramsSearch.type === 'string'
                || typeof paramsSearch.type === 'object' ? paramsSearch.type        : ''

    const data = await fetchByTitle(search, Array.isArray(type) ? type.join(',') : type, time, offset)

    return (
        <div className='container mx-auto px-[1rem] py-[2rem]'>
            <div className='flex flex-col lg:flex-row gap-[1.5rem]'>
                <aside className='w-full lg:w-[18rem] shrink-0'>
                    <div className='sticky top-[5rem] bg-card rounded-xl border p-[1.25rem] shadow-sm'>
                        <h1 className='text-xl font-semibold mb-[1rem] flex items-center gap-[0.5rem]'>
                            <Filter className='size-[1.25rem] text-green-600/70' />
                            Filtre
                        </h1>
                        <div className='space-y-[1rem]'>
                            <SearchBar search={search} type={type} />
                            <Filters />
                        </div>
                    </div>
                </aside>

                <div className='flex-1'>
                    {typeof data === 'string' ? (
                        <div className='flex items-center justify-center h-[15rem] bg-muted/20 rounded-lg'>
                            <p className='text-lg text-muted-foreground'>Ingen oppskrifter funnet</p>
                        </div>
                    ) : (
                        <div className='space-y-[1.5rem]'>
                            <h2 className='text-2xl font-semibold'>
                                {search ? `Resultater for '${search}'` : 'Alle oppskrifter'}
                                {data.totalItems > 0 && <span className='text-muted-foreground text-lg ml-[0.5rem]'>({data.totalItems})</span>}
                            </h2>
                            
                            <RecipeGrid recipes={data.recipes} />
                            
                            <PageOverview current={offset} pages={Math.ceil(data.totalItems/8)} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function SearchBar({search, type}: {search: string, type: string}) {
    return (
        <Form action={`/recipes${type !== '' ? `/${type}` : ''}`}>
            <div className='relative'>
                <Input 
                    type='search'
                    name='q' 
                    placeholder='Søk oppskrifter...'
                    defaultValue={search}
                    className='pr-[2.5rem]'
                />
                <Button 
                    variant='ghost' 
                    type='submit' 
                    size='icon'
                    className='absolute right-0 top-0 h-full'
                >
                    <Search className='h-[1rem] w-[1rem]' />
                </Button>
            </div>
        </Form>
    )
}

function RecipeGrid({recipes}: {recipes: Recipes}) {
    if (!recipes || recipes.length === 0) {
        return (
            <div className='flex items-center justify-center h-[15rem] bg-muted/20 rounded-lg'>
                <p className='text-lg text-muted-foreground'>Ingen oppskrifter funnet</p>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1rem]'>
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    )
}

function RecipeCard({recipe}: {recipe: RecipeProp}) {
    const now = new Date()
    const isNew = recipe.date && Math.abs(new Date(recipe.date).getTime() - now.getTime()) <= 30 * 24 * 60 * 60 * 1000
    
    return (
        <Link href={`../recipe/${recipe.id}`}>
            <Card className='h-[17.5rem] w-full overflow-hidden transition-all hover:shadow-md'>
                <div className='relative h-[10rem] w-full overflow-hidden flex items-center justify-center'>
                    <LoadImage id={recipe.id} style='w-full h-auto max-h-[10rem] object-contain' />
                    {isNew && (
                        <div className='absolute top-[0.5rem] left-[0.5rem] bg-green-950/70 py-[0.25rem] px-[0.5rem] rounded-md flex items-center gap-[0.25rem]'>
                            <BadgePlus className='h-[0.75rem] w-[0.75rem] text-green-400' />
                            <span className='text-xs font-medium text-green-400'>Ny</span>
                        </div>
                    )}
                </div>
                
                <CardContent className='p-[0.75rem]'>
                    <CardTitle className='text-base font-semibold mb-[0.5rem] line-clamp-1'>
                        {recipe.title}
                    </CardTitle>
                    
                    <CardDescription className='flex flex-wrap gap-[0.75rem] text-xs'>
                        {recipe.type && (
                            <div className='flex items-center gap-[0.25rem]'>
                                <Shapes className='h-[0.75rem] w-[0.75rem]' />
                                <span className='capitalize'>{recipeTypes[recipe.type]}</span>
                            </div>
                        )}
                        
                        {recipe.time > 0 && (
                            <div className='flex items-center gap-[0.25rem]'>
                                <Clock className='h-[0.75rem] w-[0.75rem]' />
                                <span>
                                    {Math.floor(recipe.time/60) > 0 && `${Math.floor(recipe.time/60)}t `}
                                    {recipe.time % 60 > 0 && `${recipe.time % 60}min`}
                                </span>
                            </div>
                        )}
                    </CardDescription>
                </CardContent>
            </Card>
        </Link>
    )
}