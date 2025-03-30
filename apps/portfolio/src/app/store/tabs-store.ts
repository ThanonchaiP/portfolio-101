import { create } from "zustand";

import { Tab } from "@/types";

type TabState = {
  openTabs: Tab[];
  activeTab: string | null;
};

type TabAction = {
  addTab: (tab: Tab) => void;
  removeTab: (path: string) => void;
  setActiveTab: (path: string) => void;
};

type TabsStore = TabState & TabAction;

const createInitialState = (): TabState => ({
  openTabs: [],
  activeTab: "/",
});

export const useTabsStore = create<TabsStore>((set) => ({
  ...createInitialState(),
  addTab: (tab) => {
    set((state) => {
      const isTabOpen = state.openTabs.some((t) => t.path === tab.path);
      if (!isTabOpen) {
        return { openTabs: [...state.openTabs, tab], activeTab: tab.path };
      }
      return { ...state, activeTab: tab.path };
    });
  },
  removeTab: (path) => {
    set((state) => {
      const newTabs = state.openTabs.filter((tab) => tab.path !== path);
      const newActiveTab =
        newTabs.length > 0 ? newTabs[newTabs.length - 1].path : null;
      return { openTabs: newTabs, activeTab: newActiveTab };
    });
  },
  setActiveTab: (path) => {
    set({ activeTab: path });
  },
}));
