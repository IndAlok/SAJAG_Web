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
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubli'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota'],
  'West Bengal': ['Kolkata', 'Howrah', 'Darjeeling', 'Siliguri'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Puri', 'Rourkela'],
  'Assam': ['Guwahati', 'Dibrugarh', 'Jorhat', 'Silchar'],
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

  for (let i = 0; i < 20; i++) {
    const state = states[Math.floor(Math.random() * states.length)];
    const districtList = districts[state] || ['District 1'];
    const district = districtList[Math.floor(Math.random() * districtList.length)];
    const theme = themes[Math.floor(Math.random() * themes.length)];
    const partner = partners[Math.floor(Math.random() * partners.length)];
    const statuses = ['Planned', 'Ongoing', 'Completed'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 90));
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 7) + 1);

    await prisma.trainingProgram.create({
      data: {
        title: `${theme} Training - ${district}`,
        theme,
        status,
        state,
        district,
        startDate,
        endDate,
        participants: Math.floor(Math.random() * 200) + 20,
        feedbackScore: Math.round((Math.random() * 2 + 3) * 10) / 10,
        description: `Comprehensive ${theme.toLowerCase()} training program for ${district}, ${state}.`,
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
