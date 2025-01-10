'use client'

import { useEffect, useState } from "react"

type imgProp = {
    id: number
    style: string
}

export default function LoadImage({id, style}:imgProp){

    const [imgSrc, setImgSrc] = useState(`/imgs/fallback.svg`)

    useEffect(() => {
        const fetchImage = async () => {
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
        <img
            src={imgSrc}
            alt="bilde"
            width={3840}
            height={2880}
            className={style}
            onError={() =>setImgSrc('/imgs/fallback.svg')}
        />
    )
}