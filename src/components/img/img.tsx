'use client'

import { useEffect, useState } from "react"
import Image from 'next/image'

type imgProp = {
    id: number
    style: string
}

export default function LoadImage({id, style}:imgProp){

    const [imgSrc, setImgSrc] = useState(`/imgs/fallback.svg`)

    useEffect(() => {
        async function fetchImage() {
            try {
                const response = await fetch(`/imgs/${id}.webp`)
    
                if (response.ok) {
                    setImgSrc(`/imgs/${id}.webp`) 
                }else{
                    setImgSrc('/imgs/fallback.svg')
                }
            } catch (error) {
                console.error('Error fetching image:', error)
                setImgSrc('/imgs/fallback.svg')
            }
        }
    
        fetchImage()
      }, [id])

    return(
        <Image
            src={imgSrc}
            alt="bilde"
            fill={true}
            loading="lazy"
            unoptimized={true}
            className={`object-contain ${style}`}
            onError={() =>setImgSrc('/imgs/fallback.svg')}
        />
    )
}