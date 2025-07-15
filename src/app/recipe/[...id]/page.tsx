import LoadImage from '@/components/img/img'
import PrintButton from '@/components/print/print'
import { Separator } from '@/components/ui/separator'
import { getRecipeById } from '@/utils/api'
import { Clock, Gauge, Leaf, Users } from 'lucide-react'

export default async function RecipePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const recipe = await getRecipeById(Number(id))

    if (typeof recipe === 'string') {
        return <div>Error: {recipe}</div>
    }

    const hours = Math.floor(recipe.duration / 60)
    const minutes = recipe.duration % 60

    return (
        <div className='w-full flex justify-center'>
            <div className='w-full max-w-[65rem] sm:px-[2rem]'>
                <h1 className='w-full text-center capitalize text-2xl font-semibold'>{recipe.title}</h1>
                <div className='relative flex items-start w-full h-[12rem] sm:h-[14rem] mt-[1rem] print:hidden'>
                    <LoadImage data={recipe.image} />
                </div>
                <div className='flex flex-col md:flex-row justify-center items-center gap-[1rem] md:gap-[3rem] pt-[2rem] md:pt-[3rem]'>
                    <div className='flex flex-row items-center gap-[1rem] w-[15rem] p-[1rem] rounded-lg bg-green-950/10 border border-green-900/40'>
                        <Clock className='size-[2rem] stroke-green-600/70'/>
                        <div className='flex flex-col'>
                            <h1 className='text-sm text-green-400/70'>Total tid</h1>
                            <span className='text-xl font-semibold'>
                                {hours === 1 ? '1 time' : hours > 1 ? hours + ' timer' : ''}
                                {minutes === 1 ? '1 minutt' : minutes > 1 ? minutes + ' minutter' : ''}
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-row items-center gap-[1rem] w-[15rem] p-[1rem] rounded-lg bg-green-950/10 border border-green-900/40'>
                        <Gauge className='size-[2rem] stroke-green-600/70'/>
                        <div className='flex flex-col'>
                            <h1 className='text-sm text-green-400/70'>Vanskelighet</h1>
                            <span className='text-xl font-semibold'>Lett</span>
                        </div>
                    </div>
                    <div className='flex flex-row items-center gap-[1rem] w-[15rem] p-[1rem] rounded-lg bg-green-950/10 border border-green-900/40'>
                        <Users className='size-[2rem] stroke-green-600/70'/>
                        <div className='flex flex-col'>
                            <h1 className='text-sm text-green-400/70'>Porsjoner</h1>
                            <span className='text-xl font-semibold'>{recipe.quantity}</span>
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-col md:flex-row gap-[5rem] justify-between pt-[4rem]'>
                    <div className='w-full md:max-w-[20rem]'>
                        <h2 className='text-xl font-semibold mb-4 flex items-center'>
                            <Leaf className='size-[1.25rem] text-green-600/70 mr-2' />
                            Ingredienser
                        </h2>
                        <Separator className='mb-[1rem] bg-green-900' />
                        {recipe.ingredients.map((section, index) => (
                            <div key={index} className='mt-[1rem]'>
                                <h1 className='capitalize font-semibold'>{section.title ?`${section.title}:`:''}</h1>
                                <ul className='list-disc list-inside marker:text-green-600/50'>
                                    {section.ingredients.map((item, idx) => (
                                        <li key={idx} className='diagonal-fractions'>
                                            <span>{item.quantity} {item.ingredient}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className='w-full'>
                        <h2 className='text-xl font-semibold mb-[1rem]'>Fremgangsmåte</h2>
                        <Separator className='mb-[1rem] bg-green-900' />
                        <p className='w-full leading-relaxed'>{recipe.instructions.join(' ')}</p>
                    </div>
                </div>
                <div className='w-full flex flex-row justify-between items-center pt-[3rem]'>
                    <div className='dark:text-white/70 text-black/70 text-sm'>
                        <div className='grid grid-cols-2 gap-2 text-sm'>
                            <span className='font-semibold'>Opprettet:</span>
                            <span>{recipe.date_created.toLocaleDateString()}</span>
                            {recipe.date_created.getTime() === recipe.date_updated.getTime() && (
                                <>
                                    <span className='font-semibold'>Endret:</span>
                                    <span>{recipe.date_updated.toLocaleDateString()}</span>
                                </>
                            )}
                        </div>
                    </div>
                    <PrintButton recipe={{...recipe, image: null}} />
                </div>
            </div>
        </div>
    )
}
