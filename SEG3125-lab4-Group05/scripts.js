/**
 * services offered by the repair shop, each service includes: id, name, price, duration, description, image, and what's included
 * we are missing step 3 to 5 still
 */
const services = [
    {
        id: 'brake-tune',
        name: 'Brake Tune & Fix',
        price: 45,
        duration: '30-45 mins',
        description: 'Complete brake system inspection and adjustment',
        image: 'photoss/braketuning.jpg',
        included: ['Brake pad inspection', 'Cable adjustment', 'Lever alignment', 'Safety test']
    },
    {
        id: 'flat-tire',
        name: 'Flat Tire Fix',
        price: 25,
        duration: '20-30 mins',
        description: 'Quick and reliable tire repair or replacement',
        image: 'photoss/flattire.jpg',
        included: ['Puncture repair', 'Tube replacement if needed', 'Tire pressure check', 'Wheel inspection']
    },
    {
        id: 'steering-fix',
        name: 'Steering Fix',
        price: 55,
        duration: '45-60 mins',
        description: 'Handlebar and headset repair and alignment',
        image: 'photoss/steeringfix.jpg',
        included: ['Headset adjustment', 'Handlebar alignment', 'Stem tightening', 'Steering smoothness test']
    },
    {
        id: 'upgrades',
        name: 'Upgrades',
        price: 75,
        duration: '60-90 mins',
        description: 'Component upgrades and performance enhancements',
        image: 'photoss/upgrading.jpg',
        included: ['Component installation', 'Gear tuning', 'Performance optimization', 'Test ride']
    },
    {
        id: 'replacements',
        name: 'Replacements',
        price: '100-200',
        duration: 'depends on required parts',
        description: 'Part replacement and installation service',
        image: 'photoss/replacements.jpg',
        included: ['Old part removal', 'New part installation', 'Compatibility check', 'Functional testing']
    },
    {
        id: 'full-maintenance',
        name: 'Full Maintenance',
        price: 120,
        duration: '100-150 mins',
        description: 'Comprehensive tune-up and maintenance service',
        image: 'photoss/fullmaintenance.jpg',
        included: ['Complete inspection', 'Drivetrain cleaning', 'All adjustments', 'Lubrication', 'Safety check']
    }
];

/*staff members with their expertise and characteristics, each staff includes: id, name, role, experience, expertise, availability*/
const staff = [
    {
        id: 'sarah-m',
        name: 'Sarah Mitchell',
        role: 'Master Technician',
        experience: '12 years',
        expertise: ['Brake Systems', 'Full Maintenance', 'Steering'],
        specialty: 'Expert in hydraulic brake systems and precision tuning',
        availability: 'Mon-Fri'
    },
    {
        id: 'james-c',
        name: 'James Chen',
        role: 'Senior Technician',
        experience: '8 years',
        expertise: ['Upgrades', 'Replacements', 'Flat Tire'],
        specialty: 'Specializes in component upgrades and custom builds',
        availability: 'Tue-Sat'
    },
    {
        id: 'maria-r',
        name: 'Maria Rodriguez',
        role: 'Certified Mechanic',
        experience: '6 years',
        expertise: ['Full Maintenance', 'Flat Tire', 'Brake Systems'],
        specialty: 'Quick service specialist with attention to detail',
        availability: 'Mon-Sat'
    },
    {
        id: 'alex-k',
        name: 'Alex Kowalski',
        role: 'Bike Technician',
        experience: '5 years',
        expertise: ['Steering', 'Replacements', 'Upgrades'],
        specialty: 'Modern bike systems and electronic shifting expert',
        availability: 'Wed-Sun'
    },
    {
        id: 'david-l',
        name: 'David Lee',
        role: 'Junior Technician',
        experience: '3 years',
        expertise: ['Flat Tire', 'Brake Systems', 'Replacements'],
        specialty: 'Enthusiastic and detail-oriented with quick turnaround times',
        availability: 'Mon-Fri'
    },
    {
        id: 'emma-p',
        name: 'Emma Peterson',
        role: 'Expert Technician',
        experience: '10 years',
        expertise: ['Full Maintenance', 'Upgrades', 'Steering'],
        specialty: 'Specialized in high-end bikes and carbon fiber repairs',
        availability: 'Thu-Sun'
    }
];


// global state is set to keep track of selected service, staff, and current step in the booking process
let selectedService = null;
let selectedStaff = null;
let currentStep = 1;

/*initialize the application when DOM is ready*/
document.addEventListener('DOMContentLoaded', function() {
    renderServices();
    initializeEventListeners();
    initializeTooltips();
});

/*rendering all the service cards*/
function renderServices() {
    const container = document.getElementById('serviceCards');
    container.innerHTML = '';
    
    services.forEach(service => {
        const card = createServiceCard(service);
        container.appendChild(card);
    });
}

