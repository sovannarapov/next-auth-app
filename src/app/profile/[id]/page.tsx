export default function ProfileDetailPage({params}: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-6xl py-2">Profile Detail</h1>
            <hr />
            <p className="text-2xl p-2 m-2 rounded bg-orange-500 text-black">
                {params.id}
            </p>
        </div>
    )
}