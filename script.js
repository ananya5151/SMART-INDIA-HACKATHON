document.addEventListener("DOMContentLoaded", function () {
    const gameImages = document.getElementById("game-images");
    const avatarImages = document.getElementById("avatar-images");
    const selectedAvatarMessage = document.getElementById("selected-avatar-message");
    const messageAvatar = document.getElementById("message-avatar");
    const messageContent = document.getElementById("message-content");

    const avatars = {
        avatar1: {
            name: "NINA",
            image: "Untitled design (3).svg",
        },
        avatar2: {
            name: "JACK",
            image: "Untitled design (5).svg",
        },
        avatar3: {
            name: "ZIVA",
            image: "Untitled design (4).svg",
        },
        avatar4: {
            name: "NILL",
            image: "Untitled design (6).svg",
        },
    };

    function loadAvatar(selectedAvatar) {
        // Hide avatar images
        avatarImages.innerHTML = '';
        // Hide the message
        selectedAvatarMessage.classList.remove("hidden");

        // Show selected avatar in the message
        const avatarData = avatars[selectedAvatar];
        messageAvatar.src = avatarData.image;
        messageAvatar.alt = avatarData.name;
        messageContent.textContent = `YAY! YOU ARE NOW ${avatarData.name}`;
    }

    function loadGame(gameURL) {
        // Hide avatar images
        avatarImages.innerHTML = '';
        // Hide the message
        selectedAvatarMessage.classList.add("hidden");

        // Show selected game
        avatarImages.innerHTML += `<img src="${gameURL}" alt="Selected Game" class="game-image">`;
    }

    // Add event listeners for the avatar buttons
    avatarImages.addEventListener("click", function (e) {
        const avatarButton = e.target.closest(".avatar-button");
        if (avatarButton) {
            const selectedAvatar = avatarButton.getAttribute("data-avatar");
            // Show the selected avatar in the message and remove game
            loadAvatar(selectedAvatar);
        }
    });

    gameImages.addEventListener("click", function (e) {
        const selectedGame = e.target.closest(".game");
        if (selectedGame) {
            const gameImageURL = selectedGame.getAttribute("data-game");
            // Show selected game and remove avatar
            loadGame(gameImageURL);
        }
    });
});
