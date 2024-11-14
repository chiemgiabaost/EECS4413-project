import {useSession} from "next-auth/react";

export default function Home() {
  const {data: session} = useSession();

  if (!session) {
    return (
      <div className="bg-gradient-to-r from-black to-blue-900 w-screen h-screen">
        <div className="text-blue-900 flex justify-between">
          <a href="/api/auth/signin" className="text-blue-900 hover:underline">aaaaSign in</a>
        </div>
      </div>
    )
  }
  return (
    <div className="text-blue-900 flex justify-between">
      
    </div>
  )
}
