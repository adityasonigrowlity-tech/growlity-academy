const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.argv[2] || 'admin@growlity.com';
  const adminPassword = process.argv[3] || 'Growlity@Admin2024';
  const adminName = 'Super Admin';

  console.log('--- Creating Growlity Admin User ---');

  try {
    // 1. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail }
    });

    if (existingUser) {
      console.log(`[!] User with email ${adminEmail} already exists. Updating role to admin...`);
      await prisma.user.update({
        where: { email: adminEmail },
        data: { role: 'admin', status: 'active' }
      });
      console.log('Done! User is now an admin.');
      return;
    }

    // 2. Hash password
    const password_hash = await bcrypt.hash(adminPassword, 10);

    // 3. Create admin
    const admin = await prisma.user.create({
      data: {
        name: adminName,
        email: adminEmail,
        password_hash,
        role: 'admin',
        status: 'active',
        is_email_verified: true
      }
    });

    console.log('--- SUCCESS ---');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log(`Role: ${admin.role}`);
    console.log('----------------');

  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
