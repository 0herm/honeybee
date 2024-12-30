export default async function Page({params}: {params: Promise<{ id: number }>}) {
    const id = (await params).id
    return <div>Recipe: {id}</div>
  }