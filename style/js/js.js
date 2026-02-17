// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('toggle');

    // Animate Links
    navItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navItemFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Close mobile menu when clicking a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('toggle');
            navItems.forEach(link => {
                link.style.animation = '';
            });
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header scroll effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Donation Modal Functionality
const donateBtns = document.querySelectorAll('.donate-btn');
const modal = document.getElementById('donationModal');
const closeModal = document.querySelector('.close-modal');
const confirmBtn = document.querySelector('.confirm-donation');
const appreciationMsg = document.querySelector('.appreciation-message');

// Function to open modal
function openDonationModal(e) {
    if (e) e.preventDefault();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    appreciationMsg.style.display = 'none';
    confirmBtn.style.display = 'block';

    // Remove any existing close buttons
    const existingCloseBtn = document.querySelector('.close-after-donation');
    if (existingCloseBtn) existingCloseBtn.remove();
}

// Function to close modal
function closeDonationModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Add event listeners to all donate buttons
donateBtns.forEach(btn => {
    btn.addEventListener('click', openDonationModal);
});

// Close modal when X is clicked
closeModal.addEventListener('click', closeDonationModal);

// Show appreciation when confirm button is clicked
confirmBtn.addEventListener('click', () => {
    confirmBtn.style.display = 'none';
    appreciationMsg.style.display = 'block';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'btn btn-primary close-after-donation';
    closeBtn.textContent = 'Close';
    closeBtn.style.marginTop = '1rem';
    closeBtn.style.width = '100%';

    closeBtn.addEventListener('click', closeDonationModal);
    appreciationMsg.after(closeBtn);
});

// Close modal when clicking outside content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeDonationModal();
    }
});

// Volunteer Modal Functionality
const volunteerBtns = document.querySelectorAll('.btn-secondary[href="#volunteer"], .volunteer-btn');
const volunteerModal = document.getElementById('volunteerModal');
const volunteerForm = document.getElementById('volunteerForm');

// Open volunteer modal
volunteerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        volunteerModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

// Close volunteer modal
volunteerModal.querySelector('.close-modal').addEventListener('click', () => {
    volunteerModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Volunteer Form Submission to WhatsApp
document.getElementById('volunteerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Collect form data
    const formData = {
        name: document.getElementById('volunteerName').value,
        email: document.getElementById('volunteerEmail').value,
        phone: document.getElementById('volunteerPhone').value,
        address: document.getElementById('volunteerAddress').value,
        over18: document.querySelector('input[name="over18"]:checked').value,
        education: document.getElementById('volunteerEducation').value,
        profession: document.getElementById('volunteerProfession').value,
        message: document.getElementById('volunteerMessage').value
    };

    // Format WhatsApp message
    const whatsappMessage =
        `*NEW VOLUNTEER APPLICATION*\n\n` +
        `*Name:* ${formData.name}\n` +
        `*Email:* ${formData.email}\n` +
        `*Phone:* ${formData.phone}\n` +
        `*Address:* ${formData.address}\n` +
        `*Over 18?* ${formData.over18}\n` +
        `*Education:* ${formData.education}\n` +
        `*Profession:* ${formData.profession}\n\n` +
        `*Volunteer Interest:*\n${formData.message}\n\n` +
        `I look forward to contributing to Bright Bloom Girls Foundation!`;

    // Encode for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappNumber = "2347089941644";

    // Open WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');

    // Close modal and reset
    document.getElementById('volunteerModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    this.reset();
});

// Close when clicking outside
volunteerModal.addEventListener('click', (e) => {
    if (e.target === volunteerModal) {
        volunteerModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Story Modal Functionality
const storyModal = document.getElementById('storyModal');

// Use event delegation instead of forEach
document.addEventListener('click', function (e) {
    // Open story modal when "Read More" button is clicked
    if (e.target.classList.contains('open-modal-btn')) {
        e.preventDefault();
        if (storyModal) {
            storyModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    // Close story modal when close button is clicked
    if (e.target.classList.contains('close-modal') && e.target.closest('#storyModal')) {
        storyModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Close modal when clicking outside
    if (e.target === storyModal) {
        storyModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Gallery Modal Functionality
const galleryModal = document.getElementById('galleryModal');
const galleryModalTitle = document.getElementById('galleryModalTitle');
const galleryModalGrid = document.getElementById('galleryModalGrid');
const galleryItems = document.querySelectorAll('.gallery-item');
const visibleGalleryItems = document.querySelectorAll('.gallery-item.visible-item');

// Video Modal Elements
const videoModal = document.getElementById('videoModal');
const videoModalPlayer = document.getElementById('videoModalPlayer');
const videoModalTitle = document.getElementById('videoModalTitle');
const videoModalDescription = document.getElementById('videoModalDescription');

// Function to open gallery modal with filtered images
function openGalleryModal(tag) {
    const filteredItems = Array.from(galleryItems).filter(item =>
        item.dataset.tag === tag && item.querySelector('img')
    );

    galleryModalGrid.innerHTML = '';
    galleryModalTitle.textContent = `${tag} Gallery`;

    filteredItems.forEach(item => {
        const img = item.querySelector('img');
        const video = item.querySelector('video');
        const description = item.dataset.description;

        // Skip items that have no visible image (commented out or missing)
        if (!img && !video) return;

        const modalItem = document.createElement('div');
        modalItem.className = 'gallery-modal-item';

        if (img) {
            modalItem.innerHTML = `
            <img src="${img.src}" alt="${img.alt}">
            <div class="gallery-modal-item-caption">${description}</div>
        `;
        } else if (video) {
            modalItem.innerHTML = `
            <video src="${video.src}" controls style="width:100%;"></video>
            <div class="gallery-modal-item-caption">${description}</div>
        `;
        }

        galleryModalGrid.appendChild(modalItem);
    });

    galleryModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Function to close gallery modal
function closeGalleryModal() {
    galleryModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Function to open video modal
function openVideoModal(src, title, description) {
    videoModalPlayer.src = src;
    videoModalTitle.textContent = title || 'Video';
    videoModalDescription.textContent = description || '';
    videoModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Function to close video modal
function closeVideoModal() {
    videoModalPlayer.pause();
    videoModalPlayer.src = '';
    videoModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Click handler for visible gallery items
visibleGalleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const video = item.querySelector('video');
        if (video) {
            // It's a video item — open video modal
            openVideoModal(
                video.src,
                item.dataset.tag,
                item.dataset.description
            );
        } else {
            // It's an image item — open gallery modal
            openGalleryModal(item.dataset.tag);
        }
    });
});

// Close gallery modal
galleryModal.querySelector('.close-modal').addEventListener('click', closeGalleryModal);
galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) closeGalleryModal();
});

// Close video modal
videoModal.querySelector('.close-modal').addEventListener('click', closeVideoModal);
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
});