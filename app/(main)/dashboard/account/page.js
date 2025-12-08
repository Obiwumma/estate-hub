import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PhoneInput } from "@/components/ui/phone"

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
        <form action="" className="grid grid-cols-2 gap-y-10 gap-x-4 space-y- p-4">
          
           {/* FIRST NAME */}
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <Input
                    name="title"
                    placeholder="Enter the name of the property..."
                    className="mt-1 border-gray-300 placeholder:text-gray-500"
                    required
                  />
                </div>
           {/* LAST NAME */}
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <Input
                    name="title"
                    placeholder="Enter the name of the property..."
                    className="mt-1 border-gray-300 placeholder:text-gray-500"
                    required
                  />
                </div>

           {/* COMPANY NAME */}
                <div>
                  <label className="text-sm font-medium">Company Name</label>
                  <Input
                    name="title"
                    placeholder="Enter the name of the property..."
                    className="mt-1 border-gray-300 placeholder:text-gray-500"
                    required
                  />
                </div>

           {/* DATE OF BIRTH */}
                <div>
                  <label className="text-sm font-medium">Date of Birth</label>
                  <Input
                    name="title"
                    placeholder="Enter the name of the property..."
                    className="mt-1 border-gray-300 placeholder:text-gray-500"
                    required
                  />
                </div>
                
           {/* EMAIL */}
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    name="title"
                    placeholder="Enter the name of the property..."
                    className="mt-1 border-gray-300 placeholder:text-gray-500"
                    required
                  />
                </div>

            {/* PHONE  */}
                <div>
                  <label className="text-sm font-medium">Phone Number</label>

                  <PhoneInput
                    // value={form.phone}
                    // onChange={(val) => setForm({ ...form, phone: val })}
                    className="mt-1 border-gray-300 placeholder:text-gray-500"
                  />
                </div>


        </form>
      </main>
    </div>
  )
}

export default MyAccount
