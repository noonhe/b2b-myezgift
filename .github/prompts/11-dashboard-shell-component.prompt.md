---
mode: agent
---
Define the task to achieve, including specific requirements, constraints, and success criteria.

**Implement Dashboard Shell Component**

Requirements:

1. Create the following component within the `src/app/pages/dashboard` directory:
   - `DashboardShell`: The main component for the dashboard within `src/app/pages/dashboard/shell` directory.
        files: 
        - `src/app/pages/dashboard/shell/dashboard-shell.component.ts`
        - `src/app/pages/dashboard/shell/dashboard-shell.component.html`
        - `src/app/pages/dashboard/shell/dashboard-shell.component.css`
2. Implement routing for the dashboard:
   - Configure the Angular router to load the `DashboardShell` component when navigating to `/dashboard


UI Design:
   - The dashboard has a sidebar for navigation and a main content area.
   - The sidebar should contain links to different sections of the dashboard (e.g., Overview, Reports, Settings).
   - for desktop view the sidebar should be fixed on the left side of the screen.
   - for mobile view the sidebar should be collapsible and accessible via a hamburger menu in top left corner of the header.
   - The dashboard has a header for the logo, title and user avatar and the sidebar toggle(mobile view only).
   - the main content should be responsive, adjusting to the available screen space.
   - `<router-outlet></router-outlet>` should be used in the main content area to load different components based on the routes picked from the sidebar.
   - The main content area should display the selected section based on the sidebar navigation.


Success Criteria:
- The dashboard should load successfully without any errors.
- The routing should work as expected, with the correct components being displayed.
- Unauthorized users should be redirected to the login page.
