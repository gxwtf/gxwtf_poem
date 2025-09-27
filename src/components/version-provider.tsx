'use client';

import { createContext, useState, useContext, useEffect } from "react";
import { useAlertContext } from './alert-provider';

// 自定义事件类型定义
declare global {
  interface WindowEventMap {
    versionSync: CustomEvent<{ version: string }>;
  }
}

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
  
  useEffect(() => {
    const savedVersion = localStorage.getItem('poemVersion');
    if (savedVersion === 'junior' || savedVersion === 'senior') {
      setVersion(savedVersion);
    }
    
    // 监听versionSync事件来自动同步版本
    const handleVersionSync = (event: CustomEvent<{ version: string }>) => {
      const { version } = event.detail;
      if (version === 'junior' || version === 'senior') {
        setVersion(version);
        if (typeof window !== 'undefined') {
            localStorage.setItem('poemVersion', version);
        }
      }
    };
    
    window.addEventListener('versionSync', handleVersionSync);
    
    return () => {
      window.removeEventListener('versionSync', handleVersionSync);
    };
  }, []);

  const { showAlert } = useAlertContext();

  const toggleVersion = () => {
    try {
      const newVersion = version === 'senior' ? 'junior' : 'senior';
      setVersion(newVersion);
      if (typeof window !== 'undefined') {
        localStorage.setItem('poemVersion', newVersion);
      }
      showAlert({
        type: 'normal',
        title: `成功切换为${newVersion === 'senior' ? '高中' : '初中'}版`
      });
    } catch (e) {
      showAlert({
        type: 'destructive',
        title: '无法切换版本',
        description: `系统错误：${e}`
      });
    }
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