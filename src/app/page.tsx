'use client'

import Link from "next/link"

import CarouselComponent from "@/components/carousel/carousel"

import { ArrowRight } from "lucide-react"

export default function Home() {

	const data1 = 6
	const data2 = 4
	const data3 = 4

	return (
		<div className="w-full flex justify-center">
			<div className='flex flex-col items-center gap-10 px-20 lg:w-[61rem] md:w-[35rem] w-[22rem]'>
				<div className={`flex flex-col gap-2 w-[12rem] ${data1>=2?'md:w-[25rem]':''} ${data1>=4?'lg:w-[51rem]':''} `}>
					<Link href={"/dinner"} className="flex flex-row justify-start items-center gap-1">
						<h1>Middag</h1>
						<ArrowRight width={20} height={20} />
					</Link>
					<CarouselComponent data={data1}/>
				</div>
				
				<div className={`flex flex-col gap-2 w-[12rem] ${data2>=2?'md:w-[25rem]':''} ${data2>=4?'lg:w-[51rem]':''} `}>
					<Link href={"/baking"} className="flex flex-row justify-start items-center gap-1">
						<h1>Bakst</h1>
						<ArrowRight width={20} height={20} />
					</Link>
					<CarouselComponent data={data2} />
				</div>
				
				<div className={`flex flex-col gap-2 w-[12rem] ${data3>=2?'md:w-[25rem]':''} ${data3>=4?'lg:w-[51rem]':''} `}>
					<Link href={"/drinks"} className="flex flex-row justify-start items-center gap-1">
						<h1>Drikker</h1>
						<ArrowRight width={20} height={20} />
					</Link>
					<CarouselComponent data={data3} />
				</div>
			</div>
		</div>
	)
}