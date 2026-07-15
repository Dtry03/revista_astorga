import express from "express";
import pg from "pg";

const { Pool } = pg;

const router = express.Router();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

function normalizeLimit(value: unknown) {
  const limit = Number(value || 20);

  if (Number.isNaN(limit)) return 20;
  if (limit < 1) return 1;
  if (limit > 50) return 50;

  return limit;
}

router.get("/articles", async (req, res) => {
  try {
    const limit = normalizeLimit(req.query.limit);
    const category = req.query.category ? String(req.query.category) : null;

    const params: unknown[] = ["published"];
    let where = "WHERE status = $1";

    if (category) {
      params.push(category);
      where += ` AND LOWER(category) = LOWER($${params.length})`;
    }

    params.push(limit);

    const result = await pool.query(
      `
      SELECT
        id,
        title,
        slug,
        excerpt,
        category,
        article_template,
        cover_image,
        status,
        published_at,
        created_at,
        updated_at
      FROM articles
      ${where}
      ORDER BY COALESCE(published_at, created_at) DESC
      LIMIT $${params.length}
      `,
      params
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching articles:", error);

    res.status(500).json({
      success: false,
      message: "Error al cargar las noticias",
    });
  }
});

router.get("/articles/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const result = await pool.query(
      `
      SELECT
        id,
        title,
        slug,
        excerpt,
        body,
        category,
        article_template,
        cover_image,
        status,
        published_at,
        created_at,
        updated_at
      FROM articles
      WHERE slug = $1
        AND status = 'published'
      LIMIT 1
      `,
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Noticia no encontrada",
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error fetching article:", error);

    res.status(500).json({
      success: false,
      message: "Error al cargar la noticia",
    });
  }
});

export default router;