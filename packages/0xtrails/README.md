# 0xtrails

> Trails SDK for sending any token from any chain.

## Installation

```bash
npm install 0xtrails
```

## Usage

### React Widget Component

The easiest way to integrate Trails is using our pre-built React widget:

```typescript
import { TrailsWidget } from '0xtrails/widget'

export const App = () => {
  return (
    <TrailsWidget />
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
