import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import Sidebar from "../components/core/Dashboard/Sidebar"
import { useState } from "react"
import { AiOutlineMenu } from "react-icons/ai"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="md:hidden sticky top-0 z-[10] bg-richblack-900 border-b border-richblack-700">
          <div className="mx-auto w-11/12 py-3">
            <button
              className="inline-flex items-center gap-2 rounded-md border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open sidebar"
              type="button"
            >
              <AiOutlineMenu />
              <span className="text-sm">Menu</span>
            </button>
          </div>
        </div>
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard