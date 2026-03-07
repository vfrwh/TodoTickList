import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { defaultValues } from "@/data/habitSettingsData";

export const useHabitSettings = () => {
  const settings = useSelector((state: RootState) => {
    console.log("Habit settings from Redux:", state.habit?.defaultValues);
    return state.habit?.defaultValues || defaultValues;
  });

  // 根据设置获取列数对应的栅格
  const getColSpan = () => {
    switch (settings.cardsPerRow) {
      case 2:
        return 12;
      case 3:
        return 8;
      case 4:
        return 6;
      default:
        return 8;
    }
  };

  // 判断是否使用网格布局
  const isGridLayout = settings.cardLayout === "grid";

  return {
    settings,
    getColSpan,
    isGridLayout,
  };
};
