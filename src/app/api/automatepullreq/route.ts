import { NextResponse } from "next/server"
import crypto from "crypto"
import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET

export async function POST(request: Request) {
	try {
		const payloadText = await request.text()
		const payload = JSON.parse(payloadText)
		const signature = request.headers.get("x-hub-signature-256")

		if (!signature || !verifySignature(payloadText, signature)) {
			console.error("Invalid signature")
			return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
		}

		if(payload.after)
			try {
				const { stderr: pullStderr } = await execAsync(`${payload.after} > deploy.txt`)
		
				if (pullStderr) {
					console.warn("Waring: ", pullStderr)
				}
		
				return NextResponse.json({ success: true, message: "Depoying..." })
				} catch (error) {
					console.error("Command execution failed:", error)
					return NextResponse.json({ error: "Failed to update repository or rebuild containers", details: error },{ status: 500 },)
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

