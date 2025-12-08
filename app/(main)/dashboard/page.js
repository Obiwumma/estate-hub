"use client";


import AuthGuard from "../../_components/AuthGuard";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (

      <AuthGuard>
        <div className="p-4">
          <h1 className="text-3xl font-bold">Welcome, Customer</h1>
          <div className="flex justify-evenly mt-16">
            <Card className="min-w-60" >
              <CardHeader>Total Properties</CardHeader>
              <CardContent>35,000</CardContent>
              <CardFooter>+3.28% last month</CardFooter>
            </Card>
            <Card className="min-w-60" >
              <CardHeader>Property Rent</CardHeader>
              <CardContent>35,000</CardContent>
              <CardFooter>+3.28% last month</CardFooter>
            </Card>
            <Card className="min-w-60" >
              <CardHeader>Property Sale</CardHeader>
              <CardContent>35,000</CardContent>
              <CardFooter>+3.28% last month</CardFooter>
            </Card>
            <Card className="min-w-60" >
              <CardHeader>Available Property</CardHeader>
              <CardContent>35,000</CardContent>
              <CardFooter>+3.28% last month</CardFooter>
            </Card>
          </div>
        </div>
      </AuthGuard>
    
  );
}
