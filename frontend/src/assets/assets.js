import dellXPSImg from './Dell XPS 13.jpeg';
import p1_img from './p1_img.png';
import lenovoImg from './p2_img.png';
import acerImg from './p3_img.png';
import asusVivoBookImg from './p4_img.png';
import razerBladeImg from './Razer Blade 15.jpeg';
import rogZephyrusImg from './Asus ROG Zephyrus G14.jpeg';
import macbookAirImg from './Macbook air m1.jpeg';

export const products = [
    {
        _id: "laptop1",
        name: "Dell XPS 13",
        description: "A powerful yet compact laptop, perfect for professionals on the go.",
        price: 1200,
        image: [dellXPSImg],  // Use the imported image variable
        category: "Professional",
        subCategory: "Ultrabook",
        specs: {
            processor: "Intel i7",
            ram: "16GB",
            storage: "512GB SSD",
            screenSize: "13.3 inches"
        },
        variants: [
            {
                config: "8GB/256GB SSD",
                
            },
            {
                config: "16GB/512GB SSD",
               
            }
        ],
        date: 1716634345448,
        bestseller: false
    },
    {
        _id: "laptop2",
        name: "HP Spectre x360",
        description: "A versatile 2-in-1 laptop suitable for both work and play.",
        price: 1300,
        image: [p1_img],  // Use the imported image variable
        category: "Professional",
        subCategory: "Convertible",
        specs: {
            processor: "Intel i7",
            ram: "16GB",
            storage: "1TB SSD",
            screenSize: "13.3 inches"
        },
        variants: [
            {
                config: "8GB/256GB SSD",
                
            },
            {
                config: "16GB/512GB SSD",
               
            }
        ],
        date: 1716621345448,
        bestseller: false
    },
    {
        _id: "laptop3",
        name: "Lenovo ThinkPad X1 Carbon",
        description: "Durable, high-performance laptop designed for business professionals.",
        price: 1500,
        image: [lenovoImg],  // Use the imported image variable
        category: "Professional",
        subCategory: "Business",
        specs: {
            processor: "Intel i7",
            ram: "16GB",
            storage: "1TB SSD",
            screenSize: "14 inches"
        },
        variants: [
            {
                config: "8GB/256GB SSD",
                
            },
            {
                config: "16GB/512GB SSD",
               
            }
        ],
        date: 1716234545448,
        bestseller: false
    },
    {
        _id: "laptop4",
        name: "Acer Aspire 5",
        description: "An affordable and reliable laptop for everyday office tasks.",
        price: 60000,
        image: [acerImg],  // Use the imported image variable
        category: "OfficeWork",
        subCategory: "Standard",
        specs: {
            processor: "Intel i5",
            ram: "8GB",
            storage: "256GB SSD",
            screenSize: "15.6 inches"
        },
        variants: [
            {
                config: "8GB/256GB SSD",
                
            },
            {
                config: "16GB/512GB SSD",
               
            }
        ],
        date: 1716622345448,
        bestseller: false
    },
    {
        _id: "laptop5",
        name: "ASUS VivoBook 15",
        description: "A stylish and portable laptop ideal for students and professionals.",
        price: 70000,
        image: [asusVivoBookImg],  // Use the imported image variable
        category: "OfficeWork",
        subCategory: "Standard",
        specs: {
            processor: "AMD Ryzen 5",
            ram: "8GB",
            storage: "512GB SSD",
            screenSize: "15.6 inches"
        },
        variants: [
            {
                config: "8GB/256GB SSD",
                
            },
            {
                config: "16GB/512GB SSD",
               
            }
        ],
        date: 1716623423448,
        bestseller: true
    },
    {
        _id: "laptop6",
        name: "Razer Blade 15",
        description: "A powerful gaming laptop with top-notch graphics and performance.",
        price: 2000000,
        image: [razerBladeImg],  // Use the imported image variable
        category: "Gaming",
        subCategory: "High-Performance",
        specs: {
            processor: "Intel i7",
            ram: "16GB",
            storage: "1TB SSD",
            graphics: "NVIDIA RTX 3070",
            screenSize: "15.6 inches"
        },
        variants: [
            {
                config: "8GB/256GB SSD",
                
            },
            {
                config: "16GB/512GB SSD",
               
            }
        ],
        date: 1716621542448,
        bestseller: true
    },
    {
        _id: "laptop7",
        name: "Asus ROG Zephyrus G14",
        description: "A compact and powerful gaming laptop with excellent battery life.",
        price: 180000,
        image: [rogZephyrusImg],  // Use the imported image variable
        category: "Gaming",
        subCategory: "High-Performance",
        specs: {
            processor: "AMD Ryzen 9",
            ram: "32GB",
            storage: "1TB SSD",
            graphics: "NVIDIA RTX 3060",
            screenSize: "14 inches"
        },
        variants: [
            {
                config: "8GB/256GB SSD",
                
            },
            {
                config: "16GB/512GB SSD",
               
            }
        ],
        date: 1716626645448,
        bestseller: true
    },
    {
        _id: "laptop8",
        name: "MacBook Air M1",
        description: "Premium laptop that delivers solid performance.",
        price: 82000,
        image: [macbookAirImg],  // Use the imported image variable
        category: "Professional",
        subCategory: "Budget",
        specs: {
            processor: "Apple M1",
            ram: "8GB",
            storage: "256GB SSD",
            graphics: "Apple M1 Graphics",
            screenSize: "13 inches"
        },
        variants: [
            {
                config: "8GB/256GB SSD",
                
            },
            {
                config: "16GB/512GB SSD",
               
            }
        ],
        date: 1716629945448,
        bestseller: true
    }
];
