import {
  FolderIcon,
  NewspaperIcon,
  UserIcon,
  ViewListIcon,
} from '@heroicons/react/outline'

export const navData = {
  menuItems: [
    {
      items: [
        { seconTitle: 'Dashboard' },
        {
          title: 'Member',
          icon: <UserIcon className="h-7 w-7 text-2xl " />,
          link: '/admin/member',
        },
        {
          title: 'News',
          icon: <NewspaperIcon className="h-6 w-6 text-2xl" />,
          link: '/admin/news',
        },
        {
          title: 'Category News',
          icon: <FolderIcon className="h-6 w-6 text-2xl" />,
          link: '/admin/news/category',
        },
        {
          title: 'Activity',
          icon: <ViewListIcon className="h-6 w-6 text-2xl" />,
          link: '/admin/activity',
        },
        {
          title: 'Category Activity',
          icon: <FolderIcon className="h-6 w-6 text-2xl" />,
          link: '/admin/activity/category',
        },
        {
          title: 'Region',
          icon: <FolderIcon className="h-6 w-6 text-2xl" />,
          link: '/admin/region',
        },
      ],
    },
  ],
}
