'use client';

import { type ReactNode } from 'react';

export default function Template({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex-1 flex flex-col animate-pageEnter">
      {children}
    </div>
  );
}