/**
 * creating a single service card
 * @param {Object} service - Service object
 * @returns {HTMLElement} Card element
 */
function createServiceCard(service) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';
    
    col.innerHTML = `
        <div class="card service-card" 
             data-service-id="${service.id}" 
             tabindex="0" 
             role="button"
             aria-label="Select ${service.name} service">
            <i class="bi bi-check-circle-fill card-check"></i>
            <img src="${service.image}" 
                 class="card-img-top" 
                 alt="${service.name} - ${service.description}">
            <div class="card-body">
                <h5 class="card-title">
                    <i class="bi bi-tools"></i> ${service.name}
                </h5>
                <p class="card-text text-muted">${service.description}</p>
                
                <div class="mb-3">
                    <span class="price-badge">$${service.price}</span>
                    <span class="duration-badge ms-2">
                        <i class="bi bi-clock"></i> ${service.duration}
                    </span>
                </div>
                
                <p class="small mb-2"><strong>What's included:</strong></p>
                <ul class="service-details small">
                    ${service.included.map(item => `<li><i class="bi bi-check2"></i> ${item}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    return col;
}

/*rendering all staff cards*/
function renderStaff() {
    const container = document.getElementById('staffCards');
    container.innerHTML = '';
    
    // adding the filtering logic to show staff members based on the selected service's expertise requirements
    const relevantStaff = staff.filter(member => {
        if (!selectedService) return true;
        // our own checker to see if the staff expertise matches the selected service
        return member.expertise.some(exp => 
            selectedService.name.includes(exp) || exp.includes('Full Maintenance')
        );
    });
    
    // we show all staff if nothing specific is selected
    const staffToShow = relevantStaff.length > 0 ? relevantStaff : staff;
    
    staffToShow.forEach(member => {
        const card = createStaffCard(member);
        container.appendChild(card);
    });
}

/**
 * creating a single staff card
 * @param {Object} member - Staff member object
 * @returns {HTMLElement} Card element
 */
function createStaffCard(member) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-3';
    
    // extracting initials from staff name
    const initials = member.name.split(' ').map(n => n[0]).join('');
    
    col.innerHTML = `
        <div class="card staff-card" 
             data-staff-id="${member.id}" 
             tabindex="0" 
             role="button"
             aria-label="Select ${member.name}, ${member.role}">
            <i class="bi bi-check-circle-fill card-check"></i>
            <div class="card-body text-center">
                <div class="staff-initials">${initials}</div>
                <h5 class="card-title">${member.name}</h5>
                <p class="text-muted mb-2">${member.role}</p>
                
                <div class="mb-2">
                    <i class="bi bi-star-fill text-warning"></i>
                    <small>${member.experience} experience</small>
                </div>
                
                <p class="small mb-2"><strong>Expertise:</strong></p>
                <div class="mb-2">
                    ${member.expertise.map(exp => 
                        `<span class="expertise-badge">${exp}</span>`
                    ).join('')}
                </div>
                
                <p class="small text-muted mb-2">
                    <i class="bi bi-info-circle" 
                       data-bs-toggle="tooltip" 
                       data-bs-placement="top" 
                       title="${member.specialty}"></i>
                    ${member.specialty}
                </p>
                
                <p class="small mb-0">
                    <i class="bi bi-calendar-check"></i> Available: ${member.availability}
                </p>
            </div>
        </div>
    `;
    
    return col;
}
/*initializing all event listeners*/
function initializeEventListeners() {
    //service card selection
    document.getElementById('serviceCards').addEventListener('click', handleServiceSelection);
    document.getElementById('serviceCards').addEventListener('keypress', handleServiceKeyPress);
    
    //staff card selection
    document.getElementById('staffCards').addEventListener('click', handleStaffSelection);
    document.getElementById('staffCards').addEventListener('keypress', handleStaffKeyPress);
    
    //navigation buttons
    document.getElementById('nextToStep2').addEventListener('click', goToStep2);
    document.getElementById('nextToStep3').addEventListener('click', goToStep3);
    document.getElementById('backToStep1').addEventListener('click', goToStep1);
    document.getElementById('backToStep2').addEventListener('click', goToStep2);
}

/**
 * handling service card selection
 * @param {Event} event - Click event
 */
function handleServiceSelection(event) {
    const card = event.target.closest('.service-card');
    if (!card) return;
    
    const serviceId = card.dataset.serviceId;
    selectService(serviceId);
}

/**
 * handling keyboard navigation for service cards
 * @param {Event} event - this is for keypress event
 */
function handleServiceKeyPress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleServiceSelection(event);
    }
}

/**
 * handling staff card selection
 * @param {Event} event - this one for click event
 */
