// src/context/ClaimContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of our context data
interface ClaimContextType {
  // Panel visibility state
  activePanelId: string | null;
  openPanel: (panelId: string) => void;
  closePanel: () => void;
  
  // Notification system
  notification: Notification | null;
  showNotification: (type: NotificationType, message: string) => void;
  hideNotification: () => void;
  
  // Loading states
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  
  // Document management
  documents: Document[];
  addDocument: (document: Document) => void;
  removeDocument: (documentId: string) => void;
  
  // Other claim data
  claimId: string;
  claimStatus: string;
  updateClaimStatus: (status: string) => void;
}

// Types for our data
export type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
  type: NotificationType;
  message: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  size: string;
}

// Sample initial data
const sampleDocuments: Document[] = [
  { id: 'doc1', name: 'Claim Documentation.pdf', type: 'PDF', date: '23 Feb 2025', size: '1.2 MB' },
  { id: 'doc2', name: 'Inspection Report.docx', type: 'DOCX', date: '24 Feb 2025', size: '546 KB' },
  { id: 'doc3', name: 'Supporting Images.zip', type: 'ZIP', date: '24 Feb 2025', size: '3.8 MB' }
];

// Create the context with default values
const ClaimContext = createContext<ClaimContextType | undefined>(undefined);

// Provider component
interface ClaimProviderProps {
  children: ReactNode;
}

export const ClaimProvider: React.FC<ClaimProviderProps> = ({ children }) => {
  // Panel state
  const [activePanelId, setActivePanelId] = useState<string | null>(null);
  
  // Notification state
  const [notification, setNotification] = useState<Notification | null>(null);
  
  // Loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Documents state
  const [documents, setDocuments] = useState<Document[]>(sampleDocuments);
  
  // Claim data
  const [claimId, setClaimId] = useState<string>('61011');
  const [claimStatus, setClaimStatus] = useState<string>('In Progress');
  
  // Panel handlers
  const openPanel = (panelId: string) => {
    setActivePanelId(panelId);
  };
  
  const closePanel = () => {
    setActivePanelId(null);
  };
  
  // Notification handlers
  const showNotification = (type: NotificationType, message: string) => {
    setNotification({ type, message });
    
    // Auto-hide after 4 seconds
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };
  
  const hideNotification = () => {
    setNotification(null);
  };
  
  // Document handlers
  const addDocument = (document: Document) => {
    setDocuments([...documents, document]);
  };
  
  const removeDocument = (documentId: string) => {
    setDocuments(documents.filter(doc => doc.id !== documentId));
  };
  
  // Claim data handlers
  const updateClaimStatus = (status: string) => {
    setClaimStatus(status);
  };
  
  // Construct the context value
  const contextValue: ClaimContextType = {
    activePanelId,
    openPanel,
    closePanel,
    notification,
    showNotification,
    hideNotification,
    isLoading,
    setIsLoading,
    documents,
    addDocument,
    removeDocument,
    claimId,
    claimStatus,
    updateClaimStatus
  };
  
  return (
    <ClaimContext.Provider value={contextValue}>
      {children}
    </ClaimContext.Provider>
  );
};

// Custom hook for using the context
export const useClaimContext = () => {
  const context = useContext(ClaimContext);
  if (context === undefined) {
    throw new Error('useClaimContext must be used within a ClaimProvider');
  }
  return context;
};
