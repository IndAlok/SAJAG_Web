// Generate comprehensive mock data for the SAJAG platform

// Indian states and their coordinates
const indianStates = [
  { name: 'Andhra Pradesh', lat: 15.9129, lon: 79.7400 },
  { name: 'Arunachal Pradesh', lat: 28.2180, lon: 94.7278 },
  { name: 'Assam', lat: 26.2006, lon: 92.9376 },
  { name: 'Bihar', lat: 25.0961, lon: 85.3131 },
  { name: 'Chhattisgarh', lat: 21.2787, lon: 81.8661 },
  { name: 'Goa', lat: 15.2993, lon: 74.1240 },
  { name: 'Gujarat', lat: 22.2587, lon: 71.1924 },
  { name: 'Haryana', lat: 29.0588, lon: 76.0856 },
  { name: 'Himachal Pradesh', lat: 31.1048, lon: 77.1734 },
  { name: 'Jharkhand', lat: 23.6102, lon: 85.2799 },
  { name: 'Karnataka', lat: 15.3173, lon: 75.7139 },
  { name: 'Kerala', lat: 10.8505, lon: 76.2711 },
  { name: 'Madhya Pradesh', lat: 22.9734, lon: 78.6569 },
  { name: 'Maharashtra', lat: 19.7515, lon: 75.7139 },
  { name: 'Manipur', lat: 24.6637, lon: 93.9063 },
  { name: 'Meghalaya', lat: 25.4670, lon: 91.3662 },
  { name: 'Mizoram', lat: 23.1645, lon: 92.9376 },
  { name: 'Nagaland', lat: 26.1584, lon: 94.5624 },
  { name: 'Odisha', lat: 20.9517, lon: 85.0985 },
  { name: 'Punjab', lat: 31.1471, lon: 75.3412 },
  { name: 'Rajasthan', lat: 27.0238, lon: 74.2179 },
  { name: 'Sikkim', lat: 27.5330, lon: 88.5122 },
  { name: 'Tamil Nadu', lat: 11.1271, lon: 78.6569 },
  { name: 'Telangana', lat: 18.1124, lon: 79.0193 },
  { name: 'Tripura', lat: 23.9408, lon: 91.9882 },
  { name: 'Uttar Pradesh', lat: 26.8467, lon: 80.9462 },
  { name: 'Uttarakhand', lat: 30.0668, lon: 79.0193 },
  { name: 'West Bengal', lat: 22.9868, lon: 87.8550 },
  { name: 'Delhi', lat: 28.7041, lon: 77.1025 },
];

// Training themes
export const themes = [
  'Flood Response',
  'Earthquake Preparedness',
  'Cyclone Management',
  'Chemical Hazard',
  'First Aid',
  'Fire Safety',
  'Drought Management',
  'Landslide Mitigation',
  'Tsunami Preparedness',
  'Nuclear Disaster Response',
  'Industrial Safety',
  'Urban Search and Rescue',
];

// Partner organizations
export const partners = [
  { id: 'P01', name: 'National Disaster Response Force (NDRF)', type: 'Government' },
  { id: 'P02', name: 'Indian Red Cross Society', type: 'NGO' },
  { id: 'P03', name: 'State Disaster Response Force - Gujarat', type: 'Government' },
  { id: 'P04', name: 'Sphere India', type: 'NGO' },
  { id: 'P05', name: 'Oxfam India', type: 'NGO' },
  { id: 'P06', name: 'CARE India', type: 'NGO' },
  { id: 'P07', name: 'Central Industrial Security Force (CISF)', type: 'Government' },
  { id: 'P08', name: 'Fire Services Department - Maharashtra', type: 'Government' },
  { id: 'P09', name: 'Rapid Action Force (RAF)', type: 'Government' },
  { id: 'P10', name: 'National Institute of Disaster Management (NIDM)', type: 'Government' },
  { id: 'P11', name: 'Disaster Management Institute - Karnataka', type: 'Government' },
  { id: 'P12', name: 'Save the Children India', type: 'NGO' },
  { id: 'P13', name: 'World Vision India', type: 'NGO' },
  { id: 'P14', name: 'Plan India', type: 'NGO' },
  { id: 'P15', name: 'HelpAge India', type: 'NGO' },
];

