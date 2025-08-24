'use client';

import { createContext, useState, useContext, useEffect } from "react";
import { CustomAlert } from './alert'; // 修改引入

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

type AlertState = {
  visible: boolean;
  type: 'normal' | 'destructive';
  title: string;
  description?: string;
};

export const VersionContext = createContext<{
  version: 'junior' | 'senior';
  toggleVersion: () => void;
  syncVersion: () => void;
}>({
  version: 'senior',
  toggleVersion: () => {},
  syncVersion: () => {},
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
        syncVersion();
      }
    };
    
    window.addEventListener('versionSync', handleVersionSync);
    
    return () => {
      window.removeEventListener('versionSync', handleVersionSync);
    };
  });
  const [alert, setAlert] = useState<AlertState>({ // 新增alert状态
    visible: false,
    type: 'normal',
    title: ''
  });

  const toggleVersion = () => {
    try {
      const newVersion = version === 'senior' ? 'junior' : 'senior';
      setVersion(newVersion);
      if (typeof window !== 'undefined') {
        localStorage.setItem('poemVersion', newVersion);
      }
      setAlert({
        visible: true,
        type: 'normal',
        title: `成功切换为${newVersion === 'senior' ? '高中' : '初中'}版`
      });
    } catch (e) {
      setAlert({
        visible: true,
        type: 'destructive',
        title: '无法切换版本',
        description: `系统错误：${e}`
      });
    }
  };

  const syncVersion = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('poemVersion', version);
    }
  };

  return (
    <VersionContext.Provider value={{ version, toggleVersion, syncVersion }}>
      {children}
      <CustomAlert
        type={alert.type}
        title={alert.title}
        description={alert.description}
        visible={alert.visible}
        duration={2000}
        onClose={() => setAlert(prev => ({...prev, visible: false}))} // 关闭回调
      />
    </VersionContext.Provider>
  );
}

export function useVersion() {
  return useContext(VersionContext);
}