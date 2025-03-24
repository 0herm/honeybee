'use client'

import { useState } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

import { Input } from "@/components/ui/input"

export default function RecipesInput(){
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [input, setInput] = useState<string>('')

    function setSearch(q:string){
        const params = new URLSearchParams(searchParams?.toString())
        params.set('q', q)
        router.push(pathname+'?'+params.toString())
    }

    return (
        <Input placeholder='Søk' value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>{if(e.key=='Enter')setSearch(input)}} className='w-80' />
    )
}