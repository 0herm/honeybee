"use client"

import EditPage, { FormValues } from "@/components/editPage/editPage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fetchById, fetchByTitle } from "@/utils/fetch"
import { Recipes } from "@parent/constants"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Page() {

	const [search, setSearch] = useState<string>('')
	const [error, setError] = useState<string|null>('')
	const [recipes, setRecipes] = useState<Recipes>()
	const [values, setValues] = useState<FormValues|null>(null)
	const [id, setId] = useState<number>()

	function resetStates() {setValues(null)}

	useEffect(() => {
		async function fetchData() {
			const fetchedRecipes = await fetchByTitle(search,"")
			if (!fetchedRecipes) {
				setError('No recipe data found')
			} else {
				setRecipes(fetchedRecipes)
				setError(null)
			}
		}
		fetchData()
	}, [search])
	
	if(values) return (<EditPage isNew={false} values={values} id={id} resetStates={resetStates} />)

	function handleClick(id:string) {
		async function fetchData() {
		const fetchedRecipe = await fetchById(id)
		if (!fetchedRecipe) {
			setError('No recipe data found')
		} else {
			setValues(
				{
					title: 			fetchedRecipe.title,
					date: 			new Date(fetchedRecipe.date),
					type: 			fetchedRecipe.type,
					quantity: 		fetchedRecipe.quantity,
					time: 			String(fetchedRecipe.time),
					image: 			`/imgs/${fetchedRecipe.id}.png`,
					sections: 		JSON.parse(String(fetchedRecipe.ingredients)),
					instructions: 	fetchedRecipe.instructions,
				}
			)
			setError(null)
		}
		}
		fetchData()
	}

	return(
		<div className="flex flex-col w-full">
			<Button className="w-[4rem] mb-[2rem]" variant="outline" asChild>
            	<Link href="/protected">Back</Link>
			</Button>

			<div className="w-full flex items-center flex-col">
				<Input placeholder='Søk' value={search} onChange={(e)=>setSearch(e.target.value)} className='w-80' />

				{!error && recipes && recipes.map((recipe) => (
					<Button 
						key={recipe.id}
						onClick={()=>{handleClick(String(recipe.id));setId(recipe.id)}}
						type="button" 
						variant="outline"
						className="mt-2"
					>
						{recipe.title}
					</Button>
				))}

				{error && <div className='p-5'>Feil: ingen oppskrifter lik {`'${search}'`}</div> }
			</div>
		</div>
	)

	
}