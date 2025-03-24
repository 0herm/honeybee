'use server'

import Image from 'next/image'

type imgProp = {
    id: number
    style: string
}

async function checkImage(imageUrl:string) {
    try {
        const res = await fetch(imageUrl)

        if (res.ok) {
            return true
        } else {
            return false
        }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return false
    }
}

export default async function LoadImage({id,style}:imgProp){
    const imageUrl = `http://localhost:8080/api/image/${id}`
    const fallbackImage = '/fallback.svg'

    const validImage = await checkImage(imageUrl)

    return (
        <div>
            {validImage ? (
                <Image
                    src={imageUrl}
                    alt="bilde"
                    fill={true}
                    sizes="100%"
                    priority
                    className={`object-contain ${style}`}
                />
                ) : (
                <Image
                    src={fallbackImage}
                    alt="Fallback"
                    fill={true}
                    sizes="100%"
                    priority
                    className={`object-contain ${style}`}
                />
            )}
        </div>
    )
}