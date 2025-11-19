---
date: 2025-11-17
title: "Typescript Type Inference Pitfalls"
description: "Some of my learnings regarding the typescript type system while building my schema validation library Narro."
tags: ["typescript", "schema"]
icon: logos:typescript-icon
---

While building :SLink{text="Narro" to="https://www.github.com/schplitt/narro/"}, a schema validation library for TypeScript, I ran into some unexpected pitfalls with TypeScript's type system. A deeper dive into Narro will come in a future blog post, but for now, let's explore the challenges I faced while building it.

## Generic Type Parameters and Their Preservation

Generics allow for dynamic and more accurate types based on inputs. They help create flexible and reusable code. A common pattern is to use generic type parameters with constraints and default types.

In this example there is a simple generic function that returns a greeting message based on the provided name. `TName` is a generic type parameter that extends `string`, meaning it can be any string type.

```ts
function hello<TName extends string>(name: TName): `Hello, ${TName}!` {
  return `Hello, ${name}!` as `Hello, ${TName}!`;
}

const greeting = hello("Alice");
//    ^? const greeting: "Hello, Alice!"
```

This same principle works with objects. Here is a generic function to create a user profile. Again, the type for the name property is inferred from the input object.

```ts
type User<TName extends string> = {
  username: TName
  createdAt: Date
};

function createUser<TName extends string>(name: TName): User<TName> {
  return {
    username: name,
    createdAt: new Date(),
  };
}

const user = createUser("Bob");
//    ^? const user: User<"Bob">
```

Having the user type inferred as `User<"Bob">` allows us to take full advantage of TypeScript's type system, ensuring accurate types based on the specific username. This comes in handy for things like type-safe operations later on. 

This type information can be accessed in multiple ways:

```ts
const user = createUser("Bob");
//    ^? const user: User<"Bob">

type UsernameType = typeof user.username;
//    ^? type UsernameType = "Bob"
type UsernameType2 = (typeof user)["username"];
//    ^? type UsernameType2 = "Bob"

type UsernameType3 = typeof user extends User<infer T> ? T : never;
//    ^? type UsernameType3 = "Bob"
```

As you may have noticed, the third way is a bit more verbose. It uses a conditional type with the `infer` keyword to extract the generic type parameter `T` from the `User` type. This approach is useful when working with more complex types where the exact structure may not be known. With this method it can be extracted directly.

## When Type Inference Doesn't Preserve What You Need

In a schema validation library like Narro, there isn't any type information stored at runtime. Instead, the types for the input, output, and configuration of the schema need to be stored to use them later for validation and to provide accurate types to users. This is where I encountered an unexpected inference behavior.

When I first created the `BuildableSchema` type for Narro, I didn’t think I would need to store the input, output, and configuration types directly in the schema object.
I assumed I could leverage the third method above to extract the types later when needed with utility types. 

It looked something like this:

```ts
interface BuildableSchema<TOutput, TInput, TOptions extends CommonOptions> {
  parse(input: unknown): TOutput;
}

type InferInput<S> = S extends BuildableSchema<any, infer TInput, any> ? TInput : never;

type InferOutput<S> = S extends BuildableSchema<infer TOutput, any, any> ? TOutput : never;
```

This worked fine for input and output types with simple schemas like `string()` or `number()`. However, when I tried to extract the configuration type `TOptions` to determine whether object schema properties should be optional or required, TypeScript kept widening `TOptions` to its constraint type `CommonOptions` instead of preserving the more specific type like `DefaultCommonOptions`. This meant I couldn't distinguish between `required` and `exactOptional` fields. Everything appeared to be widened `CommonOptions` type.

To illustrate the problem, consider this simplified example:

