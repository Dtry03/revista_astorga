import express from "express";
import pg from "pg";

const { Pool } = pg;

const router = express.Router();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

router.get("/ads", async (req, res) => {
  try {
    const placement = req.query.placement ? String(req.query.placement) : null;

    const params: unknown[] = [];
    let where = `
      WHERE status = 'active'
        AND (starts_at IS NULL OR starts_at <= NOW())
        AND (ends_at IS NULL OR ends_at >= NOW())
    `;

    if (placement) {
      params.push(placement);
      where += ` AND placement = $${params.length}`;
    }

    const result = await pool.query(
      `
      SELECT
        id,
        name,
        placement,
        image_url,
        target_url,
        alt_text,
        status,
        starts_at,
        ends_at,
        created_at,
        updated_at
      FROM ads
      ${where}
      ORDER BY created_at DESC
      `,
      params
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching ads:", error);

    res.status(500).json({
      success: false,
      message: "Error al cargar la publicidad",
    });
  }
});

router.get("/ads/:placement", async (req, res) => {
  try {
    const { placement } = req.params;

    const result = await pool.query(
      `
      SELECT
        id,
        name,
        placement,
        image_url,
        target_url,
        alt_text,
        status,
        starts_at,
        ends_at,
        created_at,
        updated_at
      FROM ads
      WHERE status = 'active'
        AND placement = $1
        AND (starts_at IS NULL OR starts_at <= NOW())
        AND (ends_at IS NULL OR ends_at >= NOW())
      ORDER BY created_at DESC
      LIMIT 1
      `,
      [placement]
    );

    res.json({
      success: true,
      data: result.rows[0] || null,
    });
  } catch (error) {
    console.error("Error fetching ad:", error);

    res.status(500).json({
      success: false,
      message: "Error al cargar el anuncio",
    });
  }
});

export default router;
