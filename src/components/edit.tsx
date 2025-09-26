'use client';

import React, { useState } from 'react';
import { Eye, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';

// 类型定义
export interface TextGroup {
  id: number;
  content: string;
  translation: string;
}

export interface TableItem {
  id: number;
  name: string;
  description: string;
  metadata?: any; // 可选的额外数据
}

interface InfoDisplayProps {
  textGroups: TextGroup[];
  tableData: TableItem[];
  onView?: (item: TableItem) => void;
  onEdit?: (item: TableItem) => void;
  onAddNew?: () => void;
  renderCustomAction?: (item: TableItem) => React.ReactNode;
}

/**
 * 信息展示组件
 * 
 * @param textGroups - 文本组数据
 * @param tableData - 表格数据
 * @param onView - 查看按钮回调
 * @param onEdit - 编辑按钮回调
 * @param onAddNew - 添加新项目回调
 * @param renderCustomAction - 自定义操作渲染函数
 */
const InfoDisplay: React.FC<InfoDisplayProps> = ({
  textGroups,
  tableData,
  onView,
  onEdit,
  onAddNew,
  renderCustomAction
}) => {
  const [selectedItem, setSelectedItem] = useState<TableItem | null>(null);

  return (
    <div className="p-2 max-w-6xl mx-auto">
      {/* 文本组展示区域 */}
      <div className="mb-8 space-y-4">
        {textGroups.map((group) => (
          <div key={group.id} className="border-b pb-4">
            <h3 className="font-bold text-lg">{group.content}</h3>
            <p className="text-gray-600">{group.translation}</p>
          </div>
        ))}
      </div>

      {/* 表格区域 */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold w-[30%]">注释</TableHead>
              <TableHead className="w-[50%]">内容</TableHead>
              <TableHead className="text-right w-[20%]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell><Input defaultValue={item.description}></Input></TableCell>
                <TableCell className="flex justify-end space-x-2">
                  {onView && (
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => onView(item)}
                      aria-label="查看"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                  {onEdit && (
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => onEdit(item)}
                      aria-label="编辑"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                  {renderCustomAction && renderCustomAction(item)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 添加新项目按钮 */}
      {onAddNew && (
        <div className="mt-4 flex justify-end">
          <Button onClick={onAddNew}>添加新项目</Button>
        </div>
      )}
    </div>
  );
};

export default InfoDisplay;
