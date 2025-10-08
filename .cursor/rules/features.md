# Create Feature Command - Angular Edition

Advanced automation for creating complete Angular feature modules with full API integration, comprehensive state management, and intelligent model generation.

## 🚀 Quick Usage

```
@createfeature <feature-name> <endpoint-base> <model-description>
```

### Enhanced Examples

#### Simple Product Catalog
```
@createfeature products /api/v1/products {
  "id": "string",
  "name": "string",
  "description": "string?", 
  "price": "number",
  "category": "string",
  "inStock": "boolean",
  "imageUrl": "string?",
  "rating": "number?",
  "createdAt": "string?",
  "updatedAt": "string?"
}
```

#### Complex Order System with Nested Objects
```
@createfeature orders /api/v1/orders {
  "id": "string",
  "userId": "string",
  "status": "OrderStatus",
  "items": "OrderItem[]",
  "shippingAddress": "Address",
  "paymentInfo": "PaymentInfo",
  "totalAmount": "number",
  "currency": "Currency",
  "orderDate": "string",
  "deliveryDate": "string?",
  "notes": "string?"
}
```

#### User Profile Management
```
@createfeature user-profile /api/v1/users {
  "id": "string",
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "avatar": "string?",
  "phone": "string?",
  "dateOfBirth": "string?",
  "preferences": "UserPreferences",
  "roles": "Role[]",
  "isVerified": "boolean",
  "isActive": "boolean",
  "lastLogin": "string?",
  "createdAt": "string",
  "updatedAt": "string"
}
```

## ✨ Enhanced Features

### 1. Advanced Type System
The command supports sophisticated type mapping to TypeScript:

| Input Type | TypeScript Type | JSON Type | Validation |
|---|---|---|---|
| `string` | `string` | `"string"` | Non-null, required |
| `string?` | `string \| null` | `"string" \| null` | Nullable, optional |
| `number` | `number` | `number` | Numeric validation |
| `boolean` | `boolean` | `boolean` | Boolean validation |
| `Type[]` | `Type[]` | `Type[]` | Array validation |
| `CustomType` | `CustomType` | `CustomType` | Object reference (interface) |
| `enum:V1,V2`| `'V1' \| 'V2'` | `"V1" \| "V2"` | String literal union validation |

### 2. Smart Model Generation

#### Automatic Nested Object Detection
When you reference custom types like `Address` or `OrderItem`, the command automatically creates separate TypeScript interface files (`address.model.ts`, `order-item.model.ts`) for all nested objects.

#### Enum / Union Type Support
```
"status": "enum:PENDING,PROCESSING,SHIPPED,DELIVERED,CANCELLED"
```
Automatically generates a type-safe string literal union:
```typescript
// order-status.model.ts
export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
```

#### Collection Handling
```
"items": "OrderItem[]"
"tags": "string[]"
"categories": "Category[]"
```
Creates properly typed arrays in TypeScript interfaces.

### 3. Enhanced API Generation

#### RESTful Service Generation
For an endpoint `/api/v1/products`, a fully typed Angular service is created:

```typescript
// product-api.service.ts
@Injectable({ providedIn: 'root' })
export class ProductApiService {
  private apiUrl = '/api/v1/products';
  private http = inject(HttpClient);
  constructor() {}

  getProductList(params?: { page: number; limit: number; }): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(this.apiUrl, { params });
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: ProductRequest): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: string, product: ProductRequest): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchProducts(queryParams: { [key: string]: any }): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(`${this.apiUrl}/search`, { params: queryParams });
  }
}
```

#### Advanced Request/Response Models
Separate interfaces for `Request` and `Response` models are generated.

```typescript
// product.model.ts
export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  // ... and so on
}

// product-request.model.ts
export type ProductRequest = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'rating'>;

// products-response.model.ts
export interface ProductsResponse {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
```

### 4. Comprehensive Business Logic

#### Advanced State Service with Signals
A dedicated state service is generated, using Angular Signals as the primary mechanism for state management. This provides a more efficient and intuitive way to manage state. Writable signals are kept private to ensure a unidirectional data flow, exposing read-only signals to the application.

