// Ultra-simple loading system - guaranteed to work
console.log('Simple loading script loaded');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, starting simple loading...');
    
    // Get elements
    const preloader = document.getElementById('preloader');
    const mainContent = document.querySelector('main');
    const progressBar = document.getElementById('progressBar');
    const percentageCounter = document.getElementById('percentageCounter');
    
    console.log('Preloader found:', !!preloader);
    console.log('Main content found:', !!mainContent);
    console.log('Progress bar found:', !!progressBar);
    console.log('Percentage counter found:', !!percentageCounter);
    
    // Animate progress bar and percentage counter
    if (progressBar && percentageCounter) {
        let progress = 0;
        const interval = setInterval(function() {
            progress += 1;
            progressBar.style.width = progress + '%';
            percentageCounter.textContent = progress + '%';
            
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 30); // Update every 30ms for smooth animation
    }
    
    // Simple 3-second timer
    setTimeout(function() {
        console.log('3 seconds passed, transitioning...');
        
        // Hide preloader
        if (preloader) {
            preloader.style.display = 'none';
            console.log('Preloader hidden');
        }
        
        // Show main content
        if (mainContent) {
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
            console.log('Main content shown');
        }
        
        // Ensure hero title is visible
        const titleLines = document.querySelectorAll('.title-line');
        titleLines.forEach(function(line) {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
            line.style.filter = 'blur(0px)';
        });
        console.log('Hero title made visible');
        
        console.log('Transition complete!');
    }, 3000);
});

// Also add a backup timer
setTimeout(function() {
    console.log('Backup timer triggered');
    const preloader = document.getElementById('preloader');
    const mainContent = document.querySelector('main');
    
    if (preloader && preloader.style.display !== 'none') {
        console.log('Backup: Force hiding preloader');
        preloader.style.display = 'none';
        
        if (mainContent) {
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }
        
        // Ensure hero title is visible
        const titleLines = document.querySelectorAll('.title-line');
        titleLines.forEach(function(line) {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
            line.style.filter = 'blur(0px)';
        });
    }
}, 5000);
