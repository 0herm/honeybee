import Recipe from "@/components/recipe/recipe"

export default async function RecipePage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params

	return (
		<div>
			<Recipe id={id} />
		</div>
	)
}
