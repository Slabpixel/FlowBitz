import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { Button } from './ui/button'
import { Sun, Moon } from 'lucide-react'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="sm"
      iconPosition="iconOnly"
      onClick={toggleTheme}
      className={`h-9 w-9 p-0 ${theme === 'light' ? 'border-black/10 hover:bg-black/10' : 'border-white/10 hover:bg-white/10'}`}
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4 text-black" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default ThemeToggle
