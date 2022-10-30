import React from 'react'

function BaseSekeleton() {
  return (
    <div className="flex justify-center">
        <div className="w-full animate-pulse flex-row items-center justify-center rounded-xl border p-6">
        <div className="flex flex-col space-y-2">
            <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
            <div className="h-6 w-10/12 rounded-md bg-gray-300 "></div>
            <div className="h-6 w-9/12 rounded-md bg-gray-300 "></div>
            <div className="h-6 w-9/12 rounded-md bg-gray-300 "></div>
        </div>
        </div>
    </div>
  )
}

export default BaseSekeleton