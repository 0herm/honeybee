import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import './globals.css'

export const metadata: Metadata = {
  	title: "Herbivorene",
  	description: "A vegan recipe website",
}

export default function RootLayout({ children }: Readonly<{children: React.ReactNode;}>) {
	return (
		<>
		  <html lang="en" suppressHydrationWarning>
			<head/>
			<body className="w-screen h-screen m-0 p-0">
			  <ThemeProvider
				attribute="class"
				defaultTheme="dark"
			  >
				{children}
			  </ThemeProvider>
			</body>
		  </html>
		</>
	  )
}
