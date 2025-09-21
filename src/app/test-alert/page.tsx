'use client';

import { useAlertContext } from '@/components/alert-provider';

export default function TestAlertPage() {
  const { showAlert } = useAlertContext();

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Alert 功能测试</h1>
      
      <div className="space-y-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => showAlert({
            type: 'normal',
            title: '普通提示',
            description: '这是一个普通的信息提示'
          })}
        >
          显示普通提示
        </button>
        
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => showAlert({
            type: 'destructive',
            title: '错误提示',
            description: '这是一个错误警告提示'
          })}
        >
          显示错误提示
        </button>
        
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => showAlert({
            title: '只有标题的提示',
            duration: 3000
          })}
        >
          显示只有标题的提示
        </button>
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">URL 参数测试</h2>
        <p className="text-sm text-gray-600">
          尝试访问以下链接测试URL参数功能：
        </p>
        <ul className="text-sm text-blue-600 mt-2 space-y-1">
          <li>
            <a href="/test-alert?alert=操作成功" className="underline">
              /test-alert?alert=操作成功
            </a>
          </li>
          <li>
            <a href="/test-alert?alert=系统错误&alerttype=destructive" className="underline">
              /test-alert?alert=系统错误&alerttype=destructive
            </a>
          </li>
          <li>
            <a href="/test-alert?alert=保存成功&alertsec=文件已成功保存" className="underline">
              /test-alert?alert=保存成功&alertsec=文件已成功保存
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}