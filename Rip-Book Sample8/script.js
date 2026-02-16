







function validatefirstname() {
            const firstname = document.getElementById('firstname').value.trim();
            const firstnameError = document.getElementById('firstnameError');
            const firstnameInput = document.getElementById('firstname');
            
            // Check if name is at least 2 characters and contains only letters and spaces
            const nameRegex = /^[A-Za-z\s]{2,}$/;
            
            if (firstname === "") {
    showError(firstnameInput, firstnameError, "First name is required");
    return false;
} else if (firstname.includes(" ")) {
    showError(firstnameInput, firstnameError, "First name cannot contain spaces");
    return false;
    
} else if (!nameRegex.test(firstname)) {
    showError(firstnameInput, firstnameError, "First name must be at least 2 characters long and contain only letters");
    return false;
} else if (firstname.length > 50) {
    showError(firstnameInput, firstnameError, "First name exceeded the space of 50 characters");
    return false;
} else {
    showSuccess(firstnameInput);
    hideError(firstnameError);
    return true;
}
        }








function validateFirstName(firstName) {
    // Minimum character validation (e.g., at least 2 characters)
    if (firstName.length < 2) {
        return {
            isValid: false,
            error: "First name must be at least 2 characters long"
        };
    }
    
    // Maximum character validation (e.g., maximum 50 characters)
    if (firstName.length > 50) {
        return {
            isValid: false,
            error: "First name cannot exceed 50 characters"
        };
    }
    
    // Character validation - only letters, spaces, hyphens, and apostrophes allowed
    const nameRegex = /^[A-Za-z\s\-']+$/;
    if (!nameRegex.test(firstName)) {
        return {
            isValid: false,
            error: "First name can only contain letters, spaces, hyphens, and apostrophes"
        };
    }
    
    // Additional check: cannot be only spaces
    if (firstName.trim().length === 0) {
        return {
            isValid: false,
            error: "First name cannot be empty or contain only spaces"
        };
    }
    
    return {
        isValid: true,
        error: null
    };
}

// Example usage with HTML form
document.addEventListener('DOMContentLoaded', function() {
    const firstNameInput = document.querySelector('input[name="Firstname"]');
    
    if (firstNameInput) {
        firstNameInput.addEventListener('input', function(e) {
            const validation = validateFirstName(e.target.value);
            
            // Remove any existing error message
            const existingError = e.target.nextElementSibling;
            if (existingError && existingError.className === 'error-message') {
                existingError.remove();
            }
            
            // Add error message if validation fails
            if (!validation.isValid) {
                const errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                errorElement.style.color = 'red';
                errorElement.style.fontSize = '12px';
                errorElement.style.marginTop = '5px';
                errorElement.textContent = validation.error;
                e.target.after(errorElement);
            }
        });
    }
});

// Alternative: Separate validation functions
const FirstNameValidator = {
    // Check minimum length
    isMinLength: (name, min = 2) => {
        return name.trim().length >= min;
    },
    
    // Check maximum length
    isMaxLength: (name, max = 50) => {
        return name.trim().length <= max;
    },
    
    // Check allowed characters
    hasValidCharacters: (name) => {
        const validCharRegex = /^[A-Za-z\s\-']+$/;
        return validCharRegex.test(name);
    },
    
    // Comprehensive validation
    validate: (name) => {
        const trimmedName = name.trim();
        const errors = [];
        
        // Minimum length validation
        if (trimmedName.length < 2) {
            errors.push("First name must be at least 2 characters");
        }
        
        // Maximum length validation
        if (trimmedName.length > 50) {
            errors.push("First name must not exceed 50 characters");
        }
        
        // Character validation
        if (!/^[A-Za-z\s\-']+$/.test(trimmedName)) {
            errors.push("First name can only contain letters, spaces, hyphens, and apostrophes");
        }
        
        // Empty validation
        if (trimmedName.length === 0) {
            errors.push("First name is required");
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
};

// Usage example
function handleFormSubmit(event) {
    event.preventDefault();
    
    const firstName = document.querySelector('input[name="YourFirst Name"]').value;
    const validation = FirstNameValidator.validate(firstName);
    
    if (!validation.isValid) {
        console.log('Validation errors:', validation.errors);
        // Display errors to user
        validation.errors.forEach(error => {
            console.log(error);
        });
    } else {
        console.log('First name is valid');
        // Proceed with form submission
    }
}
















































        // DOM Elements
        const memorialForm = document.getElementById('memorialForm');
        const photoUpload = document.getElementById('photoUpload');
        const photoUploadArea = document.getElementById('photoUploadArea');
        const photoPreview = document.getElementById('photoPreview');
        const previewBtn = document.getElementById('previewBtn');
        const previewSection = document.getElementById('previewSection');
        const previewContent = document.getElementById('previewContent');
        
        // Initialize with today's date for passing date
        document.getElementById('passingDate').valueAsDate = new Date();
        
        // Set birth date to 60 years ago as a default
        const defaultBirthDate = new Date();
        defaultBirthDate.setFullYear(defaultBirthDate.getFullYear() - 60);
        document.getElementById('birthDate').valueAsDate = defaultBirthDate;
        
        // Photo upload functionality
        photoUploadArea.addEventListener('click', () => {
            photoUpload.click();
        });
        
        photoUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    photoPreview.src = e.target.result;
                    photoPreview.style.display = 'block';
                    photoUploadArea.querySelector('i').style.display = 'none';
                    photoUploadArea.querySelector('p').style.display = 'none';
                    photoUploadArea.querySelector('small').style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Preview functionality
        previewBtn.addEventListener('click', () => {
            // Get form values
            const firstName = document.getElementById('firstName').value || 'John';
            const lastName = document.getElementById('lastName').value || 'Doe';
            const birthDate = document.getElementById('birthDate').value || '1963-06-15';
            const passingDate = document.getElementById('passingDate').value || '2023-10-22';
            const relationship = document.getElementById('relationship').value || 'loved one';
            const location = document.getElementById('location').value || 'Anytown, USA';
            const memorialTitle = document.getElementById('memorialTitle').value || `In Loving Memory of ${firstName} ${lastName}`;
            const biography = document.getElementById('biography').value || 'A beloved person who touched many lives...';
            const quote = document.getElementById('quote').value || 'Gone but never forgotten.';
            
            // Format dates
            const formattedBirthDate = formatDate(birthDate);
            const formattedPassingDate = formatDate(passingDate);
            
            // Calculate age
            const age = calculateAge(birthDate, passingDate);
            
            // Create preview HTML
            const previewHTML = `
                <div style="max-width: 800px; margin: 0 auto;">
                    <h2 style="color: #2c3e50; text-align: center; margin-bottom: 20px; font-weight: 400;">${memorialTitle}</h2>
                    
                    <div style="display: flex; flex-wrap: wrap; align-items: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
                        ${photoPreview.src ? `<div style="flex: 0 0 200px; margin-right: 30px;">
                            <img src="${photoPreview.src}" alt="${firstName} ${lastName}" style="width: 100%; border-radius: 8px;">
                        </div>` : ''}
                        
                        <div style="flex: 1; min-width: 300px;">
                            <h3 style="color: #2c3e50; margin-bottom: 10px;">${firstName} ${lastName}</h3>
                            <p style="color: #7b8a8b; margin-bottom: 8px;">
                                <i class="fas fa-calendar" style="margin-right: 8px;"></i>
                                ${formattedBirthDate} - ${formattedPassingDate}
                                ${age ? ` (${age} years)` : ''}
                            </p>
                            ${location ? `<p style="color: #7b8a8b; margin-bottom: 8px;">
                                <i class="fas fa-map-marker-alt" style="margin-right: 8px;"></i>
                                ${location}
                            </p>` : ''}
                            <p style="color: #7b8a8b; margin-bottom: 8px;">
                                <i class="fas fa-user-heart" style="margin-right: 8px;"></i>
                                Remembered by ${relationship}
                            </p>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 30px;">
                        <h3 style="color: #2c3e50; margin-bottom: 15px; font-weight: 500;">Life Story</h3>
                        <p style="color: #333; line-height: 1.7;">${biography}</p>
                    </div>
                    
                    ${quote ? `<div style="background-color: #f1f2f6; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #7b8a8b;">
                        <p style="color: #2c3e50; font-style: italic; margin-bottom: 5px;">"${quote}"</p>
                    </div>` : ''}
                    
                    <div style="color: #7b8a8b; font-size: 0.9rem; text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                        <p>This memorial was created with love and respect.</p>
                    </div>
                </div>
            `;
            
            // Update preview section
            previewContent.innerHTML = previewHTML;
            previewSection.style.display = 'block';
            
            // Scroll to preview
            previewSection.scrollIntoView({ behavior: 'smooth' });
        });
        
        // Form submission
        memorialForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic form validation
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const birthDate = document.getElementById('birthDate').value;
            const passingDate = document.getElementById('passingDate').value;
            const relationship = document.getElementById('relationship').value;
            const memorialTitle = document.getElementById('memorialTitle').value;
            const biography = document.getElementById('biography').value;
            
            if (!firstName || !lastName || !birthDate || !passingDate || !relationship || !memorialTitle || !biography) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Show loading/confirmation
            const submitBtn = memorialForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Memorial...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Memorial created successfully. Your tribute is now live.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Reset form
                memorialForm.reset();
                photoPreview.style.display = 'none';
                photoUploadArea.querySelector('i').style.display = 'block';
                photoUploadArea.querySelector('p').style.display = 'block';
                photoUploadArea.querySelector('small').style.display = 'block';
            }, 1500);
        });
        
        // Helper functions
        function formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        }
        
        function calculateAge(birthDateString, passingDateString) {
            if (!birthDateString || !passingDateString) return '';
            
            const birthDate = new Date(birthDateString);
            const passingDate = new Date(passingDateString);
            
            let age = passingDate.getFullYear() - birthDate.getFullYear();
            const monthDiff = passingDate.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && passingDate.getDate() < birthDate.getDate())) {
                age--;
            }
            
            return age;
        }




















