import Recipe from "@/components/recipe/recipe"

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
	const { id } = await params

	return (
		<div>
			<Recipe id={id} />
		</div>
	)
}
