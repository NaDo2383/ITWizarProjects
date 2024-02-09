import React from 'react';

// Icon Imports
import {
    MdLibraryBooks,
    MdInsights,
    MdListAlt,
    MdDashboard
} from 'react-icons/md';

export const adminRoutes = [
    {
        name: 'Нүүр хуудас',
        layout: '/admin',
        icon: <MdDashboard className="h-6 w-6" />,
        path: 'default',
    },
    {
        name: 'Скоринг хийх утга',
        layout: '/admin',
        path: 'ratio-indicator',
        icon: <MdListAlt className="h-6 w-6" />,
    },
    {
        name: 'Үндсэн харьцаа үзүүлэлт',
        layout: '/admin',
        path: 'formula-data',
        icon: <MdInsights className="h-6 w-6" />,
    },
    {
        name: 'Хүсэлтүүд',
        layout: '/admin',
        path: 'loanholder',
        icon: <MdLibraryBooks className="h-6 w-6" />,
    },
];

export const normalRoutes = [
    {
        name: 'Нүүр хуудас',
        layout: '/admin',
        icon: <MdDashboard className="h-6 w-6" />,
        path: 'default',
    },
    {
        name: 'Хүсэлтүүд',
        layout: '/admin',
        path: 'loanholder',
        icon: <MdLibraryBooks className="h-6 w-6" />,
    },
];
