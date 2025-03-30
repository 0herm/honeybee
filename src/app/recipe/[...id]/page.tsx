import LoadImage from '@/components/img/img'
import { fetchById } from '@/utils/fetch'
import { RecipeProp } from '@parent/constants'

export default async function RecipePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const recipe = await fetchById(id) as RecipeProp | string

    if (typeof recipe === 'string') {
        return <div>Error: {recipe}</div>
    }

    recipe.ingredients = JSON.parse(String(recipe.ingredients))

    return (
        <div className='w-full max-w-[40rem]'>
            <h1 className='capitalize text-2xl font-semibold'>{recipe.title}</h1>
            <div className='relative flex items-start w-[300px] h-[15rem]'>
                <LoadImage id={Number(id)} style='print:hidden' />
            </div>
            {recipe.ingredients.map((section, index) => (
                <div key={index} className='mt-4'>
                    <h1 className='capitalize font-semibold'>{section.title ?`${section.title}:`:''}</h1>
                    <ul>
                        {section.ingredients.map((item, idx) => (
                            <li key={idx} className='flex flex-row'>
                                <p className='diagonal-fractions'>{item.quantity}&nbsp;</p>
                                <p>{item.ingredient}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <p className='pt-4'>{recipe.instructions}</p>
        </div>
    )
}