function handleStaffSelection(event) {
    const card = event.target.closest('.staff-card');
    if (!card) return;
    
    const staffId = card.dataset.staffId;
    selectStaff(staffId);
}

/**
 * handling keyboard navigation for staff cards
 * @param {Event} event - keypress event once again
 */
function handleStaffKeyPress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleStaffSelection(event);
    }
}

/**
 * selecting a service
 * @param {string} serviceId - we will use the service ID
 */
function selectService(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (!service) return;
    
    //updating global state
    selectedService = service;
    
    //and updating the UI to reflect the selection
    document.querySelectorAll('.service-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    const selectedCard = document.querySelector(`[data-service-id="${serviceId}"]`);
    selectedCard.classList.add('selected');
    
    //selection summary for the user to see what they selected
    document.getElementById('serviceSelectionSummary').style.display = 'block';
    document.getElementById('selectedServiceText').innerHTML = `
        <strong>${service.name}</strong> - $${service.price} (${service.duration})
    `;
    
    //we only enable the next button after a service is selected to guide the user through the process
    document.getElementById('nextToStep2').disabled = false;
}

/**
 * selecting a staff member
 * @param {string} staffId - using the staff ID to find the staff member
 */
function selectStaff(staffId) {
    const staffMember = staff.find(s => s.id === staffId);
    if (!staffMember) return;
    
    //we update global state
    selectedStaff = staffMember;
    
    //and update the UI to show which staff member is selected
    document.querySelectorAll('.staff-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    const selectedCard = document.querySelector(`[data-staff-id="${staffId}"]`);
    selectedCard.classList.add('selected');
    
    //selection summary once again
    document.getElementById('staffSelectionSummary').style.display = 'block';
    document.getElementById('summaryService').textContent = selectedService.name;
    document.getElementById('summaryStaff').textContent = `${staffMember.name} (${staffMember.role})`;
    document.getElementById('summaryPrice').textContent = `$${selectedService.price}`;
    document.getElementById('summaryDuration').textContent = selectedService.duration;
    
    //enabling next button for step 3 only after a staff member is selected
    document.getElementById('nextToStep3').disabled = false;
}

/*navigate to Step 1*/
function goToStep1() {
    currentStep = 1;
    updateStepDisplay();
    updateProgressBar();
}

/*navigate to Step 2*/
function goToStep2() {
    if (!selectedService && currentStep === 1) {
        alert('Please select a service first.');
        return;
    }
    
    currentStep = 2;
    renderStaff();
    updateStepDisplay();
    updateProgressBar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/*navigate to Step 3... HERE WE ARE MISSING DEVELOPMENT FOR STEP 3 TO 5*/
function goToStep3() {
    if (!selectedStaff) {
        alert('Please select a technician first.');
        return;
    }
    
    currentStep = 3;
    updateStepDisplay();
    updateProgressBar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    /**
     * CONTINUE THE WORK TEAM:
     * At this point, you have access to:
     * - selectedService (object with all service details)
     * - selectedStaff (object with all staff details)
     */
}

/*update which step section is visible*/
function updateStepDisplay() {
    document.getElementById('step1').style.display = currentStep === 1 ? 'block' : 'none';
    document.getElementById('step2').style.display = currentStep === 2 ? 'block' : 'none';
    document.getElementById('step3').style.display = currentStep === 3 ? 'block' : 'none';
    
    // Update step labels
    document.getElementById('step1Label').className = currentStep === 1 ? 'step-active' : '';
    document.getElementById('step2Label').className = currentStep === 2 ? 'step-active' : '';
    document.getElementById('step3Label').className = currentStep === 3 ? 'step-active' : '';
}

/*Update progress bar based on current step*/
function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const percentage = (currentStep / 3) * 100;
    
    progressBar.style.width = percentage + '%';
    progressBar.setAttribute('aria-valuenow', percentage);
    
    const stepTexts = [
        'Step 1: Select Service',
        'Step 2: Select Staff',
        'Step 3: Schedule & Details'
    ];
    
    progressBar.textContent = stepTexts[currentStep - 1];
}

/*initializing Bootstrap tooltips*/
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

/**
 * Get current booking data
 * This function can be called by Step 3+ to access the booking data
 * @returns {Object} Current booking information
 */
function getBookingData() {
    return {
        service: selectedService,
        staff: selectedStaff,
        step: currentStep
    };
}

/**
 *log current state for debugging purposes, this can be called from the console to see what's currently selected and which step the user is on
 */
function debugState() {
    console.log('=== Current Booking State ===');
    console.log('Current Step:', currentStep);
    console.log('Selected Service:', selectedService);
    console.log('Selected Staff:', selectedStaff);
    console.log('===========================');
}

//I made these utility functions available globally for team developers
window.getBookingData = getBookingData;
window.debugState = debugState;
