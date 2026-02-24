#

### 1. What is the difference between getElementById, getElementsByClassName, querySelector and querySelectorAll?

- getElementById() selects only ONE element using its id. For this assignment I used it to get elements like jobList and dashboard counts.

- getElementsByClassName() selects MANY elements using a class name.

- querySelector() selects the FIRST matching element.

- querySelectorAll() selects ALL matching elements.In this assignment, I used:
document.querySelectorAll("[data-tab]") to select all tab buttons (All, Interview, Rejected) together.

### 2. How do you create and insert a new element into the DOM?

I created a new element by - document.createElement("div").Then I added HTML inside that element. After that, I inserted it into the page using: jobList.appendChild(div). Byn this I can create every job card dynamically instead of writing cards directly in HTML.

### 3. What is Event Bubbling? And how does it work?

Event Bubbling means if a a child element is clicked, the event automatically moves upward to its parent.
ex:
If I click a button inside a job card, the event goes:
from Button to Card then to Body.

### 4. What is Event Delegation in JavaScript? Why is it useful?

Event Delegation means using one event handler to manage many elements.
In my assignment, I used querySelectorAll to handle all tab buttons at once instead of writing separate listeners.

It is useful because:
- It reduces code
- It improves performance
- It works well with dynamically created elements

### 5. What is the difference between preventDefault() and stopPropagation()?

preventDefault() stops the browser’s default behavior.
Example: stopping a form from submitting.

stopPropagation() stops the event from moving to parent elements.
Example: stopping a click event from bubbling upward.

Simple difference:

preventDefault() is used to stops browser action  
stopPropagation() is used to stops event bubbling  
