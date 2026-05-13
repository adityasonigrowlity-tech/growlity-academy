const adminController = require('./src/controllers/admin.controller');
const adminRoutes = require('./src/routes/admin.routes');

console.log('--- Admin Controller Exports ---');
console.log('getAllSubscriptionPlans:', typeof adminController.getAllSubscriptionPlans);
console.log('createSubscriptionPlan:', typeof adminController.createSubscriptionPlan);
console.log('updateSubscriptionPlan:', typeof adminController.updateSubscriptionPlan);
console.log('deleteSubscriptionPlan:', typeof adminController.deleteSubscriptionPlan);
console.log('getAllUserSubscriptions:', typeof adminController.getAllUserSubscriptions);

console.log('\n--- Admin Routes ---');
adminRoutes.stack.forEach(layer => {
    if (layer.route) {
        console.log(`${Object.keys(layer.route.methods).join(',').toUpperCase()} ${layer.route.path}`);
    }
});

const prisma = require('./src/config/prisma');
async function testPrisma() {
    try {
        const count = await prisma.subscriptionPlan.count();
        console.log('\n--- Prisma Check ---');
        console.log('SubscriptionPlan count:', count);
        process.exit(0);
    } catch (error) {
        console.error('\n--- Prisma Error ---');
        console.error(error.message);
        process.exit(1);
    }
}
testPrisma();
