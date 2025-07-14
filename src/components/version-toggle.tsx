'use client';

import { Button } from "@/components/ui/button";
import { useVersion } from "@/components/version-provider";

export function VersionToggle() {
  const { version, toggleVersion } = useVersion();
  
  const handleClick = () => {
    toggleVersion();
  };
  
  return (
    <Button variant="ghost" onClick={handleClick}>
      ⇌ {version === 'senior' ? '高中版' : '初中版'}
    </Button>
  );
}