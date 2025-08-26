/**
 * 自定义提示组件，显示在页面右上角，支持自动关闭
 * @param {CustomAlertProps} props - 组件属性
 * @returns {JSX.Element | null} 渲染的提示组件或null
 * @example
 * // 成功提示
 * <CustomAlert
 *   visible={true}
 *   title="操作成功"
 *   onClose={handleClose}
 * />
 * 
 * // 错误提示
 * <CustomAlert
 *   visible={true}
 *   type="destructive"
 *   title="操作失败"
 *   description="请稍后重试"
 *   duration={5000}
 *   onClose={handleClose}
 * />
 */

"use client"

import React, { useEffect } from 'react';
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface CustomAlertProps {
  type?: 'normal' | 'destructive';
  icon?: React.ElementType;
  title: string;
  description?: string | React.ReactNode;
  visible: boolean;
  duration?: number; // 新增：显示时长(ms)，默认3000
  onClose: () => void; // 新增：关闭回调
}

export function CustomAlert({
  type = 'normal',
  icon: CustomIcon,
  title,
  description,
  visible,
  duration = 2000,
  onClose
}: CustomAlertProps) {
  const DefaultIcon = type === 'destructive' ? AlertCircleIcon : CheckCircle2Icon;
  const Icon = CustomIcon || DefaultIcon;

  // 自动关闭定时器
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer); // 组件卸载时清除定时器
    }
  }, [visible, duration, onClose]);

  if (!visible) return null;

  return (
    <Alert 
      variant={type === 'destructive' ? 'destructive' : undefined}
      className="fixed top-16 right-4 z-50 w-80 p-4 shadow-lg"
    >
      <Icon className="h-5 w-5 mr-2 flex-shrink-0" />
      <div className="space-y-0.5">
        <AlertTitle>{title}</AlertTitle>
        {description && <AlertDescription>{description}</AlertDescription>}
      </div>
    </Alert>
  );
}