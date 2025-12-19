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

export const partnerTypes = [
  { value: 'NIDM', label: 'National Institute of Disaster Management' },
  { value: 'ATI', label: 'Administrative Training Institute' },
  { value: 'NGO', label: 'Non-Governmental Organization' },
  { value: 'GoI Ministry', label: 'Government of India Ministry' },
];

export const statuses = [
  { value: 'Planned', label: 'Planned', color: 'info' },
  { value: 'Ongoing', label: 'Ongoing', color: 'warning' },
  { value: 'Completed', label: 'Completed', color: 'success' },
  { value: 'Cancelled', label: 'Cancelled', color: 'error' },
];

export const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi',
];

export const userRoles = [
  { value: 'ndma_admin', label: 'NDMA Admin (Full Access)', requiresState: false },
  { value: 'state_sdma_manager', label: 'State SDMA Manager', requiresState: true },
];

export const defaultAlerts = [
  {
    id: 1,
    type: 'gap_analysis',
    severity: 'high',
    title: 'Seasonal Training Gap Detected',
    description: 'Monsoon season approaching. Low flood response training coverage detected in eastern states.',
    recommendation: 'Schedule flood response workshops in the next 30 days.',
    affectedStates: ['Bihar', 'Assam', 'West Bengal'],
    priority: 'High',
    icon: 'Warning',
    color: 'error',
  },
  {
    id: 2,
    type: 'best_practice',
    severity: 'medium',
    title: 'High-Performance Partner Identified',
    description: 'NDRF has shown 30% higher participant satisfaction than network average.',
    recommendation: 'Analyze their training methodology for best practices.',
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
    description: 'High demand predicted for First Aid and Fire Safety training in Q4.',
    recommendation: 'Allocate resources in metro cities.',
    affectedStates: ['Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu'],
    priority: 'Medium',
    icon: 'Insights',
    color: 'info',
  },
];
