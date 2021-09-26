import React from 'react';
import * as AiIcons from "react-icons/ai";
import * as FiIcons from "react-icons/fi";

export const SidebarData = [
    {
        title: ' Strateegia',
        path: '//https://app.strateegia.digital/signin',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },

    {
        title: ' G calendar',
        path: '//https://calendar.google.com/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },

    {
        title: ' Desenvolvedores',
        path: '/Desenvolvedores',
        icon: <AiIcons.AiOutlineInfoCircle />,
        cName: 'nav-text'
    },

    {
        title: ' Sair',
        path: '/',
        icon: <FiIcons.FiLogOut />,
        cName: 'nav-text',
        click: '"handleLogout"'
    }
]
