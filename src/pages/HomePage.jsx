import React from 'react'
import Layout from '../Layout/Layout'
import ashish from '../assets/banner-img-1.png'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <Layout>
      <div className="flex items-center justify-center gap-10 mx-16 h-[90vh] pt-10">
        {/* Left Section: Platform Details */}
        <div className="w-1/2 space-y-6">
          <h1 className="text-7xl tracking-wider leading-tight text-indigo-950 font-bold select-none">
            Employee Performance Improvement Strategy
          </h1>
          <p className="text-xl tracking-widest font-semibold text-black-200 select-none">
            PRESENTATION
          </p>

          {/* Buttons */}
          <Link to="/documents" className="space-x-6">
            <button className="sm:w-full lg:w-auto font-semibold my-2 border rounded md py-4 px-8 text-center bg-cyan-600 text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-700 focus:ring-opacity-50">
              Explore Company
            </button>
          </Link>
        </div>

        {/* Right Section: Image */}
        <div className="w-1/2 flex items-center justify-center">
          <img src={ashish} alt="home page image" />
        </div>
      </div>
    </Layout>

  )
}

export default HomePage