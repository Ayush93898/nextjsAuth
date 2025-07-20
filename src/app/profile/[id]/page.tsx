export default function UserProfile({ params }: any) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-zinc-900 text-white py-10 px-6 rounded-2xl shadow-lg text-center">
        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
        <hr className="border-zinc-700 mb-6" />

        {/* User ID Display */}
        <p className="text-2xl text-zinc-300">User ID:</p>
        <p className="text-4xl font-semibold text-blue-400 mt-2 break-words">
          {params.id}
        </p>
      </div>
    </div>
  );
}
