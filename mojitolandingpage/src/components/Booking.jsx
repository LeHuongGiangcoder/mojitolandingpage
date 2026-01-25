import React, { useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Booking = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        dateTime: '',
        order: '',
        referral: 'Facebook'
    });

    const [status, setStatus] = useState(''); // 'submitting', 'success', 'error'

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        // Use the Test URL for debugging (webhook-test)
        const webhookUrl = 'https://n8n.giangle.site/webhook-test/7043f51e-0c1f-4a90-b471-76b78b5a3c82';
        
        // Construct URL with query parameters for GET request
        const params = new URLSearchParams(formData);
        const urlWithParams = `${webhookUrl}?${params.toString()}`;

        try {
            const response = await fetch(urlWithParams, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setStatus('success');
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    dateTime: '',
                    order: '',
                    referral: 'Facebook'
                });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        }
    };

    useGSAP(() => {
        gsap.from('#booking .will-fade-up', {
            scrollTrigger: {
                trigger: '#booking',
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out'
        });
    });

    return (
        <section id="booking" className="relative w-full min-h-screen py-20 px-5 flex flex-col justify-center items-center">
            <div className="container mx-auto max-w-4xl relative z-10">
                <div className="text-center mb-16 will-fade-up">
                    <p className="text-yellow font-modern-negra text-2xl mb-2">Reserve Your Spot</p>
                    <h2 className="text-5xl md:text-7xl font-modern-negra text-white">Book a Table</h2>
                    <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                        Join us for an unforgettable evening. Fill out the form below to secure your reservation.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/10 will-fade-up shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-300 uppercase tracking-wider">Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors placeholder-gray-500"
                                placeholder="John Doe"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium text-gray-300 uppercase tracking-wider">Phone Number *</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors placeholder-gray-500"
                                placeholder="(555) 123-4567"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-300 uppercase tracking-wider">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors placeholder-gray-500"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="dateTime" className="text-sm font-medium text-gray-300 uppercase tracking-wider">Date & Time *</label>
                            <input
                                type="datetime-local"
                                id="dateTime"
                                name="dateTime"
                                required
                                value={formData.dateTime}
                                onChange={handleChange}
                                className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors placeholder-gray-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="referral" className="text-sm font-medium text-gray-300 uppercase tracking-wider">How did you hear about us?</label>
                        <div className="relative">
                            <select
                                id="referral"
                                name="referral"
                                value={formData.referral}
                                onChange={handleChange}
                                className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors appearance-none cursor-pointer"
                            >
                                <option value="Facebook">Facebook</option>
                                <option value="Instagram">Instagram</option>
                                <option value="ChatGPT/Gemini">ChatGPT / Gemini</option>
                                <option value="Word of mouth">Word of mouth</option>
                                <option value="Other">Other</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="order" className="text-sm font-medium text-gray-300 uppercase tracking-wider">Your Order (Optional)</label>
                        <textarea
                            id="order"
                            name="order"
                            value={formData.order}
                            onChange={handleChange}
                            rows="3"
                            className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow transition-colors placeholder-gray-500 resize-none"
                            placeholder="Any specific cocktails or dietary requirements?"
                        ></textarea>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="w-full bg-white text-black font-modern-negra text-2xl py-4 rounded-xl hover:bg-yellow hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                        >
                            {status === 'submitting' ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : 'Confirm Reservation'}
                        </button>
                    </div>

                    {status === 'success' && (
                        <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-200 text-center">
                            Booking received! We will confirm your reservation shortly.
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-center">
                            Something went wrong. Please try again or call us directly.
                        </div>
                    )}
                </form>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>
        </section>
    );
};

export default Booking;
