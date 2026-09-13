import type { BoardGroup } from "@/lib/types";
import { BOARD_GROUPS } from "@/lib/data/board";

export const boardRepo = {
  all(): BoardGroup[] {
    return BOARD_GROUPS;
  },

  getById(id: string): BoardGroup | undefined {
    return BOARD_GROUPS.find((g) => g.id === id);
  },
};