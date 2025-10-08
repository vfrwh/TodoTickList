export interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

export interface SiderComponentProps {
  currentPath: string;
}