```typescript
// product-state.service.ts
import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductApiService } from './product-api.service';
import { ProductState, initialProductState } from '../state/product.state';

@Injectable({ providedIn: 'root' })
export class ProductStateService {
  private apiService = inject(ProductApiService);

  // Private Writable Signal for State
  #state = signal<ProductState>(initialProductState);

  // Public Read-only Signals and Computed Signals for consumption
  readonly products = computed(() => this.#state().products);
  readonly selectedProduct = computed(() => this.#state().selectedProduct);
  readonly isLoading = computed(() => this.#state().isLoading);
  readonly error = computed(() => this.#state().error);
  readonly isSubmitting = computed(() => this.#state().isSubmitting);
  
  // Actions to modify state
  async loadProducts() {
    this.#state.update(state => ({ ...state, isLoading: true }));
    try {
      const response = await firstValueFrom(this.apiService.getProductList());
      this.#state.update(state => ({
        ...state,
        products: response.items,
        isLoading: false
      }));
    } catch (e) {
      this.#state.update(state => ({ ...state, error: 'Failed to load products', isLoading: false }));
    }
  }

  async createProduct(product: ProductRequest) {
    this.#state.update(state => ({ ...state, isSubmitting: true }));
    // ... implementation with try/catch
  }
  
  selectProduct(product: Product) {
    this.#state.update(state => ({...state, selectedProduct: product }));
  }
}
```

#### Advanced State Service with RxJS
A dedicated state service using RxJS `BehaviorSubject` is created to manage the feature's state.

```typescript
// product-state.service.ts
@Injectable({ providedIn: 'root' })
export class ProductStateService {
  private state = new BehaviorSubject<ProductState>(initialProductState);
  
  // Selectors for the UI
  products$ = this.state.pipe(map(s => s.products), distinctUntilChanged());
  isLoading$ = this.state.pipe(map(s => s.isLoading), distinctUntilChanged());
  error$ = this.state.pipe(map(s => s.error), distinctUntilChanged());
  // ... other selectors
  
  constructor(private apiService: ProductApiService) {}
  
  // Actions to modify state
  loadProducts() {
    this.state.next({ ...this.state.value, isLoading: true });
    this.apiService.getProductList().pipe(
      tap(response => this.state.next({ ...this.state.value, products: response.items, isLoading: false })),
      catchError(err => {
        this.state.next({ ...this.state.value, error: 'Failed to load products', isLoading: false });
        return EMPTY;
      })
    ).subscribe();
  }

  createProduct(product: ProductRequest) { /* Implementation with loading and error handling */ }
  deleteProduct(id: string) { /* Implementation */ }
  // ... other actions
}
```

#### Enhanced UI State Model
```typescript
// product.state.ts
export interface ProductState {
  // Data state
  products: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  
  // Search state
  searchQuery: string;
  searchResults: Product[];
  isSearching: boolean;
  
  // Form state (using Angular Reactive Forms)
  isSubmitting: boolean;
  
  // Pagination
  currentPage: number;
  hasMorePages: boolean;
  isLoadingMore: boolean;
  
  // UI state
  showCreateDialog: boolean;
}
```

### 5. Advanced UI Components

#### Comprehensive Standalone Component with Signals
The main feature component consumes state directly from the Signal-based service. This eliminates the need for the `async` pipe, leading to cleaner and more readable templates. Angular automatically tracks signal dependencies in the template and schedules change detection when they update.

#### Comprehensive Standalone Component with All States
A main feature component is generated that handles all UI states gracefully.

```typescript
// product-page.component.ts
@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule, ProductListComponent],
  templateUrl: './product-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent implements OnInit {
  state$ = this.productState.state$; // Expose full state or individual selectors

  constructor(public productState: ProductStateService) {}
  
  ngOnInit() {
    this.productState.loadProducts();
  }
}

// product-page.component.html
<mat-spinner *ngIf="productState.isLoading() && productState.products().length === 0"></mat-spinner>

<app-error-state *ngIf="productState.error()" [error]="productState.error()!"></app-error-state>

<app-empty-state *ngIf="!productState.isLoading() && productState.products().length === 0"></app-empty-state>

<app-product-list
  *ngIf="productState.products().length > 0"
  [products]="productState.products()">
</app-product-list>
```

### 6. Complete Testing Suite

#### Automatic Test Generation
Creates comprehensive `.spec.ts` files using Angular's `TestBed`.

```typescript
// product-state.service.spec.ts
describe('ProductStateService', () => {
  it('should update state correctly on loadProducts success', () => { /* ... */ });
  it('should handle error correctly on loadProducts failure', () => { /* ... */ });
});

// product-api.service.spec.ts
describe('ProductApiService', () => {
  let httpTestingController: HttpTestingController;
  it('getProducts should call correct endpoint', () => { /* ... */ });
  it('createProduct should send correct request body', () => { /* ... */ });
});

// product-page.component.spec.ts
describe('ProductPageComponent', () => {
  it('should show loading state when products are loading', () => { /* ... */ });
  it('should show error state when an error occurs', () => { /* ... */ });
  it('should show product list when products are loaded', () => { /* ... */ });
});
```

## 📊 What Gets Generated

### 1. Complete Module Structure
A well-organized feature folder is created following Angular best practices.

