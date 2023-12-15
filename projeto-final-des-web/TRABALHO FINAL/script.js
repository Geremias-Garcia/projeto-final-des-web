document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://rickandmortyapi.com/api/character";
    const characterCardsContainer = document.getElementById("character-cards");
    const characterForm = document.getElementById("character-form");

    let lastId = 0; 

    function fetchCharacterData() {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => displayCharacterCards(data.results))
            .catch((error) => console.error("Erro ao obter dados da API", error));
    }

    function deleteCharacter(id) {
        console.log(`Personagem deletado com ID: ${id}`);
        const cardToRemove = document.getElementById(`character-card-${id}`);
        if (cardToRemove) {
            cardToRemove.remove();
        }
    }

    function findHighestId() {
        const cards = document.querySelectorAll(".character-card");
        let highestId = 0;
    
        cards.forEach((card) => {
            const cardId = parseInt(card.id.split("-")[2]);
            if (cardId > highestId) {
                highestId = cardId;
            }
        });
    
        if (lastId > highestId) {
            highestId = lastId;
        }
    
        return highestId;
    }
    

    function addCharacter(characterData) {
        const newId = findHighestId() + 1;
        console.log(newId);
    
        lastId = newId;
    
        const card = document.createElement("div");
        card.classList.add("card", "mb-3", "col-md-4", "character-card");
        card.id = `character-card-${newId}`;
    
        const formattedCharacterData = {
            id: newId,
            name: characterData.name,
            status: characterData.status,
            species: characterData.species,
            gender: characterData.gender,
            origin: { name: characterData.origin },
            location: { name: characterData.location },
            image: characterData.image,
        };
    
        card.innerHTML = `
            <img src="${formattedCharacterData.image}" class="card-img-top" alt="${formattedCharacterData.name}">
            <div class="card-body">
                <h5 class="card-title">${formattedCharacterData.name}</h5>
                <p class="card-text">Status: ${formattedCharacterData.status}</p>
                <p class="card-text">Espécie: ${formattedCharacterData.species}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Gender: ${formattedCharacterData.gender}</li>
                <li class="list-group-item">Origin: ${formattedCharacterData.origin.name}</li>
                <li class="list-group-item">Location: ${formattedCharacterData.location.name}</li>
            </ul>
            <div class="card-body">
                <button class="btn btn-danger delete-btn" data-character-id="${newId}">Deletar</button>
            </div>
        `;
    
        characterCardsContainer.appendChild(card);
    
        const deleteButton = card.querySelector(".delete-btn");
        if (deleteButton) {
            deleteButton.addEventListener("click", () => deleteCharacter(newId));
        }
    }
    
    

    function displayCharacterCards(characters) {
        characters.forEach((character) => {
            const card = document.createElement("div");
            card.classList.add("card", "mb-3", "col-md-4", "character-card");
            card.id = `character-card-${character.id}`; 

            card.innerHTML = `
                <img src="${character.image}" class="card-img-top" alt="${character.name}">
                <div class="card-body">
                    <h5 class="card-title">${character.name}</h5>
                    <p class="card-text">Status: ${character.status}</p>
                    <p class="card-text">Espécie: ${character.species}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Gender: ${character.gender}</li>
                    <li class="list-group-item">Origin: ${character.origin.name}</li>
                    <li class="list-group-item">Location: ${character.location.name}</li>
                </ul>
                <div class="card-body">
                    <button class="btn btn-danger delete-btn" data-character-id="${character.id}">Deletar</button>
                </div>
            `;

            characterCardsContainer.appendChild(card);

            const deleteButton = card.querySelector(".delete-btn");
            if (deleteButton) {
                deleteButton.addEventListener("click", () => deleteCharacter(character.id));
            }
        });
    }

    function handleFormSubmit(event) {
        event.preventDefault();
    
        const name = document.getElementById("character-name").value;
        const image = document.getElementById("character-image").value;
        const species = document.getElementById("character-species").value;
        const status = document.getElementById("character-status").value;
        const gender = document.getElementById("character-gender").value;
        const origin = document.getElementById("character-origin").value;
        const location = document.getElementById("character-location").value;
    
        const isValid = validarDados(name, image, species, status, gender, origin, location);
    
        if (isValid) {
            const newId = findHighestId() + 1;
            const newCharacter = { id: newId, name, image, species, status, gender, origin, location };
            addCharacter(newCharacter);
    
            console.log("Novo personagem adicionado:");
            console.log(JSON.stringify(newCharacter, null, 2));
    
            characterForm.reset();
        }
    }
    

    function validarDados(name, image, species, status, gender, origin, location) {
        let control = true;

        document.getElementById("character-name").style.backgroundColor = "";
        document.getElementById("character-image").style.backgroundColor = "";
        document.getElementById("character-species").style.backgroundColor = "";
        document.getElementById("character-status").style.backgroundColor = "";
        document.getElementById("character-gender").style.backgroundColor = "";
        document.getElementById("character-origin").style.backgroundColor = "";
        document.getElementById("character-location").style.backgroundColor = "";

        if (name.trim() == "") {
            document.getElementById("character-name").style.backgroundColor = "red";
            control = false;
        }

        if (image.trim() == "") {
            document.getElementById("character-image").style.backgroundColor = "red";
            control = false;
        }

        if (species.trim() == "") {
            document.getElementById("character-species").style.backgroundColor = "red";
            control = false;
        }

        if (status.trim() == "") {
            document.getElementById("character-status").style.backgroundColor = "red";
            control = false;
        }

        if (gender.trim() == "") {
            document.getElementById("character-gender").style.backgroundColor = "red";
            control = false;
        }

        if (origin.trim() == "") {
            document.getElementById("character-origin").style.backgroundColor = "red";
            control = false;
        }

        if (location.trim() == "") {
            document.getElementById("character-location").style.backgroundColor = "red";
            control = false;
        }

        return control;
    }

    characterForm.addEventListener("submit", handleFormSubmit);

    fetchCharacterData();
});
