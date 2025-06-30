import { defineStore } from "pinia";

export const useAppOptionStore = defineStore("appOption", () => {
  return {
    appThemeClass: "",
    appDarkMode: "",

    appClass: "",

    appBoxedLayout: false,

    appHeaderHide: false,
    appHeaderFixed: true,
    appHeaderInverse: false,
    appHeaderSearchToggled: false,
    appHeaderLanguageBar: true,
    appHeaderMegaMenu: false,

    appSidebarTwo: false,
    appSidebarHide: true,
    appSidebarEnd: false,
    appSidebarWide: false,
    appSidebarLight: false,
    appSidebarFixed: true,
    appSidebarCollapsed: false,
    appSidebarMobileToggled: false,
    appSidebarMobileClosed: false,
    appSidebarMinified: false,
    appSidebarHover: false,
    appSidebarSearch: false,
    appSidebarToggled: false,
    appSidebarEndToggled: false,
    appSidebarEndMobileToggled: false,
    appSidebarTransparent: false,
    appSidebarGrid: false,
    appGradientEnabled: false,
    appTopMenu: false,

    appContentFullHeight: false,
    appContentClass: "",

    appFooter: false,
    appFooterFixed: false,

    appThemePanelToggled: false,
  };
});