const VALIDATION_RULES = {
    fullName: {
        max: 100,
        min: 2,
        pattern: /^[A-Za-z\s\-']+$/,
        patternError: 'Full name can only contain letters, spaces, hyphens, and apostrophes'
    },
    email: {
        max: 254,
        min: 6,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        patternError: 'Please enter a valid email address'
    },
    subject: {
        max: 200,
        min: 5,
        pattern: /^[A-Za-z0-9\s\.,!?-]+$/,
        patternError: 'Subject can only contain letters, numbers, spaces, and basic punctuation (. , ! ? -)'
    },
    country: {
        max: 100,
        min: 2,
        pattern: /^[A-Za-z\s]+$/,
        patternError: 'Country can only contain letters and spaces'
    },
    message: {
        max: 2000,
        min: 10,
        pattern: /^[A-Za-z0-9\s\.,!?@#$%&*()\-_=+[\]{}|;:'"<>\n\r]+$/,
        patternError: 'Message contains invalid characters'
    },
    phone: {
        max: 20,
        min: 10,
        pattern: /^[\d\s\-\(\)+]+$/,
        patternError: 'Phone number can only contain digits, spaces, hyphens, parentheses, and plus sign'
    }
};

// Main validation function
function validateField(fieldName, value) {
    const rules = VALIDATION_RULES[fieldName];
    
    if (!rules) {
        return { isValid: false, error: 'Unknown field' };
    }

    // Check required
    if (!value || value.trim() === '') {
        return { isValid: false, error: 'This field is required' };
    }

    const trimmedValue = value.trim();

    // Check minimum length
    if (trimmedValue.length < rules.min) {
        return { 
            isValid: false, 
            error: `Minimum ${rules.min} characters required` 
        };
    }

    // Check maximum length
    if (trimmedValue.length > rules.max) {
        return { 
            isValid: false, 
            error: `Maximum ${rules.max} characters allowed` 
        };
    }

    // Check pattern
    if (!rules.pattern.test(trimmedValue)) {
        return { 
            isValid: false, 
            error: rules.patternError 
        };
    }

    return { isValid: true, error: null };
}

// Form validation
function validateForm(formData) {
    const errors = {};
    const validFields = {};

    for (const [fieldName, value] of Object.entries(formData)) {
        const result = validateField(fieldName, value);
        
        if (!result.isValid) {
            errors[fieldName] = result.error;
        } else {
            validFields[fieldName] = value.trim();
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
        validData: validFields
    };
}

// Real-time validation for input fields
function setupRealTimeValidation(inputElement, fieldName) {
    inputElement.addEventListener('input', function() {
        const result = validateField(fieldName, this.value);
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        if (errorElement) {
            if (!result.isValid) {
                this.classList.add('invalid');
                this.classList.remove('valid');
                errorElement.textContent = result.error;
                errorElement.style.display = 'block';
            } else {
                this.classList.add('valid');
                this.classList.remove('invalid');
                errorElement.style.display = 'none';
            }
        }
    });
}

// Counter for character limits
function setupCharacterCounter(inputElement, fieldName) {
    const rules = VALIDATION_RULES[fieldName];
    const counterElement = document.getElementById(`${fieldName}-counter`);
    
    if (counterElement) {
        inputElement.addEventListener('input', function() {
            const currentLength = this.value.length;
            counterElement.textContent = `${currentLength}/${rules.max}`;
            
            if (currentLength > rules.max) {
                counterElement.classList.add('exceeded');
            } else {
                counterElement.classList.remove('exceeded');
            }
        });
    }
}

// Email specific validation
function validateEmail(email) {
    const rules = VALIDATION_RULES.email;
    
    // Check length
    if (email.length < rules.min || email.length > rules.max) {
        return false;
    }
    
    // Check format
    if (!rules.pattern.test(email)) {
        return false;
    }
    
    // Additional checks
    if (email.includes('..') || 
        email.startsWith('.') || 
        email.endsWith('.') || 
        email.includes('@.')) {
        return false;
    }
    
    return true;
}

// Phone specific validation
function validatePhone(phone) {
    const rules = VALIDATION_RULES.phone;
    const digitsOnly = phone.replace(/\D/g, '');
    
    // Check length with formatting
    if (phone.length < rules.min || phone.length > rules.max) {
        return false;
    }
    
    // Check for minimum digits (US: 10 digits)
    if (digitsOnly.length < 10) {
        return false;
    }
    
    // Check pattern
    if (!rules.pattern.test(phone)) {
        return false;
    }
    
    return true;
}

// Example usage with form
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        // Setup validation for all fields
        Object.keys(VALIDATION_RULES).forEach(fieldName => {
            const input = form.querySelector(`[name="${fieldName}"]`);
            if (input) {
                setupRealTimeValidation(input, fieldName);
                setupCharacterCounter(input, fieldName);
            }
        });

        // Form submit handler
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {};
            Object.keys(VALIDATION_RULES).forEach(fieldName => {
                const input = this.querySelector(`[name="${fieldName}"]`);
                if (input) {
                    formData[fieldName] = input.value;
                }
            });

            const result = validateForm(formData);
            
            if (result.isValid) {
                console.log('Form is valid!', result.validData);
                // Submit form here
                this.submit();
            } else {
                console.log('Validation errors:', result.errors);
                // Display errors to user
                displayFormErrors(result.errors);
            }
        });
    }
});

