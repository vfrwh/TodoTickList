export interface focusFormType {
  focusTime:number
  longBreak:number
  shortBreak:number
  autoStartBreak:boolean
  showProgressRing:boolean
}

export type FocusFormRefType = {
  handleSave: () => void
}

export interface OutletContextType {
  formRef: React.RefObject<FocusFormRefType | null>
}