```ts
interface CommonOptions {
  optionality: 'required' | 'optional' | 'exactOptional';
}

interface DefaultCommonOptions extends CommonOptions {
  optionality: 'required';
}

interface BuildableSchema<TOptions extends CommonOptions> {
  parse(input: unknown): any;
}

interface StringSchema<
  TOptions extends CommonOptions = DefaultCommonOptions
> extends BuildableSchema<TOptions> {
  exactOptional(): StringSchema<{ optionality: 'exactOptional' }>
}

function string(): StringSchema {
  //...
}

type ExtractOptions<S> = S extends BuildableSchema<infer TOptions> ? TOptions : never;

const mySchema = string();
type Options = ExtractOptions<typeof mySchema>;
//   ^? Options = CommonOptions ❌ (expected DefaultCommonOptions)
```

This behavior was completely unexpected and baffling at first. I was convinced I had made a mistake in my type definitions. After reviewing the expected behavior of each type, I realized something unexpected was happening during TypeScript's inference process. It wasn't until I examined how :SLink{text="Valibot" to="https://www.github.com/valibot/valibot"} structured their schema types that I discovered they used a special property to store type information. Applying this same pattern immediately resolved the issue.

## The Explanation

The core of the issue lies in how TypeScript performs type inference with generic type parameters, especially when they have constraints.
When TypeScript performs type inference with conditional types, it follows this process:

1. **Sees the constraint**: `BuildableSchema<TOptions extends CommonOptions, ...>`
2. **Checks compatibility**: `StringSchema<DefaultCommonOptions>` extends `BuildableSchema<TOptions>`? ✅ Yes
3. **Figures out inference options**: 
    Could either infer `DefaultCommonOptions` (narrow) or `CommonOptions` (wide)
4. **Picks the constraint**: Without structural evidence, TypeScript widens to `CommonOptions`


This is what's known as constraint-bound inference, or more commonly, type widening during inference. TypeScript doesn't have enough structural evidence to preserve the more specific type, so it defaults to the broader constraint.

Since `BuildableSchema` has no properties that actually use `TOptions`, TypeScript sees no structural reason to preserve the specific type. From its perspective, both `DefaultCommonOptions` and `CommonOptions` satisfy the constraint equally well, so it chooses the more general type.

## The Solution: Phantom Type Properties

The solution is to add a phantom type property that depends on the generic type parameter. This creates a structural dependency, a "witness" if you will, that forces TypeScript to preserve the specific type during inference. With this property in place, TypeScript can no longer widen the type to the constraint because doing so would break the structural compatibility.

```ts
interface BuildableSchema<TOutput, TInput, TOptions extends CommonOptions> {
  parse(input: unknown): TOutput;
  '~types'?: {
    options: TOptions;  // 👈 This forces exact type preservation!
    output: TOutput;
    input: TInput;
  };
}
```

The property is marked optional (`?`) and is never assigned at runtime, hence the term "phantom". It exists purely at the type level to guide TypeScript's inference and help it "remember" the specific type.

Now when the options type is extracted:

```ts
const mySchema = string();
type Options = ExtractOptions<typeof mySchema>;
//   ^? Options = DefaultCommonOptions ✅
```

TypeScript correctly preserves `DefaultCommonOptions` because the `'~types'` property creates structural evidence that requires the exact type to be maintained.

## Closing Thoughts

This subtle behavior caught me off guard because it's not immediately obvious when looking at the code. The schema had the correct type, `typeof mySchema` showed the right generic parameters, but conditional type inference still widened to the constraint. Understanding that TypeScript needs structural evidence to preserve specific types during inference was a crucial insight.

This pattern of using phantom properties isn't unique to Narro. It's used by many popular libraries like :SLink{text="zod" to="https://www.github.com/colinhacks/zod/"}, :SLink{text="valibot" to="https://www.github.com/valibot/valibot/"}, and others that rely heavily on type-level programming. It's a fundamental technique when building libraries that need to preserve precise type information through complex generic operations.

Building Narro has been full of these kinds of discoveries about TypeScript's type system. I look forward to sharing more of these learnings in future posts. Stay tuned!