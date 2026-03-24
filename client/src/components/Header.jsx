import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext.jsx'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const { user, setShowLogin } = useContext(AppContext)
    const navigate = useNavigate()

    const onClickHandler = () => {
        if (user) {
            navigate('/result')
        } else {
            setShowLogin(true)
        }
    }

    return (
        <motion.div
            className='flex flex-col justify-center items-center text-center my-20 relative overflow-hidden'
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
        >

            {/* ✨ Background Glow */}
            <div className='absolute w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30 top-10 left-10'></div>
            <div className='absolute w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-30 bottom-10 right-10'></div>

            {/* Badge */}
            <motion.div
                className='text-stone-600 inline-flex items-center gap-2 bg-white/70 backdrop-blur-md px-6 py-1 rounded-full border shadow-sm'
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <p>Best Text to Image Generator</p>
                <motion.img
                    src={assets.star_icon}
                    alt=""
                    animate={{ rotate: [0, 20, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                />
            </motion.div>

            {/* Heading */}
            <motion.h1
                className='text-4xl sm:text-7xl max-w-3xl mx-auto mt-4 font-semibold leading-tight'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
            >
                Turn Text To{" "}
                <span className='bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
                    Image
                </span>, In Seconds.
            </motion.h1>

            {/* Description */}
            <motion.p
                className='text-center max-w-lg mx-auto mt-5 text-gray-600'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                Turn your imagination into visuals — just describe it, and watch it come to life instantly.
            </motion.p>

            {/* CTA Button */}
            <motion.button
                onClick={onClickHandler}
                className='relative sm:text-lg text-white mt-8 px-12 py-3 flex items-center gap-2 rounded-full bg-linear-to-r from-black to-gray-800 shadow-lg'
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                Generate Images
                <motion.img
                    className='h-6'
                    src={assets.star_group}
                    alt=""
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                />

                {/* Glow ring */}
                <span className='absolute inset-0 rounded-full bg-white/10 blur-md opacity-0 hover:opacity-100 transition'></span>
            </motion.button>

            {/* Image Grid */}
            <motion.div
                className='flex flex-wrap justify-center mt-16 gap-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                {Array(6).fill('').map((item, index) => (
                    <motion.img
                        key={index}
                        src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
                        alt=""
                        width={75}
                        className='rounded-xl shadow-md cursor-pointer'
                        whileHover={{ scale: 1.1, rotate: 1 }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                            y: { repeat: Infinity, duration: 2, delay: index * 0.2 },
                            hover: { duration: 0.2 }
                        }}
                    />
                ))}
            </motion.div>

            {/* Footer Text */}
            <motion.p
                className='mt-4 text-neutral-500 text-sm'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
                Generated Images from Imagify ✨
            </motion.p>

        </motion.div>
    )
}

export default Header