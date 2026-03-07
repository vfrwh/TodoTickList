import type { QuadrantsSettings } from "@/data/quadrantsSettingsData";

export type quadrantsFormType = QuadrantsSettings;

export interface OutletContextType {
  formRef: React.MutableRefObject<{
    handleSave2: () => void;
    handleReset: () => void;
  } | null>;
}
