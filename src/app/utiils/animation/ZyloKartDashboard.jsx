import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { DotsVerticalIcon, ExpandIcon, PlusIcon, CloseIcon } from './Icons';
import { AddIcon } from '../framer-motion_sandbox example/AddIcon';
import { CloseIcon as TabCloseIcon } from '../framer-motion_sandbox example/CloseIcon';
import useTypewriter, { useMultiTypewriter } from '../utils/typewrite';

// SVG imports (we'll use them as icons for categories)
import icon1 from '../assets/1.svg';
import icon2 from '../assets/2.svg';
import icon3 from '../assets/3.svg';
import icon4 from '../assets/4.svg';
import icon5 from '../assets/5.svg';
import icon6 from '../assets/6.svg';
import icon7 from '../assets/7.svg';
import icon8 from '../assets/8.svg';

// ▼▼▼ DEFINE THE ARRAY OUTSIDE THE COMPONENT ▼▼▼
const allCategories = [
    { icon: icon1, label: "Electronics", description: "Latest gadgets and tech", bgGradient: "from-blue-500 to-purple-600" },
    { icon: icon2, label: "Fashion", description: "Trending styles", bgGradient: "from-pink-500 to-rose-600" },
    { icon: icon3, label: "Home & Garden", description: "Living essentials", bgGradient: "from-green-500 to-emerald-600" },
    { icon: icon4, label: "Sports", description: "Athletic gear", bgGradient: "from-orange-500 to-red-600" },
    { icon: icon5, label: "Books", description: "Knowledge & stories", bgGradient: "from-indigo-500 to-blue-600" },
    { icon: icon6, label: "Beauty", description: "Self-care products", bgGradient: "from-purple-500 to-pink-600" },
    { icon: icon7, label: "Automotive", description: "Car accessories", bgGradient: "from-gray-500 to-slate-600" },
    { icon: icon8, label: "Gaming", description: "Entertainment hub", bgGradient: "from-cyan-500 to-blue-600" }
];