```
src/app/features/[name]/                     (Public API for the feature)
├── [name].routes.ts             (Lazy-loaded routes for the feature)
├── components/                  (Smart and presentational components)
│   ├── [name]-list/
│   │   ├── [name]-list.component.ts
│   │   ├── [name]-list.component.html
│   │   └── [name]-list.component.spec.ts
│   └── [name]-form-dialog/
│       └── ...
├── pages/                       (Top-level routed components)
│   └── [name]-page/
│       ├── [name]-page.component.ts
│       ├── [name]-page.component.html
│       └── [name]-page.component.spec.ts
├── models/                      (All TypeScript interfaces and types)
│   ├── [main-model].model.ts
│   ├── [nested-model].model.ts
│   └── index.ts
├── services/                    (API and State management services)
│   ├── [name]-api.service.ts
│   ├── [name]-api.service.spec.ts
│   ├── [name]-state.service.ts
│   ├── [name]-state.service.spec.ts
│   └── index.ts
└── state/                       (State model definition)
    ├── [name].state.ts
    └── index.ts
```

### 2. Automatic Integration
- **[name].routes.ts**: Defines the lazy-loaded routes for the feature.
- **app.routes.ts**: The main app routing is updated to include the new lazy-loaded feature route:
  ```typescript
  {
    path: '[name]s',
    loadChildren: () => import('./features/[name]/[name].routes').then(m => m.[NAME]_ROUTES)
  }
  ```

### 3. Enhanced Error Handling
- **HTTP Interceptor Integration**: Hooks into existing error handling interceptors.
- **RxJS `catchError`**: Manages API errors gracefully within state services.
- **Reactive Forms Validation**: Generates forms with built-in validation.
- **UI States**: Components are built to handle loading, empty, and error states.

### 4. Performance Optimizations
- **`OnPush` Change Detection**: Generated components use `OnPush` for better performance.
- **`trackBy` Functions**: Provided for `*ngFor` loops to optimize rendering.
- **Lazy Loading**: Feature is automatically configured for lazy loading.
- **RxJS Best Practices**: Efficient use of operators to prevent memory leaks and unnecessary computations.

## ⚡ Performance Features

### Performance Optimization With Signals
- Fine-Grained Reactivity: Signals notify the framework precisely which components need updating, potentially skipping unnecessary change detection cycles.
- Glitch-Free & Synchronous: Unlike RxJS, signals are synchronous and prevent intermediate state issues ("glitches").
- No async Pipe Boilerplate: Simplifies templates and removes a potential source of subscription management issues.
- Lazy Evaluation: computed signals are only re-evaluated when their dependencies change and they are read, preventing unnecessary computations.

### Build Time Optimizations
- **Standalone Components**: Reduces dependencies and improves tree-shakability.
- **Strict Typing**: Enforces TypeScript's strict mode for more reliable and optimized code.

### Runtime Optimizations
- **Efficient State Management**: Centralized state with RxJS ensures predictable and efficient updates.
- **Memoized Selectors**: Prevents re-computation of derived state.
- **`async` Pipe**: Handles subscription management automatically, preventing memory leaks.

### Developer Experience
- **Hot Module Replacement (HMR)**: Full support for rapid development cycles.
- **Strict Linting Rules**: Enforces a consistent and high-quality codebase via pre-configured ESLint.
- **Typed Reactive Forms**: Generates type-safe forms for better developer ergonomics.

## 🔍 Troubleshooting & Debugging

### Built-in Validation
The command includes extensive validation for:
- Model syntax and type compatibility.
- Naming convention enforcement (Angular Style Guide).
- Route path conflict detection.

### Debug Commands
```bash
# Verify build and dependencies
ng build

# Run comprehensive tests for the feature
ng test --include=src/app/features/[name]/**/*.spec.ts

# Lint checking
ng lint
```

### Common Issues & Solutions

| Issue | Cause | Solution |
|---|---|---|
| Build fails | Invalid model syntax | Check JSON format, verify types are valid |
| Navigation errors| Route path conflict | Check `app.routes.ts`, ensure unique path for the feature |
| DI failures | Service not provided | Ensure services use `@Injectable({ providedIn: 'root' })` |
| API errors | Invalid endpoint URL | Verify endpoint base in the command and API service |
| UI not updating | Change detection issue | Ensure components use `OnPush` and observables are correctly piped through `async` |

## 🎯 Best Practices Integration

### Follows All Project Patterns
- ✅ Standalone Component architecture
- ✅ Signal-based state management for local and feature-level state.
- ✅ Use of RxJS for its strengths in handling asynchronous events like HTTP requests.
- ✅ Clean, scalable folder structure
- ✅ Angular Style Guide compliance
- ✅ Lazy loading by default
- ✅ Robust testing strategy
- ✅ Performance optimization techniques