async function ensureTags(client, tagNames) {
  if (!Array.isArray(tagNames) || tagNames.length === 0) {
    return []
  }

  const cleaned = [...new Set(tagNames.map((tag) => tag.trim()).filter(Boolean))]
  const tagIds = []

  for (const tagName of cleaned) {
    const { rows } = await client.query(
      `
      INSERT INTO tags (tag_name)
      VALUES ($1)
      ON CONFLICT (tag_name)
      DO UPDATE SET tag_name = EXCLUDED.tag_name
      RETURNING tag_id
      `,
      [tagName],
    )
    tagIds.push(rows[0].tag_id)
  }

  return tagIds
}

async function resolveUserId(client, explicitUserId, fallbackEmail) {
  if (explicitUserId) {
    const { rows } = await client.query('SELECT user_id FROM users WHERE user_id = $1', [explicitUserId])
    if (rows.length === 1) {
      return rows[0].user_id
    }
  }

  const { rows } = await client.query('SELECT user_id FROM users WHERE email = $1', [fallbackEmail])
  if (rows.length === 1) {
    return rows[0].user_id
  }

  const fallback = await client.query('SELECT user_id FROM users ORDER BY created_at ASC LIMIT 1')
  if (fallback.rows.length === 1) {
    return fallback.rows[0].user_id
  }

  throw new Error('No users exist in database. Run db:seed before creating data.')
}

module.exports = {
  ensureTags,
  resolveUserId,
}
