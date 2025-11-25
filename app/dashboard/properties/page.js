import React from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from 'next/image';

function PropertiesList() {
  return (
    <div className='text-gray-800'>
      <header className='flex justify-between'>
        <span className='text-2xl font-bold'>Properties</span>
        <Button className="bg-purple-600 text-white rounded px-5 py-5 " > + Add Property</Button>
      </header>

      <nav className='bg-white p-6 flex gap-10 rounded-xl mt-5 mb-10'>
        <div>
          <Select name="status">
                <SelectTrigger className="rounded border-gray-300">
                  <SelectValue placeholder="Rent Property" />
                </SelectTrigger>
                <SelectContent className="bg-white" >
                  <SelectItem value="For Sale">For Sale</SelectItem>
                  <SelectItem value="Rented">Rented</SelectItem>
                </SelectContent>
              </Select>
        </div>
        <div>
          <Select name="status"  >
                <SelectTrigger className="rounded border-gray-300">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent className="bg-white" >
                  <SelectItem value="For Sale">For Sale</SelectItem>
                  <SelectItem value="Rented">Rented</SelectItem>
                </SelectContent>
              </Select>
        </div>
        <div>
          <Select name="status">
                <SelectTrigger className="rounded border-gray-300">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent className="bg-white" >
                  <SelectItem value="For Sale">For Sale</SelectItem>
                  <SelectItem value="Rented">Rented</SelectItem>
                </SelectContent>
              </Select>
        </div>
        <div>
          <Button className="bg-purple-600 text-white rounded px-5 py-4 " >Search</Button>
        </div>
      </nav>

      <main>
        <div className='grid grid-cols-4 gap-10 justify-evenly'>
          <Card className="min-w-52" >
            <CardHeader><Image alt='property image' src={"/ahouse.jpg"} alt='A house' width={200} height={200} ></Image> </CardHeader>
            <CardContent>St.George Bayfont</CardContent>
            <CardContent>Washington DC</CardContent>
            {/* <div className='flex'>
              <CardFooter>3 bedrooms </CardFooter>
              <CardFooter>2 bathrooms</CardFooter>
            </div> */}
            <hr />
            <CardContent>$4000 Read More</CardContent>
          </Card>

          <Card className="min-w-52" >
            <CardHeader><Image src={"/ahouse.jpg"} alt='A house' width={200} height={200} ></Image> </CardHeader>
            <CardContent>St.George Bayfont</CardContent>
            <CardContent>Washington DC</CardContent>
            {/* <div className='flex'>
              <CardFooter>3 bedrooms </CardFooter>
              <CardFooter>2 bathrooms</CardFooter>
            </div> */}
            <hr />
            <CardContent>$4000 Read More</CardContent>
          </Card>

          <Card className="min-w-52" >
            <CardHeader><Image src={"/ahouse.jpg"} alt='A house' width={200} height={200} ></Image> </CardHeader>
            <CardContent>St.George Bayfont</CardContent>
            <CardContent>Washington DC</CardContent>
            {/* <div className='flex'>
              <CardFooter>3 bedrooms </CardFooter>
              <CardFooter>2 bathrooms</CardFooter>
            </div> */}
            <hr />
            <CardContent>$4000 Read More</CardContent>
          </Card>

          <Card className="min-w-52" >
            <CardHeader><Image src={"/ahouse.jpg"} alt='A house' width={200} height={200} ></Image> </CardHeader>
            <CardContent>St.George Bayfont</CardContent>
            <CardContent>Washington DC</CardContent>
            {/* <div className='flex'>
              <CardFooter>3 bedrooms </CardFooter>
              <CardFooter>2 bathrooms</CardFooter>
            </div> */}
            <hr />
            <CardContent>$4000 Read More</CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default PropertiesList
