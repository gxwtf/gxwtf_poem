'use client';

import { createContext, useState, useContext } from "react";
import { CustomAlert } from './alert'; // 修改引入

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
}>({
  version: 'senior',
  toggleVersion: () => {},
});

export function VersionProvider({
  defaultVersion = 'senior',
  children
}: VersionProviderProps) {
  const [version, setVersion] = useState<'junior' | 'senior'>(defaultVersion);
  const [alert, setAlert] = useState<AlertState>({ // 新增alert状态
    visible: false,
    type: 'normal',
    title: ''
  });

  const toggleVersion = () => {
    try {
      const newVersion = version === 'senior' ? 'junior' : 'senior';
      setVersion(newVersion);
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

  return (
    <VersionContext.Provider value={{ version, toggleVersion }}>
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