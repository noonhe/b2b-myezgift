---
mode: agent
---
Define the task to achieve, including specific requirements, constraints, and success criteria.
---

**Create an Angular Admin Login Component with Modern UI Design**

implement a standalone Angular component for admin authentication with the following specifications:

## Component Structure
- **Component Name**: `AdminLoginComponent`
- **Standalone**: Yes, with proper imports
- **Change Detection**: OnPush strategy
- **Imports**: CommonModule, ReactiveFormsModule, RouterModule
- **Form Handling**: Reactive forms with FormBuilder injection

## Form Features
- **Form Fields**: Username (required) and Password (required, min 6 characters)
- **Validation**: Real-time validation with error messages
- **Submit State**: Loading state with spinner animation
- **Error Handling**: Display validation and submission errors

## Visual Design Requirementss

### Layout & Container
- Full viewport height with centered content
- Gradient background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Animated background elements with pulsing radial gradients
- Responsive padding and mobile optimization
- Form card should be horizontally and vertically centered

### Login Card
- White background with 16px border radius
- Large shadow: `0 20px 60px rgba(0, 0, 0, 0.3)`
- Slide-up animation on load
- Maximum width: 440px, full width on mobile

### Header Section
- Centered logo with gradient background (64x64px, 16px radius)
- SVG icon (settings/gear style with multiple circles and lines)
- Title: "Admin Login" (1.875rem, font-weight 800)
- Subtitle: "Access the administration portal" (gray text)

### Form Styling
- **Input Fields**: 
  - Padding: 0.875rem 1rem
  - Border: 2px solid #e5e7eb, 8px radius
  - Focus state: Blue border (#667eea) with glow effect
  - Error state: Red border (#ef4444)
- **Labels**: Bold, dark gray (#374151)
- **Error Messages**: Red text, small font size

### Submit Button
- Gradient background matching the theme
- Hover effect: translateY(-2px) with enhanced shadow
- Loading state: Spinner animation with "Logging in..." text
- Disabled state: Reduced opacity

### Footer
- "Back to home" link with arrow icon
- Top border separator
- Hover effect: Color change to theme blue

## Animations
- **Card**: Slide-up animation (translateY 30px to 0)
- **Background**: Pulsing radial gradients (8s duration, offset by 4s)
- **Spinner**: 360-degree rotation (1s linear infinite)
- **Button**: Smooth transitions for hover/active states

## Responsive Design
- **Mobile (≤640px)**:
  - Reduced card padding (2rem)
  - Smaller title (1.5rem)
  - Adjusted input padding (0.75rem)
  - Smaller button padding (0.875rem)

## Technical Implementation
- Use `inject(FormBuilder)` for dependency injection
- Implement getter methods for form controls
- Handle form validation with `markAsTouched()`
- Include proper TypeScript typing
- Use Angular's built-in form validation
- Implement loading states and error handling

## Accessibility
- Proper form labels and IDs
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly

## File Structure
- Component: `admin-login.component.ts`
- Template: `admin-login.component.html`
- Styles: `admin-login.component.css`

Generate the complete component with all three files, ensuring the design is pixel-perfect, fully responsive, and follows Angular best practices with modern UI/UX patterns.