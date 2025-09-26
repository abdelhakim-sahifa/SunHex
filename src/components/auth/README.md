# SunHex Auth Components for Next.js

This package provides React components for integrating SunHex authentication into your Next.js application.

## Installation

```bash
npm install @sunhex/auth-components
# or
yarn add @sunhex/auth-components
```

## Usage

### SignUp Component

The SignUp component provides a form for new user registration using SunHex's SIN generation service.

```tsx
import { SignUpForm, LocalStorageAdapter } from '@sunhex/auth-components';

// Optional: Create a storage adapter to persist user data
const storageAdapter = new LocalStorageAdapter();

function SignUpPage() {
  const handleSignUpSuccess = (hexCode: string) => {
    console.log('User registered successfully with SIN:', hexCode);
    // Handle successful registration (e.g., redirect to dashboard)
  };

  return (
    <SignUpForm
      onSignUpSuccess={handleSignUpSuccess}
      storageAdapter={storageAdapter}
      // Optional: Override the default API endpoint
      customEndpoint="https://your-api.com/sunhex"
    />
  );
}
```

### SignIn Component

The SignIn component provides a form for user authentication using SunHex's SIN decoding service.

```tsx
import { SignInForm, LocalStorageAdapter } from '@sunhex/auth-components';

// Optional: Create a storage adapter to retrieve additional user data
const storageAdapter = new LocalStorageAdapter();

function SignInPage() {
  const handleSignInSuccess = (userData) => {
    console.log('User authenticated successfully:', userData);
    // Handle successful authentication (e.g., redirect to dashboard)
  };

  return (
    <SignInForm
      onSignInSuccess={handleSignInSuccess}
      storageAdapter={storageAdapter}
      // Optional: Override the default API endpoint
      customEndpoint="https://your-api.com/sunhex"
    />
  );
}
```

### Custom Storage Adapter

You can create your own storage adapter to integrate with your backend:

```tsx
import { StorageAdapter } from '@sunhex/auth-components';

class CustomStorageAdapter implements StorageAdapter {
  async saveUserData(hexCode: string, userData: any): Promise<void> {
    // Implement your storage logic here
    await yourApi.saveUser({ hexCode, ...userData });
  }

  async getUserData(hexCode: string): Promise<any> {
    // Implement your retrieval logic here
    return await yourApi.getUser(hexCode);
  }
}

// Use your custom adapter
const customStorage = new CustomStorageAdapter();

function AuthPage() {
  return (
    <>
      <SignUpForm storageAdapter={customStorage} />
      <SignInForm storageAdapter={customStorage} />
    </>
  );
}
```

## API Reference

### SignUpForm Props

| Prop | Type | Description |
|------|------|-------------|
| onSignUpSuccess | `(hexCode: string) => void` | Callback function called after successful registration |
| storageAdapter | `StorageAdapter` | Optional adapter for storing additional user data |
| customEndpoint | `string` | Optional custom API endpoint (default: 'https://sunhex.vercel.app/api') |

### SignInForm Props

| Prop | Type | Description |
|------|------|-------------|
| onSignInSuccess | `(userData: object) => void` | Callback function called after successful authentication |
| storageAdapter | `StorageAdapter` | Optional adapter for retrieving additional user data |
| customEndpoint | `string` | Optional custom API endpoint (default: 'https://sunhex.vercel.app/api') |

### StorageAdapter Interface

```typescript
interface StorageAdapter {
  saveUserData: (hexCode: string, userData: any) => Promise<void>;
  getUserData: (hexCode: string) => Promise<any>;
}
```

## Styling

The components use Tailwind CSS classes by default. Make sure to include Tailwind CSS in your project for the default styles to work. You can override the styles by providing your own CSS classes.

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

MIT Licensed.