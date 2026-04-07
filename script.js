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
let currentLightboxCard = null; 

// Add click event to each card (clicking the white area/title)
cards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove 'selected' class from all cards
        cards.forEach(c => c.classList.remove('selected'));
        
        // Add 'selected' class to the clicked card
        card.classList.add('selected');
        selectedStyle = card.getAttribute('data-style');
        
        // Enable the confirm button and change its text
        confirmBtn.disabled = false;
        confirmBtn.innerText = "Confirm Choice 💅";
        
        // --- NEW FEATURE: Scroll smoothly to the confirm button ---
        // 'block: center' ensures the button appears nicely in the middle of the screen
        setTimeout(() => {
            confirmBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150); // A tiny 150ms delay makes the scroll feel more natural after the click
    });
});

// Add click event to IMAGES to open the lightbox
nailImages.forEach(img => {
    img.addEventListener('click', (e) => {
        e.stopPropagation(); // Stops the card from being selected immediately
        currentLightboxCard = img.closest('.nail-card'); 
        lightboxImg.src = img.src; 
        lightbox.classList.add('active'); 
    });
});

// Handle the "Select This Style" button inside the lightbox
lightboxSelectBtn.addEventListener('click', () => {
    if (currentLightboxCard) {
        currentLightboxCard.click(); // This will trigger the card click event (and the auto-scroll!)
    }
    lightbox.classList.remove('active'); 
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

// Handle confirm button click 
confirmBtn.addEventListener('click', () => {
    if (selectedStyle) {
        selectedStyleText.innerText = selectedStyle;
        
        const message = `Hey! ${selectedStyle} looks good!😏👍🏽`;
        const encodedMessage = encodeURIComponent(message);
        
        waLink.href = `https://api.whatsapp.com/send?phone=85260805756&text=${encodedMessage}`;

        modal.classList.add('active');
    }
});

// Function to close the success modal
function closeModal() {
    modal.classList.remove('active');
    
    cards.forEach(c => c.classList.remove('selected'));
    selectedStyle = null;
    confirmBtn.disabled = true;
    confirmBtn.innerText = "Pick one first!";
    
    // Optional!!: Scroll back to the top when closing the modal
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
