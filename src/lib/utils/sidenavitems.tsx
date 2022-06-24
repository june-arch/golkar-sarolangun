import { ChartBarIcon, CurrencyDollarIcon, HomeIcon, ShoppingBagIcon, ShoppingCartIcon, TrendingDownIcon } from "@heroicons/react/outline";
import { RiPsychotherapyLine, RiTimeFill } from "react-icons/ri";

export const navData = {
    menuItems: [
        {
            items: [
                { seconTitle: "Dashboard", },
                {
                    title: "home",
                    icon: <HomeIcon className='h-7 w-7 text-2xl ' />,
                    link: "/"
                },
                {
                    title: "Analytics",
                    icon: <RiTimeFill className='h-6 w-6 text-2xl' />,
                    link: "/"
                },

                {
                    title: "Sales",
                    icon: < TrendingDownIcon className='h-6 w-6 text-2xl' />,
                    link: "/"
                },
            ]
        },
        {
            items: [
                { seconTitle: "Quick Menu", },
                {
                    title: "Register",
                    icon: < RiPsychotherapyLine className='h-6 w-6 text-2xl' />,
                    link: "/"
                },
                {
                    title: "Transactions",
                    icon: < CurrencyDollarIcon className='h-6 w-6  text-2xl' />,
                    link: "/"
                },

                {
                    title: "Orders",
                    icon: < ChartBarIcon className='h-6 w-6 text-2xl' />,
                    link: "/"
                },
            ]
        },
        {
            items: [
                { seconTitle: "Products", },
                {
                    title: "All products",
                    icon: < ShoppingBagIcon className='h-6 w-6 text-2xl' />,
                    link: "/"
                },
                {
                    title: "create product",
                    icon: < ShoppingCartIcon className='h-6 w-6 text-2xl' />,
                    link: "/"
                },


            ]
        },
        {
            items: [
                { seconTitle: "Mananger", },
                {
                    title: "All Managers",
                    icon: <RiPsychotherapyLine className='h-6 w-6 text-2xl' />,
                    link: "/create-manager"
                },



            ]
        },
        {
            items: [
                { seconTitle: "Employees", },
                {
                    title: "All employees",
                    icon: <RiPsychotherapyLine className='h-6 w-6 text-2xl' />,
                    link: "/"
                },
            ]
        },
    ],





}