# Theme System Documentation

## Overview

This project includes a comprehensive theme system with **dark mode** support and **three color themes**: Blue, Green, and Red.

## Features

### 🌓 Dark Mode
- Toggle between light and dark modes
- Persists user preference in localStorage
- Respects system preference on first visit
- Smooth transitions between modes
- All components fully support dark mode

### 🎨 Color Themes
Three beautiful color schemes to choose from:

1. **Blue Theme** (Default)
   - Primary: Blue tones
   - Professional and trustworthy
   - Great for productivity apps

2. **Green Theme**
   - Primary: Green/Emerald tones
   - Fresh and energetic
   - Nature-inspired palette

3. **Red Theme**
   - Primary: Red/Rose tones
   - Bold and energetic
   - High-impact design

## Implementation

### Theme Context
Located in `src/contexts/ThemeContext.tsx`:
- Manages global theme state
- Provides `useTheme()` hook
- Handles localStorage persistence
- Applies dark mode class to document root

### Usage Example

```tsx
import { useTheme } from '../contexts/ThemeContext';

function MyComponent() {
  const { colorTheme, mode, toggleMode, setColorTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {colorTheme}</p>
      <p>Current mode: {mode}</p>
      <button onClick={toggleMode}>Toggle Dark Mode</button>
      <button onClick={() => setColorTheme('green')}>Set Green Theme</button>
    </div>
  );
}
```

### Themed Classes Hook
Located in `src/hooks/useThemedClasses.ts`:
- Provides theme-aware utility classes
- `getButtonClass(variant)` - Returns themed button classes
- `getAccentClass()` - Returns themed text color
- `getBgAccentClass()` - Returns themed background color

Example:
```tsx
import { useThemedClasses } from '../hooks/useThemedClasses';

function MyButton() {
  const { getButtonClass } = useThemedClasses();
  
  return (
    <button className={getButtonClass('primary')}>
      Click Me
    </button>
  );
}
```

## Tailwind Configuration

Dark mode is enabled in `tailwind.config.js`:
```javascript
{
  darkMode: 'class', // Uses class-based dark mode
  // ...
}
```

## Component Dark Mode Support

All components include dark mode classes:

### Background Colors
- Light: `bg-white` → Dark: `dark:bg-gray-800`
- Light: `bg-gray-50` → Dark: `dark:bg-gray-900`

### Text Colors
- Light: `text-gray-900` → Dark: `dark:text-gray-100`
- Light: `text-gray-600` → Dark: `dark:text-gray-400`

### Border Colors
- Light: `border-gray-200` → Dark: `dark:border-gray-700`
- Light: `border-gray-300` → Dark: `dark:border-gray-600`

### Examples from Components:

**Dashboard:**
```tsx
<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
  <h1 className="text-gray-800 dark:text-gray-100">Title</h1>
</div>
```

**TimerCard:**
```tsx
const statusColors = {
  idle: 'bg-white dark:bg-gray-800',
  running: 'bg-success-50 dark:bg-success-900/20',
  paused: 'bg-warning-50 dark:bg-warning-900/20',
};
```

## Theme Switcher Component

Located in `src/components/ThemeSwitcher.tsx`:
- Visual toggle for dark/light mode with icons
- Color theme selector with color swatches
- Accessible with ARIA labels
- Responsive design

## Keyboard Shortcuts

The theme switcher is fully keyboard accessible:
- Tab to navigate between controls
- Enter/Space to activate buttons
- Arrow keys work in radio group (color themes)

## Persistence

Theme preferences are stored in localStorage:
- `themeMode`: 'light' | 'dark'
- `colorTheme`: 'blue' | 'green' | 'red'

Preferences persist across sessions and page reloads.

## System Preference Detection

On first visit, the app checks the user's system preference:
```javascript
window.matchMedia('(prefers-color-scheme: dark)').matches
```

If the user prefers dark mode, it's automatically enabled.

## Accessibility Considerations

### ARIA Attributes
- Theme switcher has `role="region"` and `aria-label`
- Mode toggle button has descriptive `aria-label`
- Color theme buttons use `role="radio"` and `aria-checked`

### Visual Indicators
- Current theme is highlighted with border and ring
- Dark mode icon changes (Sun ☀️ / Moon 🌙)
- Focus states are clearly visible in both modes

### Color Contrast
All color combinations meet WCAG AA standards in both light and dark modes:
- Text has sufficient contrast against backgrounds
- Focus indicators are clearly visible
- Interactive elements have distinct visual states

## CSS Classes Reference

### Dark Mode Utilities
```css
/* Apply only in dark mode */
.dark\:bg-gray-800 { }
.dark\:text-gray-100 { }
.dark\:border-gray-700 { }
.dark\:hover\:bg-gray-700 { }
```

### Opacity-Based Dark Backgrounds
```css
/* Semi-transparent overlays for colored backgrounds */
dark:bg-blue-900/20    /* 20% opacity */
dark:bg-green-900/30   /* 30% opacity */
```

### Transition Classes
```css
transition-colors  /* Smooth color transitions */
transition-all     /* Smooth all property transitions */
```

## Testing Dark Mode

### Manual Testing
1. Click the theme switcher toggle
2. Verify all text is readable
3. Check color contrast
4. Test in different color themes
5. Verify persistence after page reload

### Browser DevTools
- Chrome: DevTools → Rendering → Emulate CSS media feature prefers-color-scheme
- Firefox: DevTools → Inspector → Toggle Dark Mode
- Safari: Develop → Experimental Features → Dark Mode CSS Override

## Future Enhancements

Potential improvements for the theme system:

- [ ] Custom color theme creator
- [ ] More pre-built themes (purple, orange, etc.)
- [ ] High contrast mode
- [ ] Auto-switch based on time of day
- [ ] Theme preview before applying
- [ ] Sync theme across multiple tabs
- [ ] Theme animations and transitions
- [ ] Export/Import theme settings

## Browser Support

The theme system works in all modern browsers:
- ✅ Chrome/Edge 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Opera 74+

## Performance

- Theme changes are instant (no page reload)
- CSS is optimized with Tailwind's JIT compiler
- Only necessary classes are included in production
- LocalStorage operations are minimal and fast

## Troubleshooting

### Theme not persisting
- Check browser localStorage is enabled
- Clear localStorage and try again
- Ensure JavaScript is enabled

### Colors look wrong
- Check if Tailwind config is correct
- Verify dark mode class is applied to `<html>` element
- Clear browser cache and rebuild

### Focus states not visible
- Ensure `focus:ring-2` classes are present
- Check browser focus indicator settings
- Verify contrast ratios

## Resources

- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [WCAG Color Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [prefers-color-scheme MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
