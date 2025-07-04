# @0xsequence/trails-sdk

> Trails SDK for sending any token from any chain.

⚠️ This is a work in progress!

## Installation

```bash
npm install @0xsequence/trails-sdk
```

## Usage

### React Widget Component

The easiest way to integrate Trails is using our pre-built React widget:

```typescript
import { TrailsWidget } from '@0xsequence/trails-sdk/widget'

export const App = () => {
  const sequenceProjectAccessKey = import.meta.env.VITE_SEQUENCE_API_KEY

  return (
    <TrailsWidget
      sequenceProjectAccessKey={sequenceProjectAccessKey}
    />
  )
}
```

## Development

```bash
# Install dependencies
pnpm install

# Build the package
pnpm run build

# Run tests
pnpm test
```

## License

MIT License
