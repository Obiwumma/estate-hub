import { Card } from "@/components/ui/card";

export default function AccountLayout({ children }) {
  return (
      
        <Card className="flex">

          {/* SIDEBAR */}
          <nav className=" text-gray-900 w-[50%] p-6">
            
            <div className=" flex flex-col justify-between ">
              <div>
                <ul className="grid gap-10">
                  <li>
                    <div>
                      <h1>Account</h1>
                      <p className="text-sm  text-gray-500">Manage your account details</p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h1>Password</h1>
                      <p className="text-sm  text-gray-500">Change your password for security</p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h1>Notification</h1>
                      <p className="text-sm  text-gray-500">Set your notification preferences</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <span>Log Out</span>
              </div>
            </div>
          </nav>

          {/* MAIN CONTENT */}
          <div className=" w-full">

            {/* PAGE CONTENT */}
            <div className="p-6">
              {children}
            </div>
          </div>

        </Card>

    
  );
}