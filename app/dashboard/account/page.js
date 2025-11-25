import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
          
           {/* FIRST NAME */}
                <div>
                  <label className="text-sm font-medium">Property Name</label>
                  <Input
                    name="title"
                    placeholder="Enter the name of the property..."
                    className="mt-1 border-gray-300 placeholder:text-gray-500"
                    required
                  />
                </div>
           {/* LAST NAME */}
                <div>
                  <label className="text-sm font-medium">Property Name</label>
                  <Input
                    name="title"
                    placeholder="Enter the name of the property..."
                    className="mt-1 border-gray-300 placeholder:text-gray-500"
                    required
                  />
                </div>

           {/* COMPANY NAME */}
                <div>
                  <label className="text-sm font-medium">Property Name</label>
                  <Input
                    name="title"
                    placeholder="Enter the name of the property..."
                    className="mt-1 border-gray-300 placeholder:text-gray-500"
                    required
                  />
                </div>

           {/* DATE OF BIRTH */}
                <div>
                  <label className="text-sm font-medium">Property Name</label>
                  <Input
                    name="title"
                    placeholder="Enter the name of the property..."
                    className="mt-1 border-gray-300 placeholder:text-gray-500"
                    required
                  />
                </div>
                
           {/* EMAIL */}
                <div>
                  <label className="text-sm font-medium">Property Name</label>
                  <Input
                    name="title"
                    placeholder="Enter the name of the property..."
                    className="mt-1 border-gray-300 placeholder:text-gray-500"
                    required
                  />
                </div>

            {/* PHONE  */}
                <div>
                  <label className="text-sm font-medium">Phone number</label>
                  <Input
                    name="title"
                    type=""
                    placeholder="Enter the name of the property..."
                    className="mt-1 border-gray-300 placeholder:text-gray-500"
                    required
                  />
                </div>

        </form>
      </main>
    </div>
  )
}

export default MyAccount
