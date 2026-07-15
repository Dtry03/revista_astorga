import express from "express";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import pg from "pg";

const { Pool } = pg;

const router = express.Router();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.resolve(__dirname, "../uploads");

fs.mkdirSync(uploadsDir, {
  recursive: true,
});

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },

  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const safeName = `${Date.now()}-${randomUUID()}${extension}`;

    cb(null, safeName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      cb(new Error("Solo se permiten imágenes JPG, PNG, WEBP o GIF."));
      return;
    }

    cb(null, true);
  },
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No se ha subido ningún archivo.",
      });
    }

    const id = randomUUID();
    const url = `/uploads/${req.file.filename}`;

    await pool.query(
      `
      INSERT INTO media_files (
        id,
        filename,
        original_name,
        url,
        mime_type,
        size_bytes
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [
        id,
        req.file.filename,
        req.file.originalname,
        url,
        req.file.mimetype,
        req.file.size,
      ]
    );

    res.json({
      success: true,
      data: {
        id,
        url,
        filename: req.file.filename,
        original_name: req.file.originalname,
        mime_type: req.file.mimetype,
        size: req.file.size,
      },
    });
  } catch (error) {
    console.error("Error uploading file:", error);

    res.status(500).json({
      success: false,
      message: "Error al subir la imagen.",
    });
  }
});

export default router;
