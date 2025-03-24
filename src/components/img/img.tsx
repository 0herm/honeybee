'use client'

import { useEffect, useState } from "react"
import Image from 'next/image'

type imgProp = {
    id: number
    style: string
}

export default function LoadImage({id, style}:imgProp){

    const [imgSrc, setImgSrc] = useState(`/images/fallback.svg`)

    useEffect(() => {
        async function fetchImage() {
            try {
                const response = await fetch(`/images/${id}.webp`)
    
                if (response.ok) {
                    setImgSrc(`/images/${id}.webp`) 
                }else{
                    setImgSrc('/images/fallback.svg')
                }
            } catch (error) {
                console.error('Error fetching image:', error)
                setImgSrc('/images/fallback.svg')
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
            className={`object-contain ${style}`}
            onError={() =>setImgSrc('/images/fallback.svg')}
        />
    )
}