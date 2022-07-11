import { NewspaperIcon, UserIcon, ViewListIcon } from "@heroicons/react/outline";

export const navData = {
    menuItems: [
        {
            items: [
                { seconTitle: "Dashboard", },
                {
                    title: "Member",
                    icon: <UserIcon className='h-7 w-7 text-2xl ' />,
                    link: "/"
                },
                {
                    title: "News",
                    icon: <NewspaperIcon className='h-6 w-6 text-2xl' />,
                    link: "/"
                },

                {
                    title: "Activity",
                    icon: <ViewListIcon className='h-6 w-6 text-2xl' />,
                    link: "/"
                },
            ]
        }
    ],





}