import { NextRequest, NextResponse } from "next/server"
import path from "path"
import { writeFile } from "fs/promises"

export async function POST(req: NextRequest) {
  const formData = await req.formData()

  const file = formData.get("file") as File
  const id = formData.get("id") as string
  
  if (!file || !id) {
    return NextResponse.json({ error: "No files received." }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  try {
    await writeFile(
      path.join(process.cwd(), "public/imgs", id+".webp"),
      buffer
    )
    return NextResponse.json({ Message: "Success", status: 201 })
  } catch (error) {
    console.log("Error occured ", error)
    return NextResponse.json({ Message: "Failed", status: 500 })
  }
}