import RecipesPage from "@/components/recipes/recipes"

export default async function Page({params}: {params: Promise<{ slug: string }>}) {
    const slug = (await params).slug
    return <RecipesPage slug={slug}/>
}
