"use client";

import React from "react";
import Notes from "@/components/Notes";
import Sidebar from "@/components/sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page: React.FC = () => {
  const [profile, setProfile] = useState({});
  

  const fetchProfile = () => {
    const
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-4 sm:ml-48 overflow-y-auto">
        <div>
          <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center text-2xl font-bold">
                  T
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold">Lucky</h2>
                  <p className="text-gray-500">testflow21@gmail.com</p>
                  <p className="text-gray-500">+919988776655</p>
                  <p className="text-gray-500">Delhi, India, 110077.</p>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link href={"/onboarding?step=1"}>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                  Edit Profile
                </Button>
              </Link>
            </div>

            <div className="p-6 border-t">
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Goal</span>
                <span className="text-gray-500">-</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Board</span>
                <span className="text-gray-800 font-medium">
                  Central Board of Secondary Education (CBSE)
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">className</span>
                <span className="text-gray-800 font-medium">
                  Second Time Dropper
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
