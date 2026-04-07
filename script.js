const cards = document.querySelectorAll('.nail-card');
const confirmBtn = document.getElementById('confirmBtn');
const modal = document.getElementById('modal');
const selectedStyleText = document.getElementById('selectedStyleName');
const waLink = document.getElementById('waLink');

// Lightbox elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const nailImages = document.querySelectorAll('.nail-image');
const lightboxSelectBtn = document.getElementById('lightboxSelectBtn');

let selectedStyle = null;
let currentLightboxCard = null; // Keeps track of which card is being viewed in the lightbox

// Add click event to each card (clicking the white area/title)
cards.forEach(card => {
    card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedStyle = card.getAttribute('data-style');
        
        confirmBtn.disabled = false;
        confirmBtn.innerText = "Confirm Choice 💅";
    });
});

// Add click event to IMAGES to open the lightbox
nailImages.forEach(img => {
    img.addEventListener('click', (e) => {
        e.stopPropagation(); // Stops the card from being selected immediately
        currentLightboxCard = img.closest('.nail-card'); // Remember which card this image belongs to
        lightboxImg.src = img.src; // Put the clicked image into the lightbox
        lightbox.classList.add('active'); // Show the lightbox
    });
});

// Handle the "Select This Style" button inside the lightbox
lightboxSelectBtn.addEventListener('click', () => {
    if (currentLightboxCard) {
        currentLightboxCard.click(); // Programmatically click the card to select it
    }
    lightbox.classList.remove('active'); // Close the lightbox
});

// Close lightbox when clicking the 'X' button
lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

// Close lightbox when clicking anywhere on the dark background
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
        lightbox.classList.remove('active');
    }
});

// Handle confirm button click (The main button at the bottom)
confirmBtn.addEventListener('click', () => {
    if (selectedStyle) {
        // Update text in modal
        selectedStyleText.innerText = selectedStyle;
        
        // Create the pre-written message
        const message = `${selectedStyle}`;
        
        // Encode the message so it works in a URL
        const encodedMessage = encodeURIComponent(message);
        
        // Set up the link for WhatsApp
        waLink.href = `https://api.whatsapp.com/send?phone=85260805756&text=${encodedMessage}!This%20%F0%9F%91%8D%F0%9F%8F%BD`;

        // Show Modal
        modal.classList.add('active');
    }
});

// Function to close the success modal
function closeModal() {
    modal.classList.remove('active');
    
    // Reset selection after closing
    cards.forEach(c => c.classList.remove('selected'));
    selectedStyle = null;
    confirmBtn.disabled = true;
    confirmBtn.innerText = "Pick one first!";
}