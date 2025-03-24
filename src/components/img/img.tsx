'use client'

import { useEffect, useState } from "react"
import Image from 'next/image'

type imgProp = {
    id: number
    style: string
}

export default function LoadImage({id, style}:imgProp){

    const [imgSrc, setImgSrc] = useState(`/fallback.svg`)

    useEffect(() => {
        async function fetchImage() {
            try {
                const response = await fetch(`http://localhost:8080/api/image/${id}`)
    
                if (response.ok) {
                    setImgSrc(`http://localhost:8080/api/image/${id}`) 
                }else{
                    setImgSrc('/fallback.svg')
                }
            } catch (error) {
                console.error('Error fetching image:', error)
                setImgSrc('/fallback.svg')
            }
        }
    
        fetchImage()
      }, [id])

    return(
        <Image
            src={imgSrc}
            alt="bilde"
            fill={true}
            sizes="100%"
            priority
            className={`object-contain ${style}`}
            onError={() =>setImgSrc('/fallback.svg')}
        />
    )
}