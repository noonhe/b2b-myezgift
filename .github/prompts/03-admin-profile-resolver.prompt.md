---
mode: agent
---
Define the task to achieve, including specific requirements, constraints, and success criteria.

title: – Profile Resolver
description: Create a resolver to get the admin's profile data using profileService's getProfile method after login or when the logged in admin opens the app in their browser. the data of profile determines user data and its roles
dependsOn: []
priority: critical
---

# 🧩 Task 00-B – Profile Resolver
## 🎯 Goal
- create a profile.resolver.ts file
---

## 🧱 Files
```
src/app/core/resolvers/profile.resolver.ts
```

example:

### `profile.resolver.ts`

```ts
@Injectable({ providedIn: 'root' })
export class ProfileResolver implements Resolve<AdminProfile> {
  constructor(private profileService: ProfileService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AdminProfile> {
    return this.profileService.getProfile().pipe(
      catchError(() => {
        // Handle error and return a default profile or redirect
        return of(null);
      })
    );
  }
}

```