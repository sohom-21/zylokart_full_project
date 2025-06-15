'use client';

import React, { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import CustomerNavbar from '@/app/components/Navbars/navbar-customer'
import Footer from "@/app/components/Footer";
import Link from 'next/link';

const CheckoutPage = () => {
    const [stage, setStage] = useState(0); // 0: initial text, 1: loader, 2: success

    useEffect(() => {
        // Stage 0: Initial text for 5 seconds
        const timer1 = setTimeout(() => {
            setStage(1);
        }, 4000);

        return () => clearTimeout(timer1);
    }, []);

    useEffect(() => {
        // Stage 1: Loader for 4 seconds, only if stage is 1
        if (stage === 1) {
            const timer2 = setTimeout(() => {
                setStage(2);
            }, 5000);
            return () => clearTimeout(timer2);
        }
    }, [stage]);

    return (
        <div>
             <CustomerNavbar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-zinc-800">
           
            {stage === 0 && (
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Order is under process...</h1>
                    <p className="text-lg">Please wait while we confirm your order details.</p>
                </div>
            )}

            {stage === 1 && (
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Processing your order...</h1>
                    <DotLottieReact
                        src="https://lottie.host/1aaa03b7-6e1e-47e3-83ef-0ad7e8d642ee/cgOWyLW1bV.lottie"
                        loop
                        autoplay
                    />
                </div>
            )}

            {stage === 2 && (
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h1>
                    <p className="text-lg mb-8">Thank you for your purchase.</p>
                    <Link href="/customer/homepage">
                        <button className="bg-amber-300 text-black px-6 py-3 rounded font-medium hover:bg-amber-400 transition">
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            )}
           
        </div>
        <Footer />
        </div>
    );
};

export default CheckoutPage;