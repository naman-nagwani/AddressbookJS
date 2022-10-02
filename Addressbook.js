class Contact {
    firstName;
    lastName;
    address;
    city;
    state;
    zip;
    phoneNumber;
    email;

    constructor(firstName, lastName, address, city, state, zip, phoneNumber, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
}

function addContact(firstName, lastName, address, city, state, zip, phoneNumber, email, addressBook) {
    
    newBook = addressBook.filter(contact => contact.firstName === firstName && contact.lastName === lastName);

    newBook.reduce( () => countContacts++, countContacts = 0);

    if (countContacts > 0) {
        console.log(" ERROR: Duplicate entry! Not entering into address book");
        return addressBook;
    }

    check = true;
    check = check && nameCheck.test(firstName);
    check = check && nameCheck.test(lastName);
    check = check && addressCityStateCheck.test(address);
    check = check && addressCityStateCheck.test(city);
    check = check && addressCityStateCheck.test(state);
    check = check && zipCheck.test(zip);
    check = check && phoneCheck.test(phoneNumber);
    check = check && emailCheck.test(email);

    if(check == true) {
        newContact = new Contact(firstName, lastName, address, city, state, zip, phoneNumber, email);
        addressBook.push(newContact);
        console.log(" Contact entered successfully");
    }
    else {
        console.log(" Please enter valid details!");
    }

    return addressBook;

}

function findContact(firstName, lastName, addressBook) {

    foundContact = null;
    addressBook.forEach(contact => {
        if (contact.firstName === firstName) {
            if (contact.lastName === lastName) {
                foundContact = contact;
            }
        }
    });

    if (foundContact == null) {
        console.log(" The contact was not found!");
    }

    return foundContact;
    
}

function editContact(addressBook, firstName, lastName, option, newValue) {
    contact = findContact(firstName, lastName, addressBook);

    if(contact == null) {
        console.log(" the contact we got was null");
        return null;
    }

    if (option === "address") {
        contact.address = newValue;
    }
    else if (option === "city") {
        contact.city = newValue;
    }
    else if (option === "state") {
        contact.state = newValue;
    }
    else if (option === "zip") {
        contact.zip = newValue;
    }
    else if (option === "phone") {
        contact.phoneNumber = newValue;
    }
    else if (option === "email") {
        contact.email = newValue;
    }

    return contact;

}

function deleteContact(addressBook, firstName, lastName) {
    contact = findContact(firstName, lastName, addressBook);
    index = addressBook.indexOf(contact);

    if (index > -1) {
        addressBook.splice(index, 1);
        console.log(" Deleted element");
    }

    return addressBook;
    
}

function count(addressBook) {
    
    addressBook.reduce( () => { 
        countContacts++;
    }, countContacts = 0);
    
    return countContacts;
}

function searchCityState(addressBook, option, cityState) {
    
    if (option === "city") {
        return addressBook.filter( contact => contact.city === cityState).map(contact => contact.firstName);
    }
    
    else {
        return addressBook.filter( contact => contact.state === cityState).map(contact => contact.firstName);
    }
}

function viewCityState(addressBook, option, cityState) {
    
    if (option === "city") {
        return addressBook.filter( contact => contact.city === cityState);
    }
    
    else {
        return addressBook.filter( contact => contact.state === cityState);
    }
}

function countCityState(addressBook, option) {
    
    cityState = new Map();

    addressBook.forEach( (contact) => {
        if (option === "city") {
            if (cityState.get(contact.city) == null) {
                cityState.set(contact.city, 1);
            }
            else {
                cityState.set(contact.city, contact.get(cityState) + 1);
            }
        }
        else {
            if (cityState.get(contact.state) == null) {
                cityState.set(contact.state, 1);
            }
            else {
                cityState.set(contact.state, contact.get(cityState) + 1);
            }
        }
    });

    return cityState
}

function sortContacts(addressBook, option) {
    return addressBook.sort( (contact1, contact2) => {

        if (option === "name") {
            first = contact1.firstName;
            second = contact2.firstName;
        }

        else if (option === "city") {
            first = contact1.city;
            second = contact2.city;
        }

        else if (option === "state") {
            first = contact1.state;
            second = contact2.state;
        }

        else if (option === "zip") {
            first = contact1.zip;
            second = contact2.zip;
        }

        if (first < second) {
            return -1;
        }

        else if (first > second) {
            return 1;
        }

        else {
            return 0;
        }
    });
}

console.log(" the program has started\n");

nameCheck = new RegExp("^[A-Z][a-z]{2,}$");
addressCityStateCheck = new RegExp("^[a-z A-Z]{4,}$");
emailCheck = new RegExp("^[\\w+-]+(\\.[\\w-]+)*@[^_\\W]+(\\.[^_\\W]+)?(?=(\\.[^_\\W]{3,}$|\\.[a-zA-Z]{2}$)).*$");
phoneCheck = new RegExp("^[0-9]{1,3}[\\s][0-9]{10}$");
zipCheck = new RegExp("^[0-9]{3,6}$")

addressBook = [];

addressBook = addContact("John", "Doe", "United States", "San Fransisco", "California", 12349, "91 1234567899", "hey@gmail.com", addressBook);
addressBook = addContact("David", "Alapat", "india", "thrissur", "kerala", 1234, "91 1212341234", "hi@gmail.com", addressBook);
addressBook = addContact("David", "Alapat", "india", "thrissur", "kerala", 1234, "91 1212341234", "hi@gmail.com", addressBook);
console.log(addressBook);

console.log(sortContacts(addressBook, "zip"));

console.log(countCityState(addressBook, "city"));
console.log(countCityState(addressBook, "state"));

editContact(addressBook, "David", "Alapat", "address", "oman");
console.log(addressBook);
console.log("\n Count of contacts = ", count(addressBook) );

addressBook = deleteContact(addressBook, "David", "Alapat");
console.log(addressBook);
console.log(" Count of contacts = ", count(addressBook) );

console.log(searchCityState(addressBook, "city", "thrissur"));
console.log(searchCityState(addressBook, "state", "California"));

console.log(viewCityState(addressBook, "state", "California"));