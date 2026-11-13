document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ 1. Script loaded successfully!");
    
    const thumbnails = document.querySelectorAll('.thumb');
    console.log("✅ 2. Found this many thumbnails:", thumbnails.length);
    
    thumbnails.forEach(function(thumb) {
        thumb.addEventListener('click', function() {
            console.log("✅ 3. Thumbnail clicked! New source:", this.src);
            
            const gallery = this.closest('.gallery-container');
            const mainImg = gallery.querySelector('.main-image img');
            
            // Change the main image
            mainImg.src = this.src;
            mainImg.alt = this.alt;
            
            // Remove 'active' class from all thumbnails in this gallery
            const allThumbs = gallery.querySelectorAll('.thumb');
            allThumbs.forEach(function(t) {
                t.classList.remove('active');
            });
            
            // Add 'active' class to clicked thumbnail
            this.classList.add('active');
        });
    });
});


/* =========================================
   HOME PAGE COLLAGE SWAPPER
   ========================================= */

// 1. List all your project images here
const projectImages = [
    'images/Pr_Arch_NZB_1.jpg',
    'images/Pr_Arch_NZB_2.jpg',
    'images/Pr_Arch_NZB_5.jpg',
    'images/Pr_Arch_NZB_7.jpg',
    'images/Pr_Arch_NZB_10.jpg',
    'images/Pr_Arch_NZB_15.jpg',
    'images/Pr_Arch_NZB_16.jpg',
    'images/Pr_Arch_OP_1.jpg',
    'images/Pr_Arch_OP_3.jpg',
    'images/Pr_Arch_OP_4.jpg',
    'images/Pr_Wood_WB_1.jpg',
    'images/Pr_Wood_WB_2.jpg',
    'images/Pr_Wood_WB_3.jpg',
    'images/Pr_Wood_WB_7.jpg',
    'images/Pr_Wood_WB_9.jpg',
    'images/Pr_Wood_ES_1.jpg',
    'images/Pr_Wood_ES_3.jpg',
    'images/Pr_Wood_ES_7.jpg',
    'images/Pr_Wood_ES_9.jpg',
    'images/Pr_Wood_WF_4.jpg',
    'images/Pr_Wood_WF_5.jpg',
    'images/Pr_PMDL_M&S_1.jpg',
    'images/Pr_SBrdg_M&S_1.jpg'
];

function swapRandomImage() {
    const collageImages = document.querySelectorAll('.collage-img');
    if (collageImages.length === 0) return;

    // 1. Get current filenames in the grid
    const currentFilenames = Array.from(collageImages).map(img => {
        // Extract just the filename (e.g., "images/Pr_Arch...") from the full URL
        return img.getAttribute('src');
    });

    // 2. Pick a random slot to change
    const slotIndex = Math.floor(Math.random() * collageImages.length);
    const targetImg = collageImages[slotIndex];

    // 3. Find a unique image
    let availableImages = projectImages.filter(src => !currentFilenames.includes(src));
    
    // If all images are used (unlikely with 14 imgs and 9 slots), just use the whole list
    if (availableImages.length === 0) {
        availableImages = projectImages;
    }

    // Pick a random one from the available (unique) list
    const newSrc = availableImages[Math.floor(Math.random() * availableImages.length)];

    // 4. Swap with fade
    targetImg.style.opacity = 0;

    setTimeout(() => {
        targetImg.src = newSrc;
        targetImg.style.opacity = 1;
    }, 500);
}

// Run every 3 seconds
setInterval(swapRandomImage, 3000);