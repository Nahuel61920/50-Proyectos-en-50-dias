"use strict";

// contiene array de contactos y métodos
class AddressBook {
    constructor() {
        this.contacts = [];
    }
    add(info) {
        this.contacts.push(info); 
    }
    deleteAt(index) {
        this.contacts.splice(index, 1);
        addressBook.display(); // para "refrescar" las tarjetas de contacto
    }
    display() {
        const cardContainer = document.querySelector(".card-container");
        cardContainer.innerHTML = ""; // limpia contenedor
        const trashArray= document.getElementsByClassName("img-btn");

        document.getElementById("contact-form").reset(); //borra el formulario después de enviar contactos

        // loop para crear la array de formularios de tarjetas
        for (let contact of this.contacts) {
            const createDiv = document.createElement("div");
            createDiv.classList.add("card"); // dar div y clase de tarjeta
            const createP = document.createElement("p");
            const createImg = document.createElement("IMG");
            createImg.classList.add("img-btn"); // dar div y clase de img-btn
            createImg.src = "./images/baseline-delete_forever24px.svg"; // proporciona fuente de imagen

            // llena la tarjeta de la array
            createP.innerText = `Name: ${contact.name}
            Email: ${contact.email}
            Phone: ${contact.phone}
            Relationship: ${contact.relation}
            `; 

            // add elements
            cardContainer.appendChild(createDiv)
                         .appendChild(createP)
                         .appendChild(createImg);
            

            // efecto hover para la basura
            createImg.addEventListener("mouseenter", () => {
                createImg.classList.add("trash-hover");
            });
            createImg.addEventListener("mouseleave", () => {
                createImg.classList.remove("trash-hover");
            });

        };
        
        // event listener para eliminar
        for (let index = 0; index < trashArray.length; index++) {
            trashArray[index].addEventListener("click", () => {
            addressBook.deleteAt(index);
                
            });

        };

    }
}

// construir objetos para array
class Contact {
    constructor(name, email, phone, relation) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.relation = relation;
    }
}

const addressBook = new AddressBook();

// Agregar contactos para hacer clic en el botón
document.querySelector("#add-btn").addEventListener("click", () => {
    const input = document.querySelectorAll(".input-item");
    const select = document.querySelector(".select-options");
    const option = select.options[select.selectedIndex].value;
    addressBook.add(new Contact(input[0].value, input[1].value, input[2].value, option));
    
    addressBook.display();
});



