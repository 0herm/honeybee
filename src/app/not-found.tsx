export default function Custom404() {
    return (
        <div className='w-full h-full flex flex-col gap-[0.75rem] sm:gap-0 sm:flex-row justify-center items-center'>
            <h1 className='text-xl sm:text-3xl'>404</h1>
            <div className='bg-almostbright mx-4 w-[6rem] h-[0.15rem] sm:w-[0.15rem] sm:h-[3rem]' />
            <h1 className='text-xl sm:text-3xl'>Denne siden finnes ikke.</h1>
        </div>
    )
}