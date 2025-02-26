// Define common types used across the application

// Main content view types
export type MainContentView = 'ordered-actions' | 'linkable-claims' | 'sku-list' | 'history' | 'downloads';

// Information panel types
export type InfoPanelType = 'product' | 'document' | 'invoice' | 'delivery' | 'inspection';

// Props for ContentSegments component
export interface ContentSegmentsProps {
  activeView: MainContentView;
  onViewChange: (view: MainContentView) => void;
  activeInfoPanel: InfoPanelType;
  onInfoPanelChange: (panel: InfoPanelType) => void;
  isInfoPanelCollapsed: boolean;
  onToggleInfoPanel: () => void;
}

// Props for ContentLayout component
export interface ContentLayoutProps {
  activeView: MainContentView;
  onViewChange: (view: MainContentView) => void;
}

// Props for InformationPanel component
export interface InformationPanelProps {
  activePanel: InfoPanelType;
  onPanelChange: (panel: InfoPanelType) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}
