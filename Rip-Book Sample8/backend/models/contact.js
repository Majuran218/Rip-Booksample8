// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Clear previous errors
            clearErrors();
            
            try {
                // Send data to PHP backend
                const response = await fetch('backend/contact.php', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    // Show success message
                    showNotification('success', data.message || 'Message sent successfully!');
                    contactForm.reset();
                } else {
                    // Show error messages
                    if (data.errors) {
                        data.errors.forEach(error => {
                            showNotification('error', error);
                        });
                    } else {
                        showNotification('error', data.message || 'An error occurred. Please try again.');
                    }
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification('error', 'Network error. Please try again.');
            } finally {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Helper function to clear errors
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(el => el.remove());
    }
    
    // Helper function to show notifications
    function showNotification(type, message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.right = '20px';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '5px';
        notification.style.color = '#fff';
        notification.style.zIndex = '9999';
        notification.style.animation = 'slideIn 0.3s ease';
        
        if (type === 'success') {
            notification.style.backgroundColor = '#4CAF50';
        } else {
            notification.style.backgroundColor = '#f44336';
        }
        
        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add to document
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
                style.remove();
            }, 300);
        }, 5000);
    }
    
    // Optional: Real-time form validation
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        let error = '';
        
        if (field.hasAttribute('required') && !value) {
            error = `${field.placeholder || 'This field'} is required`;
        }
        
        if (field.type === 'email' && value && !isValidEmail(value)) {
            error = 'Please enter a valid email address';
        }
        
        // Remove existing error
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) existingError.remove();
        
        // Add new error if exists
        if (error) {
            field.style.borderColor = '#f44336';
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = error;
            errorDiv.style.color = '#f44336';
            errorDiv.style.fontSize = '12px';
            errorDiv.style.marginTop = '5px';
            field.parentNode.appendChild(errorDiv);
        } else {
            field.style.borderColor = '#ddd';
        }
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});