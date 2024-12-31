import Image from "next/image";

type imgProp = {
    base64: string
}

export default function Img({base64}:imgProp){
    return(
        <Image
            src={`data:image/jpeg;base64,${base64}`}
            alt="bilde"
            width={7952}
            height={5304}
            className="flex w-full max-h-48 items-center justify-center pt-4"
        />
    )
}