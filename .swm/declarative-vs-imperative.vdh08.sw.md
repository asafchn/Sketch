---
id: vdh08
title: Declarative vs Imperative
file_version: 1.1.2
app_version: 1.8.5
---

## What is Declarative vs Imperative programming?:

* * *

<br/>

In order to us to understand why Declarative programming is important, we first needs to understand the two types of programming styles

<br/>

## Real world analogy:

Let's imagine a situation where I - Asaf wants to get a drink in a bar

in an Imperative world I would go to the counter and say

1.  Go to the shelf

2.  Pick up a glass

3.  Go to the keg

4.  Pour beer to the cup until it is full

5.  Hand me the beer

in a Declarative world I would just say: "Beer, please"<br/>
and the step I mentioned above will be handled by the bartender who just realized I want beer

<br/>

## How it translate to code:

Let's take the example I mentioned and turn it into code

<br/>

Let's first have our state

```javascript
const state = {
	drink:null,
}
```

### Imperative:

So this functions is fairly simple, it creates an instance of glass, it fills it with the drink we ask<br/>
and then we set the drink in our state to that glass

```typescript
function getDrinkFromTheBartender(typeOfDrink:string){
	const glass = Bartender.getGlass()
	glass.fill = Keg[drink]
	state.drink = glass.drink
	const fee = glass.fee
	Bartender.pay(fee)

}

<button @click="getDrinkFromTheBartender('beer')"> Ask for beer <button/>
```

### Declarative:

```typescript
function getDrinkFromTheBartender(typeOfDrink:string){
	const {drink,fee} = generateDrink(drink);
	payFee(fee)
	setDrink(drink)
	
}

function generateDrink(drink:string){
	const glass = Bartender.getGlass()
	glass.fill = Keg[drink]
	return {drink,fee} = glass
}

function payFee(fee:number){
	Bartender.pay(fee)
}

// This function is actually bypassing some of the declarative way rules by mutating the state. but it is implecity doing that

function setDrink(drink:Drink){
	state.drink = drink
}

<button @click="getDrinkFromTheBartender('beer')">Ask for beer</button>
```

**So what exactly is going on here?**

1.  In the declarative way, each function does one job. and the function we call initially job is to call the other functions

2.  The state isn't being change in that function. we call functions that retrieves the value for the state that we want. but, we set it by calling an implicit function that do so

3.  In the imperative way we stack all the logic to one function which in our case is quite easy to understand because the logic there isn't too complicated but for example when the function's job is for example to "Reformat all of the nodes instances in the editor to a specific data structure and setting the set to be equals to that" - it can get ultra messy

**What's the benefit of doing that?**

When someone else will have to work on that area of the codebase it will be easier for him to follow along when it is broken down to different functions,

how many times have you read a function in our code base and the function calculate data, await a promise ,change multiple states that has nothing to do with each other and overall?

It makes the function super inconvenient to work on, nor to debug if a problem occurs in it.

<br/>

<br/>

### Benefit of writing in a declarative way:

With my experience,<br/>
writing in an **imperative** **way** causes the code look super messy and complicated.

Someone who hasn't touch the area in the codebase and needs to understand what's going on there will have troubled time doing so

<br/>

**Declarative** functions are like a story being told

<br/>

we call a function that handles the story steps

each steps does it's own thing

and I'll even stress it further. if the component is a wrapper component that handles a lot of code (such as our tiptapEditor)

Split every big block of code into it's own file

so for example the **Reformat all of the nodes instances** example I mentioned earlier would have it's own file for doing so, a service.

<br/>

It will

1.  Make the code less messy.

2.  Helps onboarding people to the area of the code

3.  Easier to debug.

4.  Easier to maintain.
<br/>

For example in debugging the two functions:

Let's just say the code is written in the codeblock is ultra complicated with api calls for loops etc etc and isn't convenient

**In the Imperative way:**

we will put a debugger under each line and go one by one till the error occurs

```
function getDrinkFromTheBartender(typeOfDrink:string){
	const glass = Bartender.getGlass()
	debugger
	glass.fill = Keg[drink]
	debugger	
	state.drink = glass.drink
	const fee = glass.fee
	debugger	
	Bartender.pay(fee)
	debugger
}
```

**In the Declarative way:**

I'll call a debugger after each function call,

that way I'll easily eliminate 66% of the possibilities in one run

and ill be able to focus on the one function that the problem occurs inside of

```
function getDrinkFromTheBartender(typeOfDrink:string){
	const {drink,fee} = generateDrink(drink);
	debugger
	payFee(fee)
	debugger
	setDrink(drink)
	debugger
	
}
```

<br/>

This file was generated by Swimm. [Click here to view it in the app](https://app.swimm.io/repos/Z2l0aHViJTNBJTNBU2tldGNoJTNBJTNBYXNhZmNobg==/docs/vdh08).
