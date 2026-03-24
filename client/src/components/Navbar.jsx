import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'

const Navbar = () => {

    const { user, setShowLogin, logout, credit } = useContext(AppContext)
    const navigate = useNavigate()

    return (
        <motion.div
            className='flex items-center justify-between py-3'
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Logo */}
            <Link to='/'>
                <motion.img
                    src={assets.logo}
                    alt=""
                    className='w-28 sm:w-32 lg:w-40'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 200 }}
                />
            </Link>

            <div>
                {
                    user ?
                        <div className='flex items-center gap-2 sm:gap-4'>

                            {/* Credits Button */}
                            <motion.button
                                onClick={() => navigate('/buy')}
                                className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full shadow-sm'
                                whileHover={{ scale: 1.07, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 250 }}
                            >
                                <motion.img
                                    className='w-5'
                                    src={assets.credit_star}
                                    alt=""
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                />
                                <p className='text-xs sm:text-sm text-gray-600'>
                                    Credit left : {credit}
                                </p>
                            </motion.button>

                            {/* Username */}
                            <motion.p
                                className='text-gray-600 max-sm:hidden pl-4'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                {user.name}
                            </motion.p>

                            {/* Profile */}
                            <div className='relative group'>
                                <motion.img
                                    src={assets.profile_icon}
                                    className='w-10 drop-shadow cursor-pointer'
                                    alt=""
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                />

                                {/* Dropdown */}
                                <motion.div
                                    className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'
                                    initial={{ opacity: 0, y: -10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm shadow-lg'>
                                        <li
                                            onClick={logout}
                                            className='py-1 px-2 cursor-pointer pr-10 hover:bg-gray-100 rounded'
                                        >
                                            Logout
                                        </li>
                                    </ul>
                                </motion.div>
                            </div>
                        </div>
                        :
                        <div className='flex items-center gap-2 sm:gap-5'>

                            {/* Pricing */}
                            <motion.p
                                className='cursor-pointer'
                                onClick={() => navigate('/buy')}
                                whileHover={{ scale: 1.05 }}
                            >
                                Pricing
                            </motion.p>

                            {/* Login Button */}
                            <motion.button
                                onClick={() => setShowLogin(true)}
                                className='bg-zinc-900 text-white px-7 py-2 sm:px-10 text-sm rounded-full shadow-md'
                                whileHover={{ scale: 1.08, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 250 }}
                            >
                                Login
                            </motion.button>
                        </div>
                }
            </div>
        </motion.div>
    )
}

export default Navbar