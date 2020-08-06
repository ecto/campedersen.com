---
layout: post
title: Enums vs String Literals
date: 2020-08-06
---

import decision from './decision.jpg';

<img src={decision} width="128" style="float: right" />

I've been fighting with
[enums](https://www.typescriptlang.org/docs/handbook/enums.html) in TypeScript
this week. Specifically, whether it's better to use a
[string literal type](https://www.typescriptlang.org/docs/handbook/literal-types.html)
or enum to represent a reused value.

They're both appropriate ways to define and constrain uses of a string-based
value, but there are some subtle differences both in how TypeScript treats them
and their ergonomics.

## String literal types

String literal types are straightforward:

```ts
type Color = 'red' | 'orange' | 'yellow' | 'blue' | 'indigo' | 'violet';
```

These are interesting (and useful) because `Color` is a subset of `string` but
`string` is not a subset of `Color`.

```ts
type Nanometers = number;
const getWavelength = (color: Color): Nanometers => {
  if (color === 'red') {
    return 700;
  } else if (color === 'orange') {
    // etc
  }
};

getWavelength('red');
// 650

getWavelength('ted');
// Argument of type '"ted"' is not assignable to parameter of type 'Color'.
```

Since this type doesn't create a value, no code is generated, and it's only used
at compile time.

## Enums

Enum types look really similar on the surface:

```ts
enum Color {
  'red',
  'orange',
  'yellow',
  'blue',
  'indigo',
  'violet',
}
```

But these will generate a value with the following JS code:

```ts
var Color;
(function (Color) {
  Color[(Color['red'] = 0)] = 'red';
  Color[(Color['orange'] = 1)] = 'orange';
  Color[(Color['yellow'] = 2)] = 'yellow';
  Color[(Color['blue'] = 3)] = 'blue';
  Color[(Color['indigo'] = 4)] = 'indigo';
  Color[(Color['violet'] = 5)] = 'violet';
})(Color || (Color = {}));
```

## String enums

You can also attach other information to them, what we call a **string enum**:

```ts
enum Color {
  Error = 'red',
  Danger = 'orange',
  Attention = 'yellow',
  Info = 'blue',
  Success = 'indigo',
  Fun = 'violet',
}
```

This will make the compiled code a bit smaller:

```ts
var Color;
(function (Color) {
  Color['Error'] = 'red';
  Color['Danger'] = 'orange';
  Color['Attention'] = 'yellow';
  Color['Info'] = 'blue';
  Color['Success'] = 'indigo';
  Color['Fun'] = 'violet';
})(Color || (Color = {}));
```

And by using this object, we can avoid allocating strings at runtime:

```ts
const getWavelength = (color: Color): Nanometer => {
  if (color === Color.Error) {
    return 700;
  } else if (color === 'orange') {
    // etc
  }
};
```

will compile down to:

```ts
const getWavelength = (color) => {
  if (color === Color.Error) {
    return 700;
  } else if (color === 'orange') {
    // etc
  }
};
```

## Ergonomics

This makes sense, but they are really similar on such a small scale. The real
difference is how they are used in a larger codebase.

Let's say you have a configuration object, a big JSON blob, that you want to
make sure is typesafe. You can use that to predictable render different UI based
on the data.

```tsx
type Color = 'red' | 'orange' | 'yellow' | 'blue' | 'indigo' | 'violet';

type Message = {
  title: string;
  color: Color;
};

const data = [
  {
    title: 'This is an error!',
    color: 'red',
  },
  {
    title: 'You have successfully adopted a dog',
    color: 'violet',
  },
];

const MessageCenter = ({messages}: {messages: Message[]}) => (
  <>
    {messages.map((message) => (
      <div style={{color: message.color}}>{message.title}</div>
    ))}
  </>
);

<MessageCenter messages={data} />;
```

This won't compile!

```
Type '{ title: string; color: string; }[]' is not assignable to type
'Message[]'. Type '{ title: string; color: string; }' is not assignable to type
'Message'. Types of property 'color' are incompatible. Type 'string' is not
assignable to type 'Color'.
```

We need to hint to the compiler that the object contains a `Color`:

```ts
const data: Message[] = [
```

or

```ts
  color: 'red' as Color,
```

This is a code smell to me. It's unnecessary code that will rot over time and
unclear if it can be deleted. The only important thing important here is the
data, and the compiler should be able to figure out what type it is.

With an enum this hinting is unnecessary because the value includes the type
information:

```ts
enum Color {
  Error = 'red',
  Danger = 'orange',
  Attention = 'yellow',
  Info = 'blue',
  Success = 'indigo',
  Fun = 'violet',
}

const MessageData = [
  {
    title: 'This is an error!',
    color: Color.Error,
  },
  {
    title: 'You have successfully adopted a dog',
    color: Color.Fun,
  },
];

// Compiles without error!
<MessageCenter messages={data} />;
```

This also comes with the benefit of not allocating individual strings for every
`Message.color`.

## So should I always use enums then?

Nope. With all this said, I prefer string literal types outside of this
situation. **The less code you ship the better**, and as stated above enums will
generate a value via compiled JS. If you don't need to attach extra info (like a
name, or display value) to the data, a string literal will do just fine to
define your object and give you that sweet TS autocompletion.
