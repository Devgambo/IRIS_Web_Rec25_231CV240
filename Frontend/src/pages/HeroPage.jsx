import React from "react";
import { Button } from "@/components/ui/button"; // ShadCN button
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

const HeroPage = () => {
    return (
        <section className="w-full bg-black text-white py-20 px-6">
            <div className="max-w-7xl md:my-20 mx-auto flex flex-col md:flex-row items-center justify-between gap-12">

                {/* Left Side Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex-1"
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                        Welcome to <br />
                        <span className="text-white">NITK SportsMate</span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/50 mb-8">
                        Your ultimate sports facility & equipment booking hub. Hassle-free scheduling, real-time availability, and seamless reservations – all in one place!
                    </p>

                    <div className="flex gap-4">
                        <SignedIn>
                            <Link to={'/dashboard'}>
                                <Button size="lg" className="bg-white/90 text-black hover:bg-white/40">
                                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </SignedIn>
                        <SignedOut>
                            <Link to={'/signup'}>
                                <Button size="lg" className="bg-white/90 text-black hover:bg-white/40">
                                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </SignedOut>

                    </div>
                </motion.div>

                {/* Right Side Image / Illustration */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex-1 flex justify-center"
                >
                    <img
                        src="/logo3 (1).png"
                        alt="imgHero"
                        className="w-full max-w-md"
                    />
                </motion.div>
            </div>

            {/* Features Highlights */}
            <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                    <h3 className="text-xl font-semibold mb-2">Instant Booking</h3>
                    <p className="text-sm text-gray-300">Book facilities & equipment in seconds.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                    <h3 className="text-xl font-semibold mb-2">Real-Time Updates</h3>
                    <p className="text-sm text-gray-300">Live availability & notifications.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                    <h3 className="text-xl font-semibold mb-2">Verified Access</h3>
                    <p className="text-sm text-gray-300">Secure booking with NITK credentials.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                    <h3 className="text-xl font-semibold mb-2">Easy Cancellations</h3>
                    <p className="text-sm text-gray-300">Flexible changes to your bookings.</p>
                </div>
            </div>
        </section>
    );
};

export default HeroPage;
