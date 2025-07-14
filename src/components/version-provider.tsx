'use client';

import { createContext, useState, useContext } from "react";

type VersionProviderProps = {
  defaultVersion?: 'junior' | 'senior';
  children: React.ReactNode;
};

export const VersionContext = createContext<{
  version: 'junior' | 'senior';
  toggleVersion: () => void;
}>({
  version: 'senior',
  toggleVersion: () => {},
});

export function VersionProvider({ 
  defaultVersion = 'senior', 
  children 
}: VersionProviderProps) {
  const [version, setVersion] = useState<'junior' | 'senior'>(defaultVersion);
  
  const toggleVersion = () => {
    setVersion(prev => {
      const newVersion = prev === 'senior' ? 'junior' : 'senior';
      return newVersion;
    });
  };

  return (
    <VersionContext.Provider value={{ version, toggleVersion }}>
      {children}
    </VersionContext.Provider>
  );
}

export function useVersion() {
  return useContext(VersionContext);
}