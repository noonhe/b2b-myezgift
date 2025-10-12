---
mode: agent
---
Define the task to achieve, including specific requirements, constraints, and success criteria.
---

**Create an Angular Customer Login Component with 16-Character PIN Input System**

Build a standalone Angular component for customer authentication using a 16-character PIN system with the following exact specifications:

## Component Structure
- **Component Name**: `CustomerLoginComponent`
- **Standalone**: Yes, with proper imports
- **Change Detection**: OnPush strategy
- **Form Handling**: Reactive forms with FormBuilder injection
- **Imports**: CommonModule, ReactiveFormsModule, RouterModule
- **ViewChildren**: Use `@ViewChildren('pinInput')` for input management

## PIN Input System Features
- **16 Individual Input Fields**: Each accepting exactly 1 character (0-9, A-Z, a-z)
- **Auto-focus Navigation**: Automatically moves to next input on character entry
- **Keyboard Navigation**: Arrow keys, backspace, and tab support
- **Paste Support**: Accepts pasted 16-character strings with automatic distribution
- **Visual Grouping**: 4 groups of 4 inputs separated by dashes (XXXX-XXXX-XXXX-XXXX)
- **Input Validation**: Real-time validation for alphanumeric characters only
- **Error States**: Visual feedback for invalid inputs with shake animation

## Visual Design Requirements

### Layout & Container
- Full viewport height with centered content
- gradient background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Animated background elements with pulsing radial gradients (8s duration, 4s offset)
- Responsive padding and mobile optimization

### Login Card
- Horizontally and vertically centered
- White background with 16px border radius
- Large shadow: `0 20px 60px rgba(0, 0, 0, 0.3)`
- Slide-up animation on load (0.5s ease)
- Maximum width: 640px, full width on mobile
- Padding: 3rem (desktop), 2rem (tablet), 1.5rem (mobile)

### Header Section
- Centered logo with indigo gradient background (64x64px, 16px radius)
- User icon SVG (person with circle)
- Title: "Customer Login" (1.875rem, font-weight 800, color #1a1a2e)
- Subtitle: "Enter your 16-character PIN to access your gift cards" (gray text)

### PIN Input Styling
- **Input Fields**: 
  - Size: 48x56px (desktop), 40x48px (tablet), 36x44px (mobile)
  - Border: 2px solid #e5e7eb, 8px radius
  - Font: 1.5rem, font-weight 700, centered text
  - Focus state: indigo border with glow and scale(1.05)
  - Error state: Red border (#ef4444) with shake animation
- **Separators**: Large dashes (-) between groups, gray color (#9ca3af)
- **Layout**: Flexbox with gaps, responsive wrapping

### Submit Button
- Gradient background matching indigo theme
- Hover effect: translateY(-2px) with indigo shadow
- Loading state: Spinner animation with "Authenticating..." text
- Disabled state: Reduced opacity (0.7)
- Text: "Access Gift Cards" / "Authenticating..."

### Footer
- "Back to home" link with arrow icon
- Top border separator
- Hover effect: Color change to indigo theme

## Animations
- **Card**: Slide-up animation (translateY 30px to 0, opacity 0 to 1)
- **Background**: Pulsing radial gradients (scale 1 to 1.1, opacity 0.5 to 0.8)
- **Spinner**: 360-degree rotation (1s linear infinite)
- **Input Error**: Shake animation (translateX -5px to 5px)
- **Button**: Smooth transitions for hover/active states

## Responsive Design
- **Desktop (>768px)**: Full size inputs (48x56px), 3rem padding
- **Tablet (≤768px)**: Medium inputs (40x48px), 2rem padding, smaller title
- **Mobile (≤640px)**: Small inputs (36x44px), 1.5rem padding, compact spacing

## Technical Implementation
- Use `inject(FormBuilder)` for dependency injection
- Implement `@ViewChildren('pinInput')` for input management
- Handle form validation with `markAsTouched()`
- Include proper TypeScript typing
- Use Angular's built-in form validation with regex pattern: `/^[0-9A-Za-z]$/`
- Implement loading states and error handling

## Form Logic Requirements
- **Auto-focus**: Move to next input on character entry
- **Backspace Navigation**: Move to previous input when backspacing empty field
- **Arrow Key Navigation**: Left/right arrow keys for input navigation
- **Paste Handling**: Accept 16-character strings, clean and distribute automatically
- **Validation**: All 16 fields required, alphanumeric only
- **Error Messages**: "Please enter all 16 characters of your PIN"

## Accessibility
- Proper form labels and IDs
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- Focus management for input navigation

## File Structure
- Component: `customer-login.component.ts`
- Template: `customer-login.component.html`
- Styles: `customer-login.component.css`

## Key CSS Classes
- `.login-container` - Main container with gradient background
- `.login-card` - White card with shadow and animation
- `.pin-container` - Flex container for PIN inputs
- `.pin-group` - Groups of 4 inputs
- `.pin-input` - Individual input styling
- `.pin-separator` - Dash separators
- `.submit-btn` - Button with gradient and hover effects
- `.spinner` - Loading animation
- `.error-message` - Error text styling

Generate the complete component with all three files, ensuring the design is pixel-perfect, fully responsive, and follows Angular best practices with the exact same PIN input behavior, styling, and animations as specified.