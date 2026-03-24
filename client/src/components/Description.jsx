import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Description = () => {
    return (
        <motion.div
            className='flex flex-col items-center justify-center my-24 p-6 md:px-28'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
        >
            <motion.h1
                className='text-3xl sm:text-4xl font-semibold mb-2'
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                Create AI Images
            </motion.h1>

            <motion.p
                className='text-gray-500 mb-8'
                initial={{ y: -10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                Turn your Imagination into Visuals
            </motion.p>

            <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center'>

                <motion.img
                    src={assets.sample_img_1}
                    alt=""
                    className='w-80 xl:w-96 rounded-lg'
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                />

                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className='text-3xl font-medium max-w-lg mb-4'>
                        Introducing the best AI -Powered Text to Image Generator
                    </h2>

                    <p className='text-gray-600 mb-4'>
                        This application is an intelligent text-to-image generation system that transforms user-provided textual descriptions into visually meaningful images using advanced artificial intelligence techniques. The app allows users to simply enter a prompt in natural language, and the system generates high-quality, creative visuals that accurately reflect the input.
                    </p>

                    <p className='text-gray-600 mb-4'>
                        The user interface is designed to be simple and intuitive, allowing users to input text, customize parameters (such as style, resolution, or theme), and instantly view generated images. The system emphasizes real-time performance, scalability, and ease of use, making it suitable for both beginners and professionals.
                    </p>
                </motion.div>

            </div>
        </motion.div>
    )
}

export default Description