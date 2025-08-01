'use server'

import Image from 'next/image'

type LoadImageProps = {
    data: Uint8Array | null
    style?: string
}

export default async function LoadImage({data,style}: LoadImageProps){
    const fallbackImage = '/images/fallback.svg'
    
    const imageSrc = data ? `data:image/jpeg;base64,${Buffer.from(data).toString('base64')}` : null


    return (
        <>
            {imageSrc ? (
                <Image
                    src={imageSrc}
                    alt='Image'
                    fill={true}
                    sizes='100%'
                    priority
                    className={`object-contain ${style}`}
                />
            ) : (
                <Image
                    src={fallbackImage}
                    alt='Fallback'
                    fill={true}
                    sizes='100%'
                    priority
                    className={`object-contain ${style}`}
                />
            )}
        </>
    )
}