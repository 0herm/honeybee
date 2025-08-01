import { about as text } from '@text'

export default function About(){
    return (
        <div className='flex flex-col w-full items-center'>
            <h1>{text.title}</h1>
        </div>
    )
}