// Display errors on form
function displayFormErrors(errors) {
    // Clear all existing errors
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // Show new errors
    Object.entries(errors).forEach(([fieldName, errorMessage]) => {
        const input = document.querySelector(`[name="${fieldName}"]`);
        if (input) {
            input.classList.add('invalid');
            
            const error = document.createElement('div');
            error.className = 'error-message';
            error.id = `${fieldName}-error`;
            error.textContent = errorMessage;
            error.style.color = 'red';
            error.style.fontSize = '12px';
            
            input.parentNode.appendChild(error);
        }
    });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        VALIDATION_RULES,
        validateField,
        validateForm,
        validateEmail,
        validatePhone,
        setupRealTimeValidation,
        setupCharacterCounter
    };
}






















        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('nav ul');
        
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
        
        // Handle form submission
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if(name && email && subject && message) {
                // In a real application, you would send this data to a server
                alert(`Thank you ${name}! Your message has been sent. We will respond to you at ${email} as soon as possible.`);
                
                // Reset the form
                contactForm.reset();
            } else {
                alert('Please fill in all fields before submitting.');
            }
        });
        
    // Responsive menu adjustment on window resize
    window.addEventListener('resize', function() {
        if(window.innerWidth > 768) {
            navMenu.style.display = 'flex';
        } else {
            navMenu.style.display = 'none';
        }
    });