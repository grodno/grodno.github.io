# Introduction

## Definitions	

`Armatura` is a general-purpose declarative-style tool to define and compose components of any nature.

It is   
 - declarative-first, thus almost codeless
 - reactive and functional oriented
 - non-obtrusive, platform-independent
 - easy to learn and get started. 
 - well-suited to develop wide range of applications

## Audience	

- Newbie, amateurs, students - to dig into easy and fast.
- Professional developers, start-upers - to adopt, simplify and unify their creatures using one single declarative language.

# Glossary

`Program` it is formal presciption given to some runtime engine to perform some data trasformation tasks on some input data, correlated over the time in given context.

`Object-oriented programming` - an approach to creation of programs, that relies on concept of composable black-boxed components interacting with each others.

`Component` is a separate program entity(instance), that 
  - _continuous_: has life-time phases and events over the time: from creation, initalization, update to destroy
  - _stateful_: behave depending on its current private state
  - _reliable_: communicate with others as defined per its public interface 
  - _composable_: can be composed with others.

`Class` is a programmatic description of components instances that are the same in its type and behavior.

`Property` of key/value pair, that exclusively owned by some component instance - only the owner can address his property by its key and has read/write access to its value.

`State` is a set of component properties, that can be initialized and changed over the time. State is usually black-boxed, but some props can be published for read/write from ouside.

`Behavior` is a specification of certain limitations and rules, that restricts both own state mutation and reaction on public methods invocations based on its current state, input messages and context.

`Interface` is set of methods names, including its signatures and expected results, that can be appied to given component from outside.

`Type` is set of limitations on property keys and possible values can be assigned to props of component.

`Composition` is a parent-child many to-one relationship between Components. Composition strongly affects life-time and scope of components that they can interact with.

`Template` is a text of formal language, that allows describe component composition and property bindig in a declarative way - focused on `what we want instead of how to do`

`Property binding` is a dependency made on given component property,that enforces runtime to instantly update the property value with result of some expression on current state.

- `Property propagation` is kind of one-way binding that pass property values unchanged from container component to its content.

`Hook` is method to be called at some specific event happens in component life-time. 

	
# Get Started and Launch

```javascript
    import {register} from 'armatura';

    register(
        [
            AppClass, // first one is the top
            Class1,
            {NAME:'Name2', TEMPLATE:'<...>'}
        ]
    ).run({
        resources:{
            key:val // to be used in placeholders
        }	
    })
```

# Templates

## Insight By Sample

```html
<template id="NavTree">
<ul class="nav">
    <li class="nav-item {item.class}" ui:for="item of data">
        <a href="#{item.id}">
            <span>{item.name}</span>
            <span ui:if={item.label} class="label label-error">{item.label}</span>
        </a>
        <NavTree ui:if={item.subs} data={item.subs} />
    </li>
</ul>
</template>
```

## Control flow 

 - x:if	
	- x:else
	- slot()
 - x:for	
	- x:empty
	- x:loading

 - x:fragment

## Reference

- attribute `x:ref="id"`	

	interpolation
	spreading
	
## Slots

Slot is a placeholder to be replaced with Component inner content

__syntax__	
```html
    <Comp>
        <SomeContent/>
        <SomeContent2/>
    </Comp>
```

```html
<div class="component template">
    <!-- <SomeContent/><SomeContent2/> will be placed here 
    instead of <x:slot/> -->
    <x:slot> 
</div>
```

#### Partial slots
```html
    <Comp>
        <Comp:key1><SomeContent1/></Comp:key1>
        <Comp:key2><SomeContent2/></Comp:key2>
        <SomeContent/>
    </Comp>
```
```html
<div class="component template">
    <!-- <SomeContent1/> will be placed here 
    instead of <x:slot/> -->
    <x:slot  key="key1">
    <div class="component template">
        <!-- <SomeContent2/> will be placed here 
        instead of <x:slot/> -->
        <x:slot key="key2"> 
    </div> 
    <!-- <SomeContent/> will be placed here 
    instead of <x:slot/> -->
    <x:slot> 
</div>
	<x:slot>
```       

	
## Dynamic tags

Dynamic tag allows to calculate tag on the fly.
    
__syntax__ `<x:tag tag="interpolationExpression" ...>`
        
## Property binding

Property propagation

__syntax__ `prop={ownerPropPath}`

String Interpolation

__syntax__ `prop="{ownerProp}text{ownerProp2}"`

Assign global resources

__syntax__ `prop={:resPathExpression}`

Using of pipes

__syntax__ `prop={expr|pipeFn1:arg1:arg2|pipeFn2:@prop2}`

## Left arrows: subscribe

Left arrow allows hot subscription to specifed property of refered component

__syntax__ `targetProp="<-ref.prop|pipes"`

### Right arrows: emit event

Right arrow create a function that emits event emit to specified 
event handler passing data payload. 

@see `Comp.onSomeAction(data, This)` for details about how it will be handled.

__syntax__ 
    
    < ... actionProp="-> ref.action|dataPipes" data-key={} data={..} >

__cases__
- `->` updates owner component with data
- `-> prop` updates givem prop of owner component with data
- `-> this.action` use keyword `this` to refer to owner component

	
## Custom components 

It is allowed to develop and register custom component classes,
to be used to create and manage light-weight component instanses.

Such instances are wrapped with each own context from internal components hierarhy built according templates and current data. 

Component code has reference to its context `this.$` and may invoke some of its useful methods, such as `up()`, `emit()`, `resource()`, `defer()`.

```javascript
class Comp1 {

    TEMPLATE(){
        return '<...>'
    }

    constructor(initialProps, $ctx) {
        // not need to assign initialProps here
        // all the initials props will be passed into $.up() just after
    }
    // life-cycle hooks
    init($)	 {
        // use defer() here if needed
        $.defer(()=> this.close())

        // can be promise as well
        return {
            prop1:'',
        }
    }
    done(){
        // rare need to override.
        // use $.defer(fn) in the most cases.
    }	
    render($, renderFn) {
        // custom rendering. very rare need to override
    }

    //    getters/setters	
    getPropPlusOne(){
        // can be promise as well
        return this.prop + 1 
    }	
    setPropPlusOne(val) {
        this.prop = val -1
    }
    someMethodDemonstratingContextUsages(){
        // reference to this instance context.
        const $ = this.$;
        // update its props state programmatically:
        //  - instant
        $.up(delta);
        //  - async delta
        $.up(promise.then(()=>delta));
        //  - async properties:
        $.up({
            prop: 'instantValue',
            propPromise: This.fetchProp(),
        });
        // - spread props
        $.up({
            '...': Promise.resolve({
                prop: 'val2'
            })
        });

        // emit event programmatically
        $.emit('other.action', data);
        // get global resource programmatically
        const res = $.resource('other.key');
    }
    // action events handler
    onSomeAction(data, This) {
        
        if (asynch) {
            return promise.then(()=>delta)
        }
        // state update delta object
        return {
            prop: data.value,
            propPromise: This.fetchProp(),
            '...': Promise.resolve({
                prop: 'val2'
            })
        }
    }
}
