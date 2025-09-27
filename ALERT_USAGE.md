# Alert 使用说明

## 一键调用组件

### 使用 useAlertContext

在组件中导入并使用 `useAlertContext` hook：

```tsx
'use client';

import { useAlertContext } from '@/components/alert-provider';

function MyComponent() {
  const { showAlert, hideAlert } = useAlertContext();

  const handleClick = () => {
    showAlert({
      type: 'normal', // 可选：'normal' | 'destructive'，默认为 'normal'
      title: '操作成功',
      description: '详细信息', // 可选
      duration: 2000 // 可选：显示时长(ms)，默认为2000
    });
  };

  return <button onClick={handleClick}>显示提示</button>;
}
```

### 参数说明

- `type`: 提示类型，可选值：
  - `'normal'`: 普通信息提示（默认）
  - `'destructive'`: 错误/警告提示

- `title`: 提示标题（必填）

- `description`: 提示详细内容（可选）

- `duration`: 显示时长，单位毫秒（可选，默认2000ms）

## URL 参数支持

系统支持通过URL参数在页面加载时自动显示alert：

### 参数格式

- `alert`: 提示标题（必填）
- `alerttype`: 提示类型，可选值：`normal` 或 `destructive`（可选）
- `alertsec`: 提示详细内容（可选）

### 使用示例

1. **基本提示**：
   ```
   /page?alert=操作成功
   ```

2. **错误提示**：
   ```
   /page?alert=操作失败&alerttype=destructive
   ```

3. **带详细内容的提示**：
   ```
   /page?alert=保存成功&alertsec=文件已成功保存到云端
   ```

4. **完整示例**：
   ```
   /page?alert=系统错误&alerttype=destructive&alertsec=请检查网络连接后重试
   ```

### 规则说明

- 如果URL中有 `alert` 参数，页面加载完成后会自动显示提示
- 如果没有 `alerttype` 参数，默认为 `normal` 类型
- 如果没有 `alertsec` 参数，只显示标题
- 提示会自动在2秒后消失（可通过duration参数调整）

## 组件集成

Alert系统已经集成到应用的根布局中，所有页面都可以直接使用。在 layout 中，应用被 alert-provider 包装，提供了全局的alert功能。

## 版本切换集成

版本切换功能已经改为使用新的alert系统，在 version-provider 中通过 alert-provider 来显示切换提示。