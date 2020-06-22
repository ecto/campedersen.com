---
layout: post
title: 'TypeScript - why Dachshunds are bad drivers'
date: 2020-06-22
---

import intellisense from "./intellisense.mp4";
import hal from "./hal.gif";

Today I gave a presentation about adopting TypeScript into a React codebase. Here are my slides and notes, so others can get just as little enjoyment out of this as my dog did while I was mock presenting to her.

![](./slide-0.png)

Whoa, that isn't right... I'm so embarrassed... Let's try this again.

![](./slide-1.png)

That's better. This is super high level, TypeScript for beginners, and why we don't give our dog the keys anymore.

![](./slide-2.png)

From their website, TypeScript is a **typed superset** of JS. That means it's just JavaScript, with types on top.

It compiles to JS, so it's usable everywhere JS is.

It's made by Microsoft, as an apology for ever creating Internet Explorer. This is important, because they've been on a sort of world apology tour lately. Deep integration with **VS Code** makes TypeScript doubly good.

![](./slide-3.png)

So why would you use TypeScript, let alone types? Well, I like to say JS already has types... but only has one type: an Object.

In JS, everything is an object. The classic error `undefined is not a function` occurs in runtime because the compiler doesn't have information about what's inside that object.

![](./slide-4.png)

Programming is the act of understanding a system, changing a concept, and committing that change to code.

As codebases scale, an individual programmer can no longer hold the entirety in their head. And so to scale a codebase we must scale down the pieces that we reason about.

TypeScript allows this because it enables us to define boundaries between modules, and then forget about them - instead leaning on our tooling for code completion or type hinting.

![](./slide-5.png)

PDF export dropped this video, here we go:

<video src={intellisense} autoplay loop />

I used to be a huge [vim user](/ipad), but in the last couple of years I've dropped it for VS Code because I'm just _way_ more productive.

In 2020 we have incredible tools. By not adopting them, we're leaving huge productivity and speed gains on the floor.

TypeScript/VS Code integration is unspeakably powerful, and I'm still not using [all the features](https://code.visualstudio.com/docs/languages/typescript).

![](./slide-6.png)

Sometimes runtime errors are just not acceptable. You wouldn't put JS on a spaceship, or use it for financial software, because you can't make enough guarantees.

![](./slide-7.png)

"I have a React app and it works, and I'm not sending people to the Moon. I'm good."

That's awesome. TypeScript is optional. You can integrate it just where it's useful. Mixed codebases are common.

Seatbelts are optional too.

![](./slide-8.png)

Now that we have more guarantees about the safety of our runtime, we are starting to put JavaScript on space ships. Just last month, [SpaceX put humans in orbit with a JS interface](https://www.theverge.com/2020/5/31/21271269/spacex-docking-iss-crew-dragon-nasa-success).

![](./slide-9.png)

Adopting TS is super easy. If you're using Create React App, most of the work is done for you. In most cases you'll just need a `tsconfig.json`.

From there, just change the extension of your file to `.tsx`.

Fix whatever errors come up, usually by adding annotations to your functions.

![](./slide-10.png)

Annotations are the core of what TS is made of. Here, we have a simple JS function.

![](./slide-11.png)

Here we're adding type information by telling the function to expect a string argument.

![](./slide-12.png)

If we try to pass a non-string, TS will throw an error - at compile time! This expectation is usually violated at runtime, causing an error. Here we've caught it before the code ever gets to production.

![](./slide-13.png)

We can also define an expectation for the return type of the function.

Here the function now has added behavior based on a certain input. When returning the wrong type, and breaking the expectations of downstream users of the function, an error is thrown at compile time.

![](./slide-14.png)

How do we apply these concepts to React? Here we have a simple component with `propTypes` and `defaultProps`. So why would we use TS?

![](./slide-15.png)

There are a few benefits. We're accomplishing the same ends, but now we're doing it at compile time. This means React has to do less work at runtime.

On top of that, the information is in the function declaration itself. In the real world this component might be hundreds of lines long, pushing `propTypes` down to the bottom of the file. Also TypeScript will display prop hints when you use the component downstream.

`ReactNode` is the main type at play here, and the preferred return type for functional components.

![](./slide-16.png)

`FC` is another important type. It's identical to `FunctionComponent`. It holds a little more information though, especially if you want your component to have `children`.

![](./slide-17.png)

Here we don't have to type out the `children` prop. So if you are using `children` use `FC`, otherwise just return `ReactNode`.

![](./slide-18.png)

Hooks are a huge part of modern React. Here we have a common `Input` component pattern, using `useState` and setting the value when the input is changed.

![](./slide-19.png)

`useState` can take arbitrary data, and so we have no information about what's in the `value`. Here we add a simple `string` annotation to the hook.

![](./slide-20.png)

This is important if you want to refactor hooks to be reusable. Here's a simple reusable hook where we log the value very time we change it.

![](./slide-21.png)

We can add type information to it with **Generics**, which are basically second order functions. You pass the type when using this abstracted function, which is then passed down to `useState`.

![](./slide-22.png)

Sometimes you have a deadline and can't be bothered to deal with types. In this component, TypeScript is going to complain because we're making assumptions about the shape of `data`. And rightly so, if `data` isn't an Array, this component will throw in runtime!

![](./slide-23.png)

If you don't feel like dealing with this, just make it an `any` type.

[redacted slide]

TS has bad parts too.

Sometimes the errors are just crazy. This error means exactly what it says on the tin, but it's not human readable at all. This is usually a symptom of something mistyped deeper, and requires understanding of the type hierarchy your code touches.

![](./slide-25.png)

Another missed video:

<img src={hal} />

Converting a component to TypeScript has the tendency to pull other code into your refactor. Just like when Hal went to change a light bulb and ended up changing his oil, some TS adoptions end up with spaghetti pull requests touching many pieces of code.

This isn't a problem when you start the project with TS.

![](./slide-27.png)

In conclusion, my dog is actually a great driver. But she refuses to use a seat belt, and for this reason we never let her take the car out anymore.

TypeScript is a seatbelt for your JavaScript.
