
export default function SettingsPage() {

    const Language = () => {
        return (
            <div className="flex flex-col items-center justify-center ml-5 mr-5 border b-1">
                <h1 className=" flex flex-row flex-grow text-2xl font-bold">Language</h1>
                <p className="text-xl">English</p>
            </div>
        )
    }

    const Region = () => {
        return (
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Region</h1>
                <p className="text-xl">United States</p>
            </div>
        )
    }

    const Privacy = () => {
        return (
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Privacy</h1>
                <p className="text-xl">Public</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <h1>Settings Page</h1>
            <Language />
            <Region />
            <Privacy />


        </div>
    )
}