'use client'

import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Input } from "@/components/ui/input"

export default function RecipesInput(){
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const search = searchParams.get('q') || ''

    const [input, setInput] = useState<string>(search)

    function setSearch(q:string){
        const params = new URLSearchParams()
        params.set('q', q)
        if(q==='') params.delete('q')
        router.push(pathname+'?'+params.toString())
    }

    return (
        <Input placeholder='Søk' value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>{if(e.key=='Enter')setSearch(input)}} className='w-80' />
    )
}