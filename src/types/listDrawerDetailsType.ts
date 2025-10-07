export interface DrawerDetailsProps {
  open: boolean;
  isEdit: boolean;
  onClose: () => void;
}

export interface DrawerFormTypes {
  id?: number;
  taskName: string;
  priority:string;
  date:string;
}