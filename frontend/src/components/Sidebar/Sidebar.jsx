import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    
    <div className="flex h-screen w-16 flex-col justify-between border-e bg-white">
    <div>
      <div className="inline-flex size-16 items-center justify-center">
       H
      </div>
  
      <div className="border-t border-gray-100">
        <div className="px-2">
          <div className="py-4">
            <Link
              to={'/'}
              className="t group relative flex justify-center rounded bg-blue-50 px-2 py-1.5 text-blue-700"
            >
                    <i class="fa-solid fa-house"></i>
  
          
            </Link>
          </div>
  
          <ul className="space-y-1 border-t border-gray-100 pt-4">
            <li>
              <Link
                to={'/doctors'}
                className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                        <i class="fa-solid fa-user-doctor"></i>
  
                <span
                  className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                >
                  Doctors
                </span>
              </Link>
            </li>
  
            <li>
              <Link
                to={'patient'}
                className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
              <i class="fa-solid fa-hospital-user"></i>
  
                <span
                  className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                >
                  patients
                </span>
              </Link>
            </li>
  
          
          </ul>
        </div>
      </div>
    </div>
  
  </div>  )
}
