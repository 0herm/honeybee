import Link from 'next/link'
import {
    Card,
    CardDescription,
    CardTitle,
    CardContent
} from '@/components/ui/card'
import LoadImage from '@/components/img/img'
import PageOverview from '@/components/pagination/pagination'
import { BadgePlus, Clock, Filter, Shapes } from 'lucide-react'
import { recipeTypes } from '@parent/constants'
import Filters from '@/components/filters/filters'
import { searchRecipes } from '@/utils/api'

export default async function Page({searchParams}: {searchParams: Promise<{ [key: string]: string | undefined }>}) {
    const paramsSearch = await searchParams

    const search = typeof paramsSearch.q    === 'string' ? paramsSearch.q           : ''
    const offset = typeof paramsSearch.p    === 'string' ? Number(paramsSearch.p)   : 1
    const category = typeof paramsSearch.category === 'string' ? paramsSearch.category : undefined
    const difficulty = typeof paramsSearch.difficulty === 'string' ? paramsSearch.difficulty : undefined
    const duration = typeof paramsSearch.duration === 'string' ? Number(paramsSearch.duration) : undefined

    const limit = 8

    const data = await searchRecipes(search, limit, offset-1, false, { category, difficulty, duration })

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
                            
                            <PageOverview current={offset} pages={Math.ceil(data.totalItems/limit)} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function RecipeGrid({recipes}: {recipes: RecipeProps[]}) {
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

function RecipeCard({recipe}: {recipe: RecipeProps}) {
    const now = new Date()
    const isNew = recipe.date_created && Math.abs(new Date(recipe.date_created).getTime() - now.getTime()) <= 30 * 24 * 60 * 60 * 1000
    
    return (
        <Link href={`../recipe/${recipe.id}`}>
            <Card className='h-[17.5rem] w-full overflow-hidden transition-all hover:shadow-md'>
                <div className='relative h-[10rem] w-full overflow-hidden flex items-center justify-center'>
                    <LoadImage data={recipe.image} style='w-full h-auto max-h-[10rem] object-contain' />
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
                        {recipe.category && (
                            <div className='flex items-center gap-[0.25rem]'>
                                <Shapes className='h-[0.75rem] w-[0.75rem]' />
                                <span className='capitalize'>{recipeTypes[recipe.category]}</span>
                            </div>
                        )}
                        
                        {recipe.duration > 0 && (
                            <div className='flex items-center gap-[0.25rem]'>
                                <Clock className='h-[0.75rem] w-[0.75rem]' />
                                <span>
                                    {Math.floor(recipe.duration/60) > 0 && `${Math.floor(recipe.duration/60)}t `}
                                    {recipe.duration % 60 > 0 && `${recipe.duration % 60}min`}
                                </span>
                            </div>
                        )}
                    </CardDescription>
                </CardContent>
            </Card>
        </Link>
    )
}