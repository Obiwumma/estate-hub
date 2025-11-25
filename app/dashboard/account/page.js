import { Button } from "@/components/ui/button"

function MyAccount() {
  return (
    <div>
      <header className='flex border p-6 rounded-xl items-center gap-8'>
        <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVOFbZqiasFsHd64783jnQfZCv3dGp0kh0fQ&s" width={80} height={80} className="rounded-full" alt="" /></div>
        <div className="flex flex-col gap-2">
          <h1>Cristiano Ronaldo</h1>
          <p className="text-sm text-gray-500">500 x 500 or larger recommended</p>
          <div>
            <Button className="bg-purple-500 hover:bg-purple-400  text-white">
              Upload New
            </Button>
          </div>
        </div>
      </header>

      <main>
        <form action="">
          
        </form>
      </main>
    </div>
  )
}

export default MyAccount
