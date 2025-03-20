import { create } from "zustand";

import { PartyCount } from "@/types";

import { Board, FormationDataSource } from "../types";

interface FormationState {
  dataSource: FormationDataSource;
  dragging: Dragging | null;
  sourceBoard: Board | null;
  clonePosition: { x: number; y: number };
  showClone: boolean;
  hoverBoard: Board | null;
  dragOffset: { x: number; y: number };
}

interface Dragging extends PartyCount {
  width?: number;
  height?: number;
}

interface FormationActions {
  onReset: () => void;
  onSwapFormation: () => void;
  onSetDataSource: (dataSource: FormationDataSource) => void;
  onSetDragging: (dragging: Dragging | null) => void;
  onSetSourceBoard: (sourceBoard: Board | null) => void;
  onSetClonePosition: (position: { x: number; y: number }) => void;
  onSetShowClone: (showClone: boolean) => void;
  onSetHoverBoard: (hoverBoard: Board | null) => void;
  onSetDragOffset: (dragOffset: { x: number; y: number }) => void;
}

type FormationStore = FormationState & FormationActions;

const createInitialState = (): FormationState => ({
  dataSource: { government: [], opposition: [], other: [] },
  dragging: null,
  sourceBoard: null,
  clonePosition: { x: 0, y: 0 },
  showClone: false,
  hoverBoard: null,
  dragOffset: { x: 0, y: 0 },
});

// Helper function to compare objects (shallow comparison)
const isEqual = (obj1: unknown, obj2: unknown): boolean => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const useFormationStore = create<FormationStore>((set, get) => ({
  ...createInitialState(),
  onSetDataSource: (dataSource) => {
    if (!isEqual(get().dataSource, dataSource)) {
      set({ dataSource });
    }
  },
  onSetDragging: (dragging) => {
    if (get().dragging !== dragging) {
      set({ dragging });
    }
  },
  onSetSourceBoard: (sourceBoard) => {
    if (get().sourceBoard !== sourceBoard) {
      set({ sourceBoard });
    }
  },
  onSetClonePosition: (clonePosition) => {
    if (!isEqual(get().clonePosition, clonePosition)) {
      set({ clonePosition });
    }
  },
  onSetShowClone: (showClone) => {
    if (get().showClone !== showClone) {
      set({ showClone });
    }
  },
  onSetHoverBoard: (hoverBoard) => {
    if (get().hoverBoard !== hoverBoard) {
      set({ hoverBoard });
    }
  },
  onSetDragOffset: (dragOffset) => {
    if (!isEqual(get().dragOffset, dragOffset)) {
      set({ dragOffset });
    }
  },
  onSwapFormation: () => {
    const { dataSource } = get();
    const { government, opposition, other } = dataSource;
    set({
      dataSource: {
        other,
        government: opposition,
        opposition: government,
      },
    });
  },
  onReset: () => set(createInitialState()),
}));
