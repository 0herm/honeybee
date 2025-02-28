import { NextResponse } from "next/server"
import crypto from "crypto"
import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET
const REPO_PATH = process.env.REPO_PATH || "/webserver/herbivorene"

export async function POST(request: Request) {
	try {
		const payload = await request.text()
		const signature = request.headers.get("x-hub-signature-256")

		if (!signature || !verifySignature(payload, signature)) {
			console.error("Invalid signature")
			return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
		}

		const event = request.headers.get("x-github-event")

		if (event === "push") {
			try {
				const { stdout, stderr } = await execAsync(`cd ${REPO_PATH} && git pull`)
				console.log("Git pull executed successfully:", stdout)

				if (stderr) {
					console.warn("Git pull warning:", stderr)
				}

				return NextResponse.json({ success: true, message: "Repository updated" })
			} catch (error) {
				console.error("Git pull failed:", error)
				return NextResponse.json({ error: "Failed to update repository", details: error }, { status: 500 })
			}
		}
		return NextResponse.json({ success: true, message: "Webhook received" })
	} catch (error) {
		console.error("Webhook processing error:", error)
		return NextResponse.json({ error: "Failed to process webhook", details: error }, { status: 500 })
	}
}

function verifySignature(payload: string, signature: string): boolean {
	if (!WEBHOOK_SECRET) {
		console.error("GITHUB_WEBHOOK_SECRET is not set")
		return false
	}

	const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET)
	const digest = "sha256=" + hmac.update(payload).digest("hex")
	return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature))
}

// GET requests for testing purposes
// export async function GET() {
// 	return NextResponse.json({ message: "GitHub webhook endpoint is ready" })
// }

