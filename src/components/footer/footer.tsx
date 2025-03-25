export default function Footer() {

    const version = process.env.NEXT_PUBLIC_VERSION

    return (
        <div className="flex flex-row items-center w-full p-4">
            <p className="text-sm">Opphavsrett © {new Date().getFullYear()} Herbivorene</p>
            <p className="ml-auto bg-primary-foreground p-[0.5rem_1rem] rounded-md font-semibold">v{version}</p>
        </div>
    )
}