const ZyloKartDashboard = ({ addToCardRefs }) => {
    const salesRef = useRef(null);
    const ordersRef = useRef(null);
    const inventoryRef = useRef(null);

    const [tabs, setTabs] = useState([allCategories[0], allCategories[1], allCategories[2]]);
    const [selectedTab, setSelectedTab] = useState(tabs[0]);    // Typewriter effects - stable across re-renders now that allCategories is outside
    const titleText = useMultiTypewriter([
        "Manage your Ecommerce Empire",
        "Scale your Business Growth", 
        "Track Performance Metrics",
        "Optimize Sales Strategy"
    ], 80, 500, 2000);
    
    const urlText = useTypewriter("admin.zylokart.com", 120, 1000, true, false);    // Remove tab function - memoized with useCallback
    const removeTab = useCallback((item) => {
        if (item === selectedTab) {
            const index = tabs.indexOf(item);
            const nextTab = index === tabs.length - 1 ? tabs[index - 1] : tabs[index + 1];
            setSelectedTab(nextTab);
        }
        setTabs(tabs.filter(tab => tab !== item));
    }, [tabs, selectedTab]);    // Add tab function - now cycles through categories in order with better logic
    const addTab = useCallback(() => {
        if (tabs.length >= allCategories.length) return; // Prevent adding if all categories are already added
        
        // This filter is now much safer. It checks by a unique ID (the label) instead of object reference.
        const availableCategories = allCategories.filter(
            cat => !tabs.some(tab => tab.label === cat.label)
        );
        
        if (availableCategories.length > 0) {
            const newTab = availableCategories[0]; // Always take the first available
            setTabs(prevTabs => [...prevTabs, newTab]);
            setSelectedTab(newTab);
        }
    }, [tabs]);    // Top selling products data based on selected category - memoized to prevent re-creation
    const getProductsForCategory = useMemo(() => {
        const productsByCategory = {
            'Electronics': [
                { name: "iPhone 15 Pro", sales: 245, change: "+18%", color: "bg-green-500" },
                { name: "MacBook Air M3", sales: 156, change: "+12%", color: "bg-green-500" },
                { name: "AirPods Pro", sales: 89, change: "-3%", color: "bg-red-500" }
            ],
            'Fashion': [
                { name: "Designer Jeans", sales: 189, change: "+22%", color: "bg-green-500" },
                { name: "Summer Dress", sales: 134, change: "+8%", color: "bg-green-500" },
                { name: "Sneakers", sales: 97, change: "+15%", color: "bg-green-500" }
            ],
            'Home & Garden': [
                { name: "Smart Thermostat", sales: 167, change: "+25%", color: "bg-green-500" },
                { name: "Garden Tools Set", sales: 89, change: "+10%", color: "bg-green-500" },
                { name: "LED Bulbs", sales: 234, change: "+30%", color: "bg-green-500" }
            ],
            'Sports': [
                { name: "Yoga Mat", sales: 156, change: "+20%", color: "bg-green-500" },
                { name: "Running Shoes", sales: 189, change: "+15%", color: "bg-green-500" },
                { name: "Protein Powder", sales: 134, change: "+12%", color: "bg-green-500" }
            ],
            'Books': [
                { name: "Programming Guide", sales: 78, change: "+14%", color: "bg-green-500" },
                { name: "Fiction Novel", sales: 145, change: "+8%", color: "bg-green-500" },
                { name: "Self-Help Book", sales: 92, change: "+18%", color: "bg-green-500" }
            ],
            'Beauty': [
                { name: "Skincare Set", sales: 198, change: "+35%", color: "bg-green-500" },
                { name: "Makeup Palette", sales: 134, change: "+22%", color: "bg-green-500" },
                { name: "Hair Serum", sales: 87, change: "+16%", color: "bg-green-500" }
            ],
            'Automotive': [
                { name: "Car Phone Mount", sales: 123, change: "+12%", color: "bg-green-500" },
                { name: "Dash Cam", sales: 89, change: "+8%", color: "bg-green-500" },
                { name: "Air Freshener", sales: 156, change: "+20%", color: "bg-green-500" }
            ],
            'Gaming': [
                { name: "Gaming Headset", sales: 178, change: "+28%", color: "bg-green-500" },
                { name: "Mechanical Keyboard", sales: 134, change: "+15%", color: "bg-green-500" },
                { name: "Gaming Mouse", sales: 167, change: "+18%", color: "bg-green-500" }
            ]
        };
        return (category) => productsByCategory[category] || productsByCategory['Electronics'];
    }, []);useEffect(() => {
        if (salesRef.current) {
            addToCardRefs(salesRef.current);
        }
        if (ordersRef.current) {
            addToCardRefs(ordersRef.current);
        }
        if (inventoryRef.current) {
            addToCardRefs(inventoryRef.current);
        }
    }, [addToCardRefs]);    // Tab component for the category tabs - memoized to prevent unnecessary re-renders
    const CategoryTab = React.memo(({ item, onClick, isSelected }) => {return (
            <Reorder.Item
                value={item}
                id={item.label}
         //        initial={{ opacity: 0, y: 30 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.15 }
                }}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
                whileDrag={{ scale: 1.05 }}
                className={`relative min-w-[100px] ${isSelected ? 'z-10' : 'z-0'}`}
                onPointerDown={onClick}
            >
                <motion.div
                    animate={{
                        backgroundColor: isSelected ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.05)",
                    }}
                    className={`backdrop-blur-md border border-white/20 rounded-lg p-2 cursor-pointer transition-all duration-300 ${
                        isSelected ? 'shadow-xl' : 'shadow-md hover:shadow-lg'
                    }`}
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <motion.img 
                                src={item.icon} 
                                alt={item.label}
                                className="w-4 h-4"
                                animate={{ rotate: isSelected ? 360 : 0 }}
                                transition={{ duration: 0.5 }}
                            />
                            <div>
                                <motion.span 
                                    layout="position"
                                    className="text-xs font-medium text-white block"
                                >
                                    {item.label}
                                </motion.span>
                                <motion.span 
                                    layout="position"
                                    className="text-xs text-gray-300 block truncate max-w-[60px]"
                                >
                                    {item.description}
                                </motion.span>
                            </div>
                        </div>                        {tabs.length > 1 && (
                            <motion.div className="close ml-1 flex-shrink-0">
                                <motion.button
                                    onPointerDown={(event) => {
                                        event.stopPropagation();
                                        removeTab(item);
                                    }}
                                    initial={false}
                                    animate={{ 
                                        backgroundColor: isSelected ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.2)",
                                        opacity: 1,
                                        scale: 1
                                    }}
                                    whileHover={{ 
                                        scale: 1.2, 
                                        opacity: 1,
                                        backgroundColor: "rgba(255, 0, 0, 0.7)"
                                    }}
                                    className="w-5 h-5 rounded-full flex items-center justify-center transition-all border border-white/30 hover:border-red-400"
                                >
                                    <div className="w-3 h-3 flex items-center justify-center">
                                        <TabCloseIcon />
                                    </div>
                                </motion.button>
                            </motion.div>
                        )}
                    </div>                </motion.div>
            </Reorder.Item>
        );
    });

    return (
        <section className="mt-16 px-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
            >                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                    Welcome to <span className="text-blue-400">ZyloKart</span>
                    <br />
                    <span className="text-gray-400">Admin Dashboard</span>
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto mb-6">
                    Manage your ecommerce business with powerful analytics, inventory tracking, and sales insights.
                </p>
            </motion.div>            {/* Store Dashboard Preview */}
            <div className="mt-8 mb-12 relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-slate-900 bg-opacity-90 rounded-lg overflow-hidden shadow-2xl max-w-4xl mx-auto"
                >
                    {/* Browser Chrome */}
                    <div className="flex items-center bg-gray-800 p-2 space-x-2">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>                        <div className="flex-1 mx-10 rounded bg-gray-700 h-6 flex items-center justify-center text-xs text-gray-400">
                            {urlText}
                        </div>
                        <div className="flex space-x-2">
                            <ExpandIcon className="h-4 w-4" />
                            <PlusIcon className="h-4 w-4" />
                            <CloseIcon className="h-4 w-4" />
                        </div>
                    </div>                    <div className="p-4">
                        {/* Header */}
                        <div className="flex items-center mb-4">
                            <div className="flex items-center">
                                <div className="bg-blue-500 rounded-lg p-1.5 mr-2">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="text-sm"
                                    >
                                        🛒
                                    </motion.div>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-400">ZyloKart</span>
                                    <p className="text-sm font-semibold">Ecommerce Dashboard</p>
                                </div>
                            </div>

                            <div className="ml-auto flex space-x-1">
                                <a href="#" className="px-2 py-1 bg-gray-800 rounded text-xs hover:bg-gray-700 transition-colors">Dashboard</a>
                                <a href="#" className="px-2 py-1 bg-gray-800 rounded text-xs hover:bg-gray-700 transition-colors">Orders</a>
                                <a href="#" className="px-2 py-1 bg-gray-800 rounded text-xs hover:bg-gray-700 transition-colors">Products</a>
                                <a href="#" className="px-2 py-1 bg-gray-800 rounded text-xs hover:bg-gray-700 transition-colors">Analytics</a>
                            </div>
                        </div>                        {/* Dashboard Title */}
                        <div className="mb-4">
                            <h2 className="text-lg font-bold mb-1">{titleText}</h2>
                            <p className="text-xs text-gray-400">December 16, 2025, 02:30pm</p>
                        </div>{/* Metrics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <motion.div
                                ref={salesRef}
                                whileHover={{ scale: 1.02 }}
                                className="bg-gray-600 bg-opacity-55 backdrop-blur-2xl p-3 rounded-lg"
                            >
                                <div className="flex justify-between mb-2">
                                    <span className="text-xs text-gray-50">Total Sales</span>
                                    <DotsVerticalIcon className="h-3 w-3 text-gray-400" />
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="text-xl font-bold mb-1"
                                >
                                    $12.4k
                                </motion.div>
                                <div className="flex items-center text-xs">
                                    <motion.span
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="bg-green-500 text-white px-1.5 py-0.5 rounded text-xs mr-2"
                                    >
                                        +24%
                                    </motion.span>
                                    <span className="text-gray-50">vs last month</span>
                                </div>
                            </motion.div>

                            <motion.div
                                ref={ordersRef}
                                whileHover={{ scale: 1.02 }}
                                className="bg-gray-600 bg-opacity-55 backdrop-blur-2xl p-3 rounded-lg"
                            >
                                <div className="flex justify-between mb-2">
                                    <span className="text-xs text-gray-50">Total Orders</span>
                                    <DotsVerticalIcon className="h-3 w-3 text-gray-400" />
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.7 }}
                                    className="text-xl font-bold mb-1"
                                >
                                    1,247
                                </motion.div>
                                <div className="flex items-center text-xs">
                                    <motion.span
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                        className="bg-blue-500 text-white px-1.5 py-0.5 rounded text-xs mr-2"
                                    >
                                        +15%
                                    </motion.span>
                                    <span className="text-gray-50">vs last month</span>
                                </div>
                            </motion.div>

                            <motion.div
                                ref={inventoryRef}
                                whileHover={{ scale: 1.02 }}
                                className="bg-gray-600 bg-opacity-55 backdrop-blur-2xl p-3 rounded-lg relative"
                            >
                                <div className="flex justify-between mb-2">
                                    <span className="text-xs text-gray-50">Inventory Status</span>
                                    <DotsVerticalIcon className="h-3 w-3 text-gray-400" />
                                </div>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.5, delay: 0.9 }}
                                    className="space-y-2"
                                >
                                    <div className="flex justify-between text-xs">
                                        <span>In Stock: 89%</span>
                                        <span className="text-green-400">Good</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "89%" }}
                                            transition={{ duration: 1.5, delay: 1.2 }}
                                            className="bg-green-500 h-1.5 rounded-full"
                                        ></motion.div>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-50">
                                        <span>Low Stock: 23 items</span>
                                        <span className="text-yellow-400">Monitor</span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>                        {/* Enhanced Category Tabs with Framer Motion */}
                        <div className="mb-4">
                            <h3 className="text-md font-semibold mb-3">Product Categories</h3>
                            <div className="bg-gray-800/30 backdrop-blur-md rounded-xl p-3 border border-white/10">
                                <nav className="flex items-center justify-between">
                                    <Reorder.Group
                                        as="div"
                                        axis="x"
                                        onReorder={setTabs}
                                        className="flex space-x-2 flex-grow overflow-x-auto pb-1"
                                        values={tabs}
                                    >
                                        <AnimatePresence initial={false}>
                                            {tabs.map((item) => (
                                                <CategoryTab
                                                    key={item.label}
                                                    item={item}
                                                    isSelected={selectedTab === item}
                                                    onClick={() => setSelectedTab(item)}
                                                    onRemove={() => removeTab(item)}
                                                />
                                            ))}
                                        </AnimatePresence>
                                    </Reorder.Group>
                                    {tabs.length < allCategories.length && (
                                        <motion.button
                                            className="ml-3 w-6 h-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                                            onClick={addTab}
                                            disabled={tabs.length === allCategories.length}
                                            whileTap={{ scale: 0.9 }}
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <AddIcon />
                                        </motion.button>
                                    )}
                                </nav>
                            </div>
                        </div>

                        {/* Selected Category Content */}
                        <AnimatePresence mode="wait">                            <motion.div
                                key={selectedTab ? selectedTab.label : "empty"}
                                animate={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 20 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.15 }}
                                className={`bg-gradient-to-br ${selectedTab?.bgGradient || 'from-gray-500 to-gray-600'} bg-opacity-20 backdrop-blur-md rounded-xl p-4 border border-white/10`}
                            >
                                <div className="flex items-center mb-3">
                                    <motion.img 
                                        src={selectedTab?.icon} 
                                        alt={selectedTab?.label}
                                        className="w-8 h-8 mr-3"
                                        animate={{ 
                                            scale: [1, 1.1, 1],
                                            rotate: [0, 5, -5, 0]
                                        }}
                                        transition={{ 
                                            duration: 2, 
                                            repeat: Infinity,
                                            repeatType: "reverse"
                                        }}
                                    />
                                    <div>
                                        <h4 className="text-lg font-bold">{selectedTab?.label}</h4>
                                        <p className="text-gray-300 text-xs">{selectedTab?.description}</p>
                                    </div>
                                </div>

                                {/* Top Products for Selected Category */}
                                <div className="space-y-2">
                                    <h5 className="text-md font-semibold mb-2">Top Selling Products</h5>
                                    <AnimatePresence>
                                        {getProductsForCategory(selectedTab?.label).map((product, index) => (
                                            <motion.div
                                                key={`${selectedTab?.label}-${product.name}`}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                                whileHover={{ 
                                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                                    scale: 1.02
                                                }}
                                                className="flex items-center justify-between p-3 rounded-lg backdrop-blur-sm border border-white/10 transition-all"
                                            >
                                                <div className="flex items-center">
                                                    <motion.div 
                                                        className="w-8 h-8 bg-white/20 rounded-lg mr-2 flex items-center justify-center"
                                                        whileHover={{ rotate: 180 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <motion.img 
                                                            src={selectedTab?.icon} 
                                                            alt=""
                                                            className="w-4 h-4"
                                                        />
                                                    </motion.div>
                                                    <div>
                                                        <p className="text-xs font-medium">{product.name}</p>
                                                        <p className="text-xs text-gray-300">{product.sales} units sold</p>
                                                    </div>
                                                </div>
                                                <motion.span
                                                    animate={{ scale: [1, 1.1, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                                                    className={`${product.color} text-white px-2 py-1 rounded-full text-xs font-medium`}
                                                >
                                                    {product.change}
                                                </motion.span>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ZyloKartDashboard;
