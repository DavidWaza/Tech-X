'use client';

import { useEffect } from 'react';

const applyTheme = (dark: boolean) => {
  const html = document.documentElement;
  if (dark) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
  localStorage.setItem('theme', dark ? 'dark' : 'light');
};

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const shouldBeDark = saved ? saved === 'dark' : prefersDark;
    applyTheme(shouldBeDark);
  }, []);

  return <>{children}</>;
}
