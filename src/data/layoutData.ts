import type { LayoutItem } from "@/types/layoutItemType"

const layoutData :{[key:string]: LayoutItem } = {
  item1: {
    key:'/list',
    title: '任务清单'
  },
  item2: {
    key:'/quadrants',
    title:'四象限'
  },
  item3: {
    key:'/focus',
    title:'专注'
  },
  item4: {
    key:'/habit',
    title:'习惯打卡'
  },
  item5: {
    key:'/timeLine',
    title:'时间线'
  },
  item6: {
    key:'/settings',
    title:'设置'
  },
}

export { layoutData }