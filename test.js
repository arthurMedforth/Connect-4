const person = {
    firstName: "John",
    lastName : "Doe",
    id : 5566,
    fullName : function() {
    return this.firstName + " " + this.lastName;
    }
    };
let x = 1
let y = 1
x += ++y
console.log(x,y)