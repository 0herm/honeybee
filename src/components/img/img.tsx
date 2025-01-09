'use client'

import Image from "next/image"
import { useState } from "react"

type imgProp = {
    id: number
    style: string
}

export default function LoadImage({id, style}:imgProp){

    const [imgSrc, setImgSrc] = useState(`/imgs/${id}.webp`);

    return(
        <Image
            src={imgSrc}
            alt="bilde"
            width={3840}
            height={2880}
            className={style}
            onError={() =>setImgSrc('/fallback.svg')}
        />
    )
}