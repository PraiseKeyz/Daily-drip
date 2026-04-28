require('dotenv').config()
const { Pool } = require('pg')

async function run() {
  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) {
    console.error('❌ DATABASE_URL is missing in .env')
    process.exit(1)
  }

  const pool = new Pool({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false }
  })

  const args = process.argv.slice(2)
  const command = args[0]

  if (!command) {
    console.log(`
Usage:
  node scripts/delete-user.js --email user@example.com
  node scripts/delete-user.js --all
    `)
    process.exit(0)
  }

  try {
    if (command === '--all') {
      console.log('🗑️  Deleting all users...')
      // ON DELETE CASCADE on the foreign keys takes care of wallets/tokens/envelopes
      const result = await pool.query('DELETE FROM users RETURNING id')
      console.log(`✅ Successfully deleted ${result.rowCount} users and all associated data`)
    } else if (command === '--email') {
      const email = args[1]
      if (!email) {
        console.error('❌ Please provide an email address')
        process.exit(1)
      }

      console.log(`🗑️  Deleting user: ${email}...`)
      const result = await pool.query('DELETE FROM users WHERE email = $1 RETURNING id', [email])

      if (result.rowCount > 0) {
        console.log(`✅ Successfully deleted ${email} and all their linked data`)
      } else {
        console.log(`⚠️  User ${email} not found`)
      }
    } else {
      console.error('❌ Unknown command')
    }
  } catch (error) {
    console.error('❌ Error executing deletion:', error.message)
  } finally {
    await pool.end()
  }
}

run()
