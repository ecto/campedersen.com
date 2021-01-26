---
layout: post
title: TypeScript Generic React Components
date: 2021-01-26
---

import evolution from './evolution.png';

Simplicity of composition is what makes React so powerful to work with. I
recently discovered a pattern that enables more composable components. More
specifically it allows us to delete a lot of `any`s. It seems obvious in
retrospect but I haven't encountered it much.

Functional components are my favorite because the contract is super clear. If
you pass these `props`, you get a `ReactElement` back:

```tsx
type FormProps = {
  onSubmit: (values: any) => void;
}
const Form = ({ onSubmit }: FormProps): ReactElement => (
```

We usually think of types as compile-type information.
[Generics](https://www.typescriptlang.org/docs/handbook/generics.html) allow
type information to be applied at runtime, passed like arguments. This is useful
when you have functionality that depends on the data type.

## Evolving the component

<img src={evolution} width={256} style={{float: "right"}} />

In our example above, we originally let values be `any` because `Form` won't
know ahead of time what values may eventually be submitted. We can pass a type
like an argument to fix this:

```tsx
type FormProps<Values> = {
  onSubmit: (values: Values) => void;
};
```

We would then pass it to `FormProps` from the function definition:

```tsx
const Form = <Values,>({ onSubmit }: FormProps<Values>): ReactElement => (
```

The trailing comma above is a special character to signal to JSX that
`<Values,>` isn't the start of a `Values` component but rather a generic type
signature.

Now when using form we can expect a pretyped submit handler!

```tsx
<Form<{username: string}> onSubmit={({username}) => console.log(username)}>
```

I've also found this useful in generic Table components, but I'll leave that as
an exercise to the reader.

## A note on names

In
[official type definitions](https://github.com/microsoft/TypeScript/blob/master/lib/lib.es5.d.ts#L1170)
and most documentation you will find around generics, the prevailing pattern is
to name generics a single letter.

I find this nuts. It's like reading math. Letters are cheap, and in my opinion
using a descriptive type argument name is always worth it.

Remember, code is for humans, otherwise we'd be writing Assembly by hand.
