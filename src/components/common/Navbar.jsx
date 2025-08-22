// import React, { useEffect, useState } from 'react'
// import logo from "../../assets/Logo/Logo-Full-Light.png"
// import { Link, matchPath } from 'react-router-dom'
// import { NavbarLinks} from "../../data/navbar-links"
// import { useLocation } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import ProfileDropDown from '../core/Auth/ProfileDropDown'
// import { apiConnector } from '../../services/apiconnector'
// import { categories } from '../../services/apis'
// import { IoIosArrowDropdownCircle } from "react-icons/io";


// const subLinks = [
//     {
//         title:"python",
//         link:"/catalog/python"
//     },
//     {
//         title:"web dev",
//         link:"/catalog/web-development"
//     }
// ]

// const Navbar = () => {

//     const {token }= useSelector((state)=> state.auth);
//     const {user} = useSelector((state)=>state.profile);
//     const {totalItems} = useSelector((state)=>state.cart)

//     const location = useLocation();

//     const {subLinks, setSubLinks} = useState([]);

//     // const fetchSublinks = async() => {
//     //         try{
//     //             const result = await apiConnector("GET", categories.CATEGORIES_API);
//     //             console.log("Printing Sublinks result:", result);
//     //             setSubLinks(result.data.data);
//     //         }catch(error){
//     //             console.log("Could not fetch the category list");
//     //         }
//     //     }


//     useEffect(()=>{
//     //    fetchSublinks();
//     },[])


//     const matchRoute = (route)=>{
//         return matchPath({path:route}, location.pathname);
//     }

//   return (
//     <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 '>
//         <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
//         {/*Image*/}
//             <Link to="/">
//             <img src={logo} width={160} height={42}  loading='lazy'/>
//             </Link>

//      {/*NavLinks*/}
//         <nav className="hidden md:block">
//             <ul className='flex gap-x-6 text-richblack-25'>
//                 {
//                     NavbarLinks.map((link, index)=>(
//                         <li key={index}>
//                             {
//                                 link.title === "Catalog" ? (
//                                     <div className='relative flex items-center gap-2 group'>
//                                         <p>{link.title}</p>
//                                         <IoIosArrowDropdownCircle />

//                                         <div className='invisible absolute left-[50%] translate-x-[-50%] top-[50%] flex flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 z-[1000] translate-y-[3em] group-hover:visible group-hover:opacity-100 lg:w-[300px]'>
//                                             <div className='absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5 '>

//                                             </div>

//                                             {
//                                                 subLinks.length ? (
//                                                         subLinks.map((subLink, index) => (
//                                                             <Link to={`${subLink.link}`} key={index}>
//                                                                 <p>{subLink.title}</p>

//                                                             </Link>
//                                                         ))
//                                                 ) : (<div></div>)
//                                             }

//                                         </div>
//                                     </div>
//                                 ):(
//                                     <Link to={link?.path}>
//                                         <p className={`${matchRoute(link?.path) ? "text-yellow-25":"text-richblack-25"}`}>
//                                             {link.title}
//                                         </p>
//                                     </Link>
//                                 )
//                             }
//                         </li>
//                     ))
//                 }
//             </ul>
//         </nav>

//         {/*Nav Links*/}
//         <nav>

//         </nav>

//         {/*Login/SignUp/Dashboard */}
//         <div className='flex gap-x-4 items-center '>
//                 {
//                     user && user?.accoutType !== "Instructor" && (
//                         <Link to="/dashboard/cart" className='relative'>
//                             <AiOutlineShoppingCart className="text-2xl text-richblack-100"/>
//                             {
//                                 totalItems > 0 && (
//                                     <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
//                                         {totalItems}
//                                     </span>
//                                 )
//                             }
//                         </Link>
//                     )
//                 }
//                 {
//                     token === null && (
//                         <Link to = "/login">
//                             <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
//                                 Log in
//                             </button>
//                         </Link>
//                     )
//                 }
//                 {
//                     token === null && (
//                         <Link to = "/signup">
//                             <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
//                                 Sign Up
//                             </button>
//                         </Link>
//                     )
//                 }
//                 {
//                     token !==null && <ProfileDropDown/> 
//                 }
//         </div>

//         </div>
//     </div>
//   )
// }

// export default Navbar




/*----------------------------------------------------------------------------------------------------------*/


import { useEffect, useState } from "react"
import { AiOutlineMenu, AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai"
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { apiConnector } from "../../services/apiconnector"
import { categories } from "../../services/apis"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "../core/Auth/ProfileDropDown"

function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        setSubLinks(res.data.data)
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  // console.log("sub links", subLinks)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>
        {/* Navigation links */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : (subLinks && subLinks.length) ? (
                          <>
                            {subLinks
                              ?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        <button className="mr-4 md:hidden" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu" type="button">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[1000] bg-black/50 md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-[320px] bg-richblack-800 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                <img src={logo} alt="Logo" width={140} height={28} loading="lazy" />
              </Link>
              <button className="p-2" aria-label="Close menu" type="button" onClick={() => setIsMobileMenuOpen(false)}>
                <AiOutlineClose fontSize={22} className="text-richblack-100" />
              </button>
            </div>

            <nav className="mt-6">
              <ul className="flex flex-col gap-2 text-richblack-25">
                {NavbarLinks.map((link, index) => (
                  <li key={index}>
                    {link.title === "Catalog" ? (
                      <div>
                        <p className="mb-2 text-xs uppercase text-richblack-300">Catalog</p>
                        <div className="flex flex-col">
                          {loading ? (
                            <p className="px-3 py-2">Loading...</p>
                          ) : (subLinks && subLinks.length) ? (
                            subLinks.map((subLink, i) => (
                              <Link
                                key={i}
                                to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                                className="rounded-lg px-3 py-2 hover:bg-richblack-700"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {subLink.name}
                              </Link>
                            ))
                          ) : (
                            <p className="px-3 py-2">No Courses Found</p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={link?.path}
                        className={`block rounded-lg px-3 py-2 hover:bg-richblack-700 ${
                          matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-6 flex items-center gap-4">
              {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                <Link to="/dashboard/cart" className="relative" onClick={() => setIsMobileMenuOpen(false)}>
                  <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                  {totalItems > 0 && (
                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                      {totalItems}
                    </span>
                  )}
                </Link>
              )}
              {token === null && (
                <>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                      Log in
                    </button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                      Sign up
                    </button>
                  </Link>
                </>
              )}
              {token !== null && <ProfileDropdown />}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar