'use client'

type imgProp = {
    base64: string
    style: string
}

export default function LoadImage({base64, style}:imgProp){
    return(
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={`data:image/webp;base64,${base64}`}
            alt="bilde"
            width={7952}
            height={5304}
            className={style}
        ></img>
    )
}