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
];

const states = [
  'Maharashtra', 'Gujarat', 'Tamil Nadu', 'Karnataka', 'Kerala',
  'Uttar Pradesh', 'Rajasthan', 'West Bengal', 'Odisha', 'Assam',
];

const districts = {
  'Maharashtra': [
    { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    { name: 'Pune', lat: 18.5204, lon: 73.8567 },
    { name: 'Nagpur', lat: 21.1458, lon: 79.0882 },
    { name: 'Nashik', lat: 20.0063, lon: 73.7899 }
  ],
  'Gujarat': [
    { name: 'Ahmedabad', lat: 23.0225, lon: 72.5714 },
    { name: 'Surat', lat: 21.1702, lon: 72.8311 },
    { name: 'Vadodara', lat: 22.3072, lon: 73.1812 },
    { name: 'Rajkot', lat: 22.3039, lon: 70.8022 }
  ],
  'Tamil Nadu': [
    { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
    { name: 'Coimbatore', lat: 11.0168, lon: 76.9558 },
    { name: 'Madurai', lat: 9.9252, lon: 78.1198 },
    { name: 'Salem', lat: 11.6643, lon: 78.1460 }
  ],
  'Karnataka': [
    { name: 'Bengaluru', lat: 12.9716, lon: 77.5946 },
    { name: 'Mysuru', lat: 12.2958, lon: 76.6394 },
    { name: 'Mangaluru', lat: 12.9141, lon: 74.8560 },
    { name: 'Hubli', lat: 15.3647, lon: 75.1240 }
  ],
  'Kerala': [
    { name: 'Thiruvananthapuram', lat: 8.5241, lon: 76.9366 },
    { name: 'Kochi', lat: 9.9312, lon: 76.2673 },
    { name: 'Kozhikode', lat: 11.2588, lon: 75.7804 },
    { name: 'Thrissur', lat: 10.5276, lon: 76.2144 }
  ],
  'Uttar Pradesh': [
    { name: 'Lucknow', lat: 26.8467, lon: 80.9462 },
    { name: 'Kanpur', lat: 26.4499, lon: 80.3319 },
    { name: 'Agra', lat: 27.1767, lon: 78.0081 },
    { name: 'Varanasi', lat: 25.3176, lon: 82.9739 }
  ],
  'Rajasthan': [
    { name: 'Jaipur', lat: 26.9124, lon: 75.7873 },
    { name: 'Jodhpur', lat: 26.2389, lon: 73.0243 },
    { name: 'Udaipur', lat: 24.5854, lon: 73.7125 },
    { name: 'Kota', lat: 25.2138, lon: 75.8648 }
  ],
  'West Bengal': [
    { name: 'Kolkata', lat: 22.5726, lon: 88.3639 },
    { name: 'Howrah', lat: 22.5958, lon: 88.2636 },
    { name: 'Darjeeling', lat: 27.0360, lon: 88.2627 },
    { name: 'Siliguri', lat: 26.7271, lon: 88.3953 }
  ],
  'Odisha': [
    { name: 'Bhubaneswar', lat: 20.2961, lon: 85.8245 },
    { name: 'Cuttack', lat: 20.4625, lon: 85.8830 },
    { name: 'Puri', lat: 19.8135, lon: 85.8312 },
    { name: 'Rourkela', lat: 22.2604, lon: 84.8536 }
  ],
  'Assam': [
    { name: 'Guwahati', lat: 26.1445, lon: 91.7362 },
    { name: 'Dibrugarh', lat: 27.4728, lon: 94.9120 },
    { name: 'Jorhat', lat: 26.7465, lon: 94.2026 },
    { name: 'Silchar', lat: 24.8333, lon: 92.7789 }
  ],
};

async function main() {
  console.log('Seeding database...');

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

  console.log('Created admin user:', admin.email);

  const partnerData = [
    { name: 'National Disaster Response Force (NDRF)', type: 'GoI Ministry' },
    { name: 'Indian Red Cross Society', type: 'NGO' },
    { name: 'National Institute of Disaster Management', type: 'NIDM' },
    { name: 'State Administrative Training Institute', type: 'ATI' },
    { name: 'UNICEF India', type: 'NGO' },
  ];

  for (const p of partnerData) {
    await prisma.trainingPartner.upsert({
      where: { name: p.name },
      update: {},
      create: p,
    });
  }

  console.log('Created partners');

  const partners = await prisma.trainingPartner.findMany();
  const statusOptions = ['Planned', 'Ongoing', 'Completed'];

  for (let i = 0; i < 20; i++) {
    const state = states[Math.floor(Math.random() * states.length)];
    const districtList = districts[state] || [{ name: 'District 1', lat: 20.5937, lon: 78.9629 }];
    const districtData = districtList[Math.floor(Math.random() * districtList.length)];
    const theme = themes[Math.floor(Math.random() * themes.length)];
    const partner = partners[Math.floor(Math.random() * partners.length)];
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 90));
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 7) + 1);

    await prisma.trainingProgram.create({
      data: {
        title: `${theme} Training - ${districtData.name}`,
        theme,
        status,
        state,
        district: districtData.name,
        startDate,
        endDate,
        latitude: districtData.lat + (Math.random() - 0.5) * 0.1,
        longitude: districtData.lon + (Math.random() - 0.5) * 0.1,
        participants: Math.floor(Math.random() * 200) + 20,
        feedbackScore: Math.round((Math.random() * 2 + 3) * 10) / 10,
        description: `Comprehensive ${theme.toLowerCase()} training program for ${districtData.name}, ${state}.`,
        partnerId: partner.id,
        createdById: admin.id,
      },
    });
  }

  console.log('Created 20 training programs');
  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
