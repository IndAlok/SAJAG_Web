const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const themes = [
  'Flood Response',
  'Earthquake Preparedness',
  'Cyclone Management',
  'Fire Safety',
  'First Aid',
  'Chemical Hazard',
  'Drought Management',
  'Landslide Mitigation',
  'Tsunami Preparedness',
  'Industrial Disaster Response',
];

const statesAndUTs = {
  'Andhra Pradesh': [
    { name: 'Visakhapatnam', lat: 17.6868, lon: 83.2185 },
    { name: 'Vijayawada', lat: 16.5062, lon: 80.6480 },
    { name: 'Tirupati', lat: 13.6288, lon: 79.4192 },
  ],
  'Arunachal Pradesh': [
    { name: 'Itanagar', lat: 27.0844, lon: 93.6053 },
    { name: 'Tawang', lat: 27.5860, lon: 91.8687 },
  ],
  'Assam': [
    { name: 'Guwahati', lat: 26.1445, lon: 91.7362 },
    { name: 'Dibrugarh', lat: 27.4728, lon: 94.9120 },
    { name: 'Jorhat', lat: 26.7465, lon: 94.2026 },
  ],
  'Bihar': [
    { name: 'Patna', lat: 25.5941, lon: 85.1376 },
    { name: 'Gaya', lat: 24.7955, lon: 84.9994 },
    { name: 'Muzaffarpur', lat: 26.1209, lon: 85.3647 },
  ],
  'Chhattisgarh': [
    { name: 'Raipur', lat: 21.2514, lon: 81.6296 },
    { name: 'Bilaspur', lat: 22.0797, lon: 82.1409 },
    { name: 'Durg', lat: 21.1900, lon: 81.2849 },
  ],
  'Goa': [
    { name: 'Panaji', lat: 15.4909, lon: 73.8278 },
    { name: 'Margao', lat: 15.2832, lon: 73.9862 },
  ],
  'Gujarat': [
    { name: 'Ahmedabad', lat: 23.0225, lon: 72.5714 },
    { name: 'Surat', lat: 21.1702, lon: 72.8311 },
    { name: 'Vadodara', lat: 22.3072, lon: 73.1812 },
    { name: 'Rajkot', lat: 22.3039, lon: 70.8022 },
  ],
  'Haryana': [
    { name: 'Gurugram', lat: 28.4595, lon: 77.0266 },
    { name: 'Faridabad', lat: 28.4089, lon: 77.3178 },
    { name: 'Rohtak', lat: 28.8955, lon: 76.6066 },
  ],
  'Himachal Pradesh': [
    { name: 'Shimla', lat: 31.1048, lon: 77.1734 },
    { name: 'Manali', lat: 32.2396, lon: 77.1887 },
    { name: 'Dharamshala', lat: 32.2190, lon: 76.3234 },
  ],
  'Jharkhand': [
    { name: 'Ranchi', lat: 23.3441, lon: 85.3096 },
    { name: 'Jamshedpur', lat: 22.8046, lon: 86.2029 },
    { name: 'Dhanbad', lat: 23.7957, lon: 86.4304 },
  ],
  'Karnataka': [
    { name: 'Bengaluru', lat: 12.9716, lon: 77.5946 },
    { name: 'Mysuru', lat: 12.2958, lon: 76.6394 },
    { name: 'Mangaluru', lat: 12.9141, lon: 74.8560 },
    { name: 'Hubli', lat: 15.3647, lon: 75.1240 },
  ],
  'Kerala': [
    { name: 'Thiruvananthapuram', lat: 8.5241, lon: 76.9366 },
    { name: 'Kochi', lat: 9.9312, lon: 76.2673 },
    { name: 'Kozhikode', lat: 11.2588, lon: 75.7804 },
    { name: 'Thrissur', lat: 10.5276, lon: 76.2144 },
  ],
  'Madhya Pradesh': [
    { name: 'Bhopal', lat: 23.2599, lon: 77.4126 },
    { name: 'Indore', lat: 22.7196, lon: 75.8577 },
    { name: 'Jabalpur', lat: 23.1815, lon: 79.9864 },
    { name: 'Gwalior', lat: 26.2183, lon: 78.1828 },
  ],
  'Maharashtra': [
    { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    { name: 'Pune', lat: 18.5204, lon: 73.8567 },
    { name: 'Nagpur', lat: 21.1458, lon: 79.0882 },
    { name: 'Nashik', lat: 20.0063, lon: 73.7899 },
  ],
  'Manipur': [
    { name: 'Imphal', lat: 24.8170, lon: 93.9368 },
    { name: 'Thoubal', lat: 24.6327, lon: 93.9980 },
  ],
  'Meghalaya': [
    { name: 'Shillong', lat: 25.5788, lon: 91.8933 },
    { name: 'Tura', lat: 25.5150, lon: 90.2092 },
  ],
  'Mizoram': [
    { name: 'Aizawl', lat: 23.7271, lon: 92.7176 },
    { name: 'Lunglei', lat: 22.8816, lon: 92.7261 },
  ],
  'Nagaland': [
    { name: 'Kohima', lat: 25.6751, lon: 94.1086 },
    { name: 'Dimapur', lat: 25.9042, lon: 93.7250 },
  ],
  'Odisha': [
    { name: 'Bhubaneswar', lat: 20.2961, lon: 85.8245 },
    { name: 'Cuttack', lat: 20.4625, lon: 85.8830 },
    { name: 'Puri', lat: 19.8135, lon: 85.8312 },
    { name: 'Rourkela', lat: 22.2604, lon: 84.8536 },
  ],
  'Punjab': [
    { name: 'Chandigarh', lat: 30.7333, lon: 76.7794 },
    { name: 'Ludhiana', lat: 30.9010, lon: 75.8573 },
    { name: 'Amritsar', lat: 31.6340, lon: 74.8723 },
  ],
  'Rajasthan': [
    { name: 'Jaipur', lat: 26.9124, lon: 75.7873 },
    { name: 'Jodhpur', lat: 26.2389, lon: 73.0243 },
    { name: 'Udaipur', lat: 24.5854, lon: 73.7125 },
    { name: 'Kota', lat: 25.2138, lon: 75.8648 },
  ],
  'Sikkim': [
    { name: 'Gangtok', lat: 27.3389, lon: 88.6065 },
    { name: 'Namchi', lat: 27.1674, lon: 88.3571 },
  ],
  'Tamil Nadu': [
    { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
    { name: 'Coimbatore', lat: 11.0168, lon: 76.9558 },
    { name: 'Madurai', lat: 9.9252, lon: 78.1198 },
    { name: 'Salem', lat: 11.6643, lon: 78.1460 },
  ],
  'Telangana': [
    { name: 'Hyderabad', lat: 17.3850, lon: 78.4867 },
    { name: 'Warangal', lat: 17.9784, lon: 79.5941 },
    { name: 'Nizamabad', lat: 18.6725, lon: 78.0941 },
  ],
  'Tripura': [
    { name: 'Agartala', lat: 23.8315, lon: 91.2868 },
    { name: 'Udaipur', lat: 23.5315, lon: 91.4825 },
  ],
  'Uttar Pradesh': [
    { name: 'Lucknow', lat: 26.8467, lon: 80.9462 },
    { name: 'Kanpur', lat: 26.4499, lon: 80.3319 },
    { name: 'Agra', lat: 27.1767, lon: 78.0081 },
    { name: 'Varanasi', lat: 25.3176, lon: 82.9739 },
  ],
  'Uttarakhand': [
    { name: 'Dehradun', lat: 30.3165, lon: 78.0322 },
    { name: 'Haridwar', lat: 29.9457, lon: 78.1642 },
    { name: 'Nainital', lat: 29.3803, lon: 79.4636 },
  ],
  'West Bengal': [
    { name: 'Kolkata', lat: 22.5726, lon: 88.3639 },
    { name: 'Howrah', lat: 22.5958, lon: 88.2636 },
    { name: 'Darjeeling', lat: 27.0360, lon: 88.2627 },
    { name: 'Siliguri', lat: 26.7271, lon: 88.3953 },
  ],
  'Andaman and Nicobar Islands': [
    { name: 'Port Blair', lat: 11.6234, lon: 92.7265 },
  ],
  'Chandigarh': [
    { name: 'Chandigarh', lat: 30.7333, lon: 76.7794 },
  ],
  'Dadra and Nagar Haveli and Daman and Diu': [
    { name: 'Daman', lat: 20.3974, lon: 72.8328 },
    { name: 'Silvassa', lat: 20.2766, lon: 73.0091 },
  ],
  'Delhi': [
    { name: 'New Delhi', lat: 28.6139, lon: 77.2090 },
    { name: 'North Delhi', lat: 28.7041, lon: 77.1025 },
    { name: 'South Delhi', lat: 28.5355, lon: 77.2500 },
  ],
  'Jammu and Kashmir': [
    { name: 'Srinagar', lat: 34.0837, lon: 74.7974 },
    { name: 'Jammu', lat: 32.7266, lon: 74.8570 },
  ],
  'Ladakh': [
    { name: 'Leh', lat: 34.1526, lon: 77.5771 },
    { name: 'Kargil', lat: 34.5539, lon: 76.1349 },
  ],
  'Lakshadweep': [
    { name: 'Kavaratti', lat: 10.5593, lon: 72.6358 },
  ],
  'Puducherry': [
    { name: 'Puducherry', lat: 11.9416, lon: 79.8083 },
    { name: 'Karaikal', lat: 10.9254, lon: 79.8380 },
  ],
};

const partnerData = [
  { name: 'National Disaster Response Force (NDRF)', type: 'GoI Ministry' },
  { name: 'Indian Red Cross Society', type: 'NGO' },
  { name: 'National Institute of Disaster Management', type: 'NIDM' },
  { name: 'State Administrative Training Institute', type: 'ATI' },
  { name: 'UNICEF India', type: 'NGO' },
  { name: 'World Health Organization', type: 'International' },
  { name: 'National Fire Service College', type: 'GoI Ministry' },
  { name: 'Indian Meteorological Department', type: 'GoI Ministry' },
];

async function main() {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@ndma.gov.in' },
    update: {},
    create: {
      name: 'NDMA Admin',
      email: 'admin@ndma.gov.in',
      password: hashedPassword,
      organization: 'National Disaster Management Authority',
      role: 'Admin',
    },
  });

  for (const p of partnerData) {
    await prisma.trainingPartner.upsert({
      where: { name: p.name },
      update: {},
      create: p,
    });
  }

  const partners = await prisma.trainingPartner.findMany();
  const statusOptions = ['Planned', 'Ongoing', 'Completed'];
  const stateNames = Object.keys(statesAndUTs);

  await prisma.trainingProgram.deleteMany({});

  for (const stateName of stateNames) {
    const districts = statesAndUTs[stateName];
    const trainingsPerState = Math.floor(Math.random() * 3) + 2;

    for (let i = 0; i < trainingsPerState; i++) {
      const districtData = districts[Math.floor(Math.random() * districts.length)];
      const theme = themes[Math.floor(Math.random() * themes.length)];
      const partner = partners[Math.floor(Math.random() * partners.length)];
      const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];

      const startDate = new Date();
      startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 120));
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 7) + 1);

      await prisma.trainingProgram.create({
        data: {
          title: `${theme} Training - ${districtData.name}`,
          theme,
          status,
          state: stateName,
          district: districtData.name,
          startDate,
          endDate,
          latitude: districtData.lat + (Math.random() - 0.5) * 0.1,
          longitude: districtData.lon + (Math.random() - 0.5) * 0.1,
          participants: Math.floor(Math.random() * 300) + 30,
          feedbackScore: Math.round((Math.random() * 2 + 3) * 10) / 10,
          description: `Comprehensive ${theme.toLowerCase()} training program conducted in ${districtData.name}, ${stateName}.`,
          partnerId: partner.id,
          createdById: admin.id,
        },
      });
    }
  }

  const totalPrograms = await prisma.trainingProgram.count();
}

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
