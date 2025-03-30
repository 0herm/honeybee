'use client'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import { usePathname, useSearchParams } from 'next/navigation'

export default function PageOverview({current,pages}:{current:number,pages:number}) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const pageNumber1 = Math.max(1,     Math.min(current - 1, pages - 4))
    const pageNumber2 = Math.min(pages, pageNumber1 + 1)
    const pageNumber3 = Math.min(pages, pageNumber2 + 1)
    const pageNumber4 = Math.min(pages, pageNumber3 + 1)
    const pageNumberEnd = pages

    function trigger(page:number){
        const params = new URLSearchParams(searchParams.toString())
        params.set('p', page.toString())

        return params.toString()
    }

    return(
        <Pagination className='pt-[2rem]'>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={pathname+'?'+trigger(current === 1 ? 1 : current-1)} />
                </PaginationItem>
                {pages > 0 &&
                <PaginationItem>
                    <PaginationLink href={pathname+'?'+trigger(pageNumber1)} isActive={pageNumber1 === current}>{ pageNumber1 }</PaginationLink>
                </PaginationItem>
                }
                {pages > 2 &&
                <PaginationItem>
                    <PaginationLink href={pathname+'?'+trigger(pageNumber2)} isActive={pageNumber2 === current}>{ pageNumber2 }</PaginationLink>
                </PaginationItem>
                }
                {pages > 3 &&
                <PaginationItem>
                    <PaginationLink href={pathname+'?'+trigger(pageNumber3)} isActive={pageNumber3 === current}>{ pageNumber3 }</PaginationLink>
                </PaginationItem>
                }
                {pages > 4 &&
                <PaginationItem>
                    <PaginationLink href={pathname+'?'+trigger(pageNumber4)} isActive={pageNumber4 === current}>{ pageNumber4 }</PaginationLink>
                </PaginationItem>
                }
                {pages > 4 && pages-current > 3 &&
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                }
                {pages > 1 &&
                <PaginationItem>
                    <PaginationLink href={pathname+'?'+trigger(pageNumberEnd)} isActive={pageNumberEnd === current}>{ pageNumberEnd }</PaginationLink>
                </PaginationItem>
                }
                <PaginationItem>
                    <PaginationNext href={pathname+'?'+trigger(current === pageNumberEnd ? pageNumberEnd : current+1)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}