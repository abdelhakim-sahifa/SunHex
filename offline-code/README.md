# Offline SunHex Code

This folder contains a self-contained version of the SunHex SIN generation and decoding logic, along with a React component (`SinForm.tsx`) that demonstrates its usage. This code is designed to be easily integrated into your Next.js projects, allowing for offline and client-side processing of SINs without relying on external API calls.

## File Structure

- `SinForm.tsx`: A React component demonstrating SIN generation and decoding.
- `sinDecoder.ts`: TypeScript functions for decoding SINs.
- `sinGenerator.ts`: TypeScript functions for generating SINs.
- `security.ts`: Utility functions for securing and resolving SINs (character-shifting based).
- `country.ts`: Utility functions for encoding and decoding country codes.
- `date.ts`: Utility functions for encoding and decoding dates.
- `gender.ts`: Utility functions for encoding and decoding gender.
- `name.ts`: Utility functions for encoding and decoding names.
- `constants.ts`: Constants used by the utility functions (e.g., country codes, letter-to-number mappings).
- `favicon.png`: The favicon image used by the `SinForm` component.

## How to Use

### 1. Using the Utility Functions (TypeScript)

You can directly import and use the TypeScript utility functions in your Next.js project. These functions handle the core logic of SIN generation, decoding, and data transformation.

**Example:**

```typescript
// In your component or API route
import { generateSin } from './offline-code/sinGenerator';
import { decodeSin } from './offline-code/sinDecoder';

// Generate a SIN
const newSin = generateSin(
  "John", "Doe", "US", 1990, 1, 15, "Male", 1234
);
console.log("Generated SIN:", newSin);

// Decode a SIN
const decodedInfo = decodeSin(newSin.hexCode, 1234);
console.log("Decoded Info:", decodedInfo);
```

### 2. Using the `SinForm` Component (React/Next.js)

The `SinForm.tsx` component provides a ready-to-use UI for generating and decoding SINs. You can copy this component and its dependencies into your Next.js project.

**Steps to Integrate `SinForm.tsx`:**

1.  **Copy the `offline-code` folder:** Copy the entire `offline-code` directory into your Next.js project (e.g., into your `src` directory or directly into your project root).

2.  **Import the component:** In the Next.js page or component where you want to use the form, import `SinForm`:

    ```typescript
    // In your page.tsx or component.tsx
    import SinForm from '../offline-code/SinForm'; // Adjust path as needed
    ```

3.  **Render the component:** Include `<SinForm />` in your JSX:

    ```typescript
    export default function MyPage() {
      return (
        <div>
          <h1>My Application</h1>
          <SinForm />
        </div>
      );
    }
    ```

4.  **Styling:** The `SinForm` component uses various CSS class names (e.g., `section`, `form-input`, `submit-button`). You will need to provide your own CSS styles for these classes to match your project's design system. You can adapt the styles from the main project's `globals.css` or `responsive.css` files, or create entirely new ones.

5.  **Image Assets:** The `SinForm` component uses `favicon.png`. Ensure this image is accessible at the path `/favicon.png` in your project's `public` directory, or update the `<img>` tag's `src` attribute within `SinForm.tsx` to point to the correct location.

## Important Notes

*   **Offline Processing:** All SIN generation and decoding logic within this folder is performed client-side/locally. No external API calls are made.
*   **Data Privacy:** Since processing is local, your personal data never leaves your machine.
*   **Customization:** Feel free to modify any of the files to suit your specific needs or integrate them deeper into your application's architecture.
