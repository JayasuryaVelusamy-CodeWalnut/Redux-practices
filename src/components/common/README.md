# Reusable UI Components

This folder contains accessible, type-safe, reusable UI components built with React, TypeScript, and Tailwind CSS.

## Components

### Button
A versatile button component with multiple variants and sizes.

**Features:**
- 6 variants: primary, secondary, success, warning, danger, ghost
- 3 sizes: sm, md, lg
- Loading state
- Icons support (left/right)
- Full width option
- Fully accessible with ARIA support

**Usage:**
```tsx
import { Button } from '@/components/common';
import { Plus, Save } from 'lucide-react';

// Basic usage
<Button onClick={handleClick}>Click Me</Button>

// With variants
<Button variant="success">Save</Button>
<Button variant="danger">Delete</Button>
<Button variant="ghost">Cancel</Button>

// With icons
<Button leftIcon={<Plus className="w-4 h-4" />}>
  Create New
</Button>

// Loading state
<Button isLoading>Processing...</Button>

// Full width
<Button fullWidth variant="primary">
  Submit
</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

---

### Input
A flexible input component with label, error, and icon support.

**Features:**
- Label support
- Error states with messages
- Helper text
- Left/right icons
- Full width option
- Automatic ID generation
- ARIA accessibility

**Usage:**
```tsx
import { Input } from '@/components/common';
import { Search, Mail } from 'lucide-react';

// Basic usage
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
/>

// With icons
<Input
  label="Search"
  type="search"
  placeholder="Search timers..."
  leftIcon={<Search className="w-4 h-4" />}
/>

// With error
<Input
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

// With helper text
<Input
  label="Username"
  helperText="Choose a unique username"
  required
/>

// Full width
<Input
  label="Full Name"
  fullWidth
  placeholder="John Doe"
/>
```

---

### Checkbox
An accessible checkbox component with label and error support.

**Features:**
- Label support
- Helper text
- Error states
- Disabled state
- ARIA accessibility
- Automatic ID generation

**Usage:**
```tsx
import { Checkbox } from '@/components/common';

// Basic usage
<Checkbox
  label="Remember me"
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
/>

// With helper text
<Checkbox
  label="Subscribe to newsletter"
  helperText="Get weekly updates about new features"
/>

// With error
<Checkbox
  label="I agree to terms"
  error="You must agree to continue"
  required
/>

// Disabled
<Checkbox
  label="Beta features"
  disabled
  helperText="Coming soon"
/>
```

---

### Select
A dropdown select component with label and error support.

**Features:**
- Options array support
- Label support
- Error states with messages
- Helper text
- Placeholder option
- Full width option
- ARIA accessibility

**Usage:**
```tsx
import { Select } from '@/components/common';

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'running', label: 'Running' },
  { value: 'paused', label: 'Paused' },
  { value: 'idle', label: 'Idle' },
];

// Basic usage
<Select
  label="Status Filter"
  options={statusOptions}
  value={selectedStatus}
  onChange={(e) => setSelectedStatus(e.target.value)}
/>

// With placeholder
<Select
  label="Country"
  placeholder="Select a country"
  options={countryOptions}
/>

// With error
<Select
  label="Category"
  options={categories}
  error="Please select a category"
  required
/>

// Full width
<Select
  label="Sort By"
  options={sortOptions}
  fullWidth
/>
```

---

## Example: Refactoring Existing Code

### Before (Without Reusable Components)
```tsx
<button
  type="button"
  onClick={handleCreate}
  className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <Plus className="w-4 h-4" />
  New Timer
</button>
```

### After (With Reusable Components)
```tsx
<Button
  variant="primary"
  onClick={handleCreate}
  leftIcon={<Plus className="w-4 h-4" />}
>
  New Timer
</Button>
```

---

## Accessibility Features

All components include:
- ✅ Semantic HTML
- ✅ ARIA attributes (aria-label, aria-describedby, aria-invalid)
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Screen reader support
- ✅ Error announcements with role="alert"
- ✅ Proper label associations
- ✅ Required field indicators

---

## TypeScript Support

All components are fully typed with TypeScript:
- Props are strongly typed
- Extends native HTML element props
- IntelliSense support
- Type safety for variants and sizes

---

## Best Practices

1. **Always use semantic variants:**
   - `primary` for main actions
   - `danger` for destructive actions
   - `ghost` for secondary/cancel actions

2. **Provide labels for accessibility:**
   ```tsx
   <Input label="Email" /> // ✅ Good
   <Input placeholder="Email" /> // ❌ Bad (no label)
   ```

3. **Use error states properly:**
   ```tsx
   <Input
     label="Email"
     error={errors.email}
     value={email}
   />
   ```

4. **Keep icon decorative:**
   - Icons are automatically marked with `aria-hidden="true"`
   - Always include text labels

---

## Customization

All components accept a `className` prop for additional Tailwind classes:

```tsx
<Button className="mt-4 shadow-lg">
  Custom Styled
</Button>
```

---

## Future Enhancements

Potential additions:
- TextArea component
- Radio button component
- Switch/Toggle component
- Badge component
- Tooltip component
- Alert/Notification component