// Districts for various states
const districts = {
  'Assam': ['Kamrup', 'Dibrugarh', 'Guwahati', 'Jorhat', 'Tezpur'],
  'Bihar': ['Patna', 'Gaya', 'Muzaffarpur', 'Darbhanga', 'Bhagalpur'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Puri', 'Rourkela', 'Berhampur'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi', 'Belagavi'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Meerut'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner'],
  'Delhi': ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi'],
};

// Statuses
const statuses = ['Completed', 'In-Progress', 'Upcoming', 'Pending Approval'];

// Generate training programs
const generateTrainings = () => {
  const trainings = [];
  let idCounter = 1;

  // Generate 100 training programs
  for (let i = 0; i < 100; i++) {
    const state = indianStates[Math.floor(Math.random() * indianStates.length)];
    const theme = themes[Math.floor(Math.random() * themes.length)];
    const partner = partners[Math.floor(Math.random() * partners.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    const districtList = districts[state.name] || ['Central', 'North', 'South', 'East', 'West'];
    const district = districtList[Math.floor(Math.random() * districtList.length)];

    // Random dates in 2025
    const startMonth = Math.floor(Math.random() * 12) + 1;
    const startDay = Math.floor(Math.random() * 28) + 1;
    const startDate = `2025-${String(startMonth).padStart(2, '0')}-${String(startDay).padStart(2, '0')}`;
    
    const endDay = startDay + Math.floor(Math.random() * 5) + 1;
    const endDate = `2025-${String(startMonth).padStart(2, '0')}-${String(Math.min(endDay, 28)).padStart(2, '0')}`;

    // Random participants and feedback
    const participants = Math.floor(Math.random() * 300) + 50;
    const feedbackScore = (Math.random() * 2 + 3).toFixed(1); // 3.0 to 5.0

    // Small random offset for coordinates to spread markers
    const latOffset = (Math.random() - 0.5) * 2;
    const lonOffset = (Math.random() - 0.5) * 2;

    trainings.push({
      id: `NDMA-TR-25-${String(idCounter).padStart(3, '0')}`,
      title: `${theme} Training - ${district}, ${state.name}`,
      theme,
      state: state.name,
      district,
      location: {
        lat: state.lat + latOffset,
        lon: state.lon + lonOffset,
      },
      partnerId: partner.id,
      partnerName: partner.name,
      partnerType: partner.type,
      startDate,
      endDate,
      participants,
      status,
      feedbackScore: parseFloat(feedbackScore),
      description: `Comprehensive ${theme.toLowerCase()} training program for disaster management professionals and volunteers in ${district}, ${state.name}.`,
      targetAudience: 'Disaster Management Officials, First Responders, Volunteers',
      objectives: [
        `Understanding ${theme.toLowerCase()} protocols and procedures`,
        'Hands-on practical drills and simulations',
        'Emergency response coordination',
        'Community preparedness and awareness',
      ],
      materialsProvided: ['Training Manual', 'Safety Equipment', 'Certification', 'First Aid Kit'],
    });

    idCounter++;
  }

  return trainings;
};

export const trainings = generateTrainings();

// Recent activities for timeline
export const recentActivities = [
  {
    id: 1,
    type: 'training_completed',
    title: 'Cyclone Drill Completed',
    description: 'Cyclone Management training successfully completed in Puri, Odisha',
    timestamp: '2025-10-12T14:30:00',
    icon: 'CheckCircle',
    color: 'success',
  },
  {
    id: 2,
    type: 'training_added',
    title: 'New Training Scheduled',
    description: 'Fire Safety workshop added for Mumbai, Maharashtra',
    timestamp: '2025-10-11T10:15:00',
    icon: 'Add',
    color: 'primary',
  },
  {
    id: 3,
    type: 'partner_joined',
    title: 'Partner Organization Onboarded',
    description: 'World Vision India joined as a training partner',
    timestamp: '2025-10-10T16:45:00',
    icon: 'Group',
    color: 'info',
  },
  {
    id: 4,
    type: 'training_inprogress',
    title: 'Training in Progress',
    description: 'Earthquake Preparedness drill ongoing in Shimla, Himachal Pradesh',
    timestamp: '2025-10-09T09:00:00',
    icon: 'Schedule',
    color: 'warning',
  },
  {
    id: 5,
    type: 'training_completed',
    title: 'Flood Response Training Completed',
    description: 'Successfully trained 200 volunteers in Patna, Bihar',
    timestamp: '2025-10-08T17:30:00',
    icon: 'CheckCircle',
    color: 'success',
  },
  {
    id: 6,
    type: 'training_approved',
    title: 'Training Approved',
    description: 'Tsunami Preparedness program approved for Chennai, Tamil Nadu',
    timestamp: '2025-10-07T11:20:00',
    icon: 'ThumbUp',
    color: 'success',
  },
  {
    id: 7,
    type: 'training_pending',
    title: 'Approval Pending',
    description: 'Landslide Mitigation training awaiting approval for Darjeeling, West Bengal',
    timestamp: '2025-10-06T13:40:00',
    icon: 'HourglassEmpty',
    color: 'warning',
  },
];

// AI Predictive Alerts - UNIQUE FEATURE
export const aiPredictiveAlerts = [
  {
    id: 1,
    type: 'gap_analysis',
    severity: 'high',
    title: 'Seasonal Training Gap Detected',
    description: 'Monsoon season approaching. Low "Flood Response" training coverage detected in Bihar and Assam.',
    recommendation: 'Schedule 3-5 new flood response workshops in the next 30 days.',
    affectedStates: ['Bihar', 'Assam'],
    priority: 'High',
    icon: 'Warning',
    color: 'error',
  },
  {
    id: 2,
    type: 'best_practice',
    severity: 'medium',
    title: 'High-Performance Partner Identified',
    description: 'The "Indian Red Cross Society" has shown a 30% higher participant satisfaction score (4.9/5.0) than the network average.',
    recommendation: 'Analyze their training module and methodology for best practices. Consider knowledge-sharing session.',
    affectedStates: ['All States'],
    priority: 'Medium',
    icon: 'TrendingUp',
    color: 'success',
  },
  {
    id: 3,
    type: 'demand_prediction',
    severity: 'medium',
    title: 'Projected Training Demand Spike',
    description: 'Based on historical data, there is a high demand for "First Aid" and "Fire Safety" training in urban areas during Q4 2025.',
    recommendation: 'Allocate resources and schedule programs in metro cities: Delhi, Mumbai, Bengaluru, Chennai.',
    affectedStates: ['Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu'],
    priority: 'Medium',
    icon: 'Insights',
    color: 'info',
  },
  {
    id: 4,
    type: 'capacity_alert',
    severity: 'low',
    title: 'Training Capacity Underutilized',
    description: 'States with low training activity detected: Goa, Sikkim, and Arunachal Pradesh have less than 2 programs in the current year.',
    recommendation: 'Engage local SDMAs and partners to identify training needs and schedule programs.',
    affectedStates: ['Goa', 'Sikkim', 'Arunachal Pradesh'],
    priority: 'Low',
    icon: 'Info',
    color: 'warning',
  },
  {
    id: 5,
    type: 'theme_gap',
    severity: 'high',
    title: 'Critical Theme Coverage Gap',
    description: 'Only 3% of trainings in coastal states focus on "Tsunami Preparedness" despite high risk profile.',
    recommendation: 'Prioritize tsunami response training in Kerala, Tamil Nadu, Andhra Pradesh, and Odisha.',
    affectedStates: ['Kerala', 'Tamil Nadu', 'Andhra Pradesh', 'Odisha'],
    priority: 'High',
    icon: 'Warning',
    color: 'error',
  },
];

// User roles for RBAC simulation
export const userRoles = [
  { value: 'ndma_admin', label: 'NDMA Admin (Full Access)', requiresState: false },
  { value: 'state_sdma_manager', label: 'State SDMA Manager', requiresState: true },
  { value: 'training_partner_redcross', label: 'Training Partner - Indian Red Cross', requiresState: false },
  { value: 'training_partner_ndrf', label: 'Training Partner - NDRF', requiresState: false },
];

// List of all Indian states for SDMA selection
export const indianStatesList = indianStates.map(state => state.name).sort();

// Export summary statistics
export const getSummaryStats = () => {
  const totalTrainings = trainings.length;
  const totalParticipants = trainings.reduce((sum, t) => sum + t.participants, 0);
  const activePartners = new Set(trainings.map(t => t.partnerId)).size;
  const statesCovered = new Set(trainings.map(t => t.state)).size;
  const completedTrainings = trainings.filter(t => t.status === 'Completed').length;
  const upcomingTrainings = trainings.filter(t => t.status === 'Upcoming').length;
  const inProgressTrainings = trainings.filter(t => t.status === 'In-Progress').length;
  const pendingApproval = trainings.filter(t => t.status === 'Pending Approval').length;

  return {
    totalTrainings,
    totalParticipants,
    activePartners,
    statesCovered,
    completedTrainings,
    upcomingTrainings,
    inProgressTrainings,
    pendingApproval,
  };
};

// Get thematic distribution
export const getThematicDistribution = () => {
  const distribution = {};
  themes.forEach(theme => {
    distribution[theme] = trainings.filter(t => t.theme === theme).length;
  });
  return Object.entries(distribution).map(([name, value]) => ({ name, value }));
};

// Get state-wise distribution
export const getStateDistribution = () => {
  const distribution = {};
  trainings.forEach(training => {
    if (distribution[training.state]) {
      distribution[training.state]++;
    } else {
      distribution[training.state] = 1;
    }
  });
  return Object.entries(distribution)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10); // Top 10 states
};

// Get partner performance data
export const getPartnerPerformance = () => {
  const performance = {};
  
  trainings.forEach(training => {
    if (!performance[training.partnerId]) {
      performance[training.partnerId] = {
        id: training.partnerId,
        name: training.partnerName,
        type: training.partnerType,
        totalTrainings: 0,
        totalParticipants: 0,
        avgFeedback: 0,
        feedbackScores: [],
      };
    }
    
    performance[training.partnerId].totalTrainings++;
    performance[training.partnerId].totalParticipants += training.participants;
    performance[training.partnerId].feedbackScores.push(training.feedbackScore);
  });

  // Calculate average feedback
  Object.values(performance).forEach(partner => {
    partner.avgFeedback = (
      partner.feedbackScores.reduce((sum, score) => sum + score, 0) / 
      partner.feedbackScores.length
    ).toFixed(2);
    delete partner.feedbackScores; // Clean up
  });

  return Object.values(performance).sort((a, b) => b.totalParticipants - a.totalParticipants);
};

// Get monthly trend data
export const getMonthlyTrends = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const trends = months.map((month, index) => ({
    month,
    trainings: 0,
    participants: 0,
  }));

  trainings.forEach(training => {
    const monthIndex = parseInt(training.startDate.split('-')[1]) - 1;
    if (trends[monthIndex]) {
      trends[monthIndex].trainings++;
      trends[monthIndex].participants += training.participants;
    }
  });

  return trends;
};
