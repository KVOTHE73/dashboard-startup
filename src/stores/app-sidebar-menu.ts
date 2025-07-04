import { defineStore } from "pinia";

/**
 * Store for managing the sidebar menu in the application.
 * This store defines the structure of the sidebar menu items.
 */
export const useAppSidebarMenuStore = defineStore("appSidebarMenu", () => {
  return [
    {
      text: "sidebar.navigation",
      is_header: true,
    },
    {
      url: "/",
      icon: "fa fa-sitemap",
      title: "sidebar.dashboard",
    },
    /*
	{ url: '/menu', icon: 'fa fa-align-left', title: 'Menu Level',
		children: [
			{ url: '/menu/menu-1-1', title: 'Menu 1.1',
				children: [
					{ url: '/menu/menu-1-1/menu-2-1', title: 'Menu 2.1',
						children: [
							{ url: '/menu/menu-1-1/menu-2-1/menu-3-1', title: 'Menu 3.1' },
							{ url: '/menu/menu-1-1/menu-2-1/menu-3-2', title: 'Menu 3.2' }
						]
					},
					{ url: '/menu/menu-1-1/menu-2-2', title: 'Menu 2.2' },
					{ url: '/menu/menu-1-1/menu-2-3', title: 'Menu 2.3' },
				]
			},
			{ url: '/menu/menu-1-2', title: 'Menu 1.2' },
			{ url: '/menu/menu-1-3', title: 'Menu 1.3' },
		]
	}*/
  ];
});
