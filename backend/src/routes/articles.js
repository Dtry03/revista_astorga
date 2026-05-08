const express = require("express");
const router = express.Router();
const pool = require("../db");

// Obtener artículos publicados
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM articles ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener artículos" });
  }
});

// Obtener un artículo por slug
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const result = await pool.query(
      "SELECT * FROM articles WHERE slug = $1",
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Artículo no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el artículo" });
  }
});

// Crear artículo
router.post("/", async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      cover_image,
      category,
      status,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO articles 
      (title, slug, excerpt, content, cover_image, category, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [title, slug, excerpt, content, cover_image, category, status]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al crear artículo" });
  }
});

// Editar artículo
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      slug,
      excerpt,
      content,
      cover_image,
      category,
      status,
    } = req.body;

    const result = await pool.query(
      `UPDATE articles
      SET title = $1,
          slug = $2,
          excerpt = $3,
          content = $4,
          cover_image = $5,
          category = $6,
          status = $7,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $8
      RETURNING *`,
      [title, slug, excerpt, content, cover_image, category, status, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al editar artículo" });
  }
});

// Borrar artículo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM articles WHERE id = $1", [id]);

    res.json({ message: "Artículo eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar artículo" });
  }
});

module.exports = router;