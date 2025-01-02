# mrlm-net/flagz
 
Implementation of feature flags functionality in Typescript.

| Package | `mrlm-net/flagz` |
| :-- | :-- |
| NPM name | `@mrlm/flagz` |
| NPM version | ![NPM Version](https://img.shields.io/npm/v/@mrlm/flagz) |
| Latest version | ![GitHub Release](https://img.shields.io/github/v/release/mrlm-net/flagz) |
| License | ![GitHub License](https://img.shields.io/github/license/mrlm-net/flagz) |


## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Advanced Usage](#advanced-usage)
- [Interfaces](#interfaces)
- [Contributing](#contributing)

## Installation

> I'm using `YARN` so examples will be using it, you can install this package via any Node Package Manager.

```shell
$ yarn add @mrlm/flagz
```

## Usage

```typescript
import Flagger from '@mrlm/flagz';

const flagger = new Flagger();
flagger.set('FEATURE_A', true);
console.log(flagger.get('FEATURE_A')); // true
console.log(flagger.get('FEATURE_B')); // false
```

## Advanced Usage

### Nested Keys

```typescript
const flagger = new Flagger();
flagger.set('FEATURE_A.SUB_FEATURE_A1', true);
console.log(flagger.get('FEATURE_A.SUB_FEATURE_A1')); // true
console.log(flagger.get('FEATURE_A.SUB_FEATURE_A2')); // false
```

### Custom Separator

```typescript
const flagger = new Flagger({}, { separator: '/' });
flagger.set('FEATURE_A/SUB_FEATURE_A1', true);
console.log(flagger.get('FEATURE_A/SUB_FEATURE_A1')); // true
```

### Adding Flags

```typescript
const flagger = new Flagger();
flagger.addFlags({ FEATURE_C: true, FEATURE_D: { SUB_FEATURE_D1: false } });
console.log(flagger.get('FEATURE_C')); // true
console.log(flagger.get('FEATURE_D.SUB_FEATURE_D1')); // false
```

### Setting Flags

```typescript
const flagger = new Flagger();
flagger.setFlags({ FEATURE_E: true, FEATURE_F: { SUB_FEATURE_F1: false } });
console.log(flagger.get('FEATURE_E')); // true
console.log(flagger.get('FEATURE_F.SUB_FEATURE_F1')); // false
```

## Interfaces

### FlaggerOptions

```typescript
export interface FlaggerOptions {
    separator?: string;
}
```

## Contributing

_Contributions are welcomed and must follow [Code of Conduct](https://github.com/mrlm-net/logz?tab=coc-ov-file) and common [Contributions guidelines](https://github.com/mrlm-net/.github/blob/main/docs/CONTRIBUTING.md)._

> If you'd like to report security issue please follow [security guidelines](https://github.com/mrlm-net/logz?tab=security-ov-file).

---
<sup><sub>_All rights reserved &copy; Martin Hrášek [<@marley-ma>](https://github.com/marley-ma) and WANTED.solutions s.r.o. [<@wanted-solutions>](https://github.com/wanted-solutions)_</sub></sup>