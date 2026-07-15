import express from "express";

const router = express.Router();

router.get("/media-upload", (_req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Subir imagen</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f5f5f5;
      padding: 40px;
      color: #111;
    }

    .box {
      max-width: 620px;
      margin: 0 auto;
      background: white;
      padding: 28px;
      border-radius: 14px;
      box-shadow: 0 10px 30px rgba(0,0,0,.08);
    }

    h1 {
      margin-top: 0;
      color: #B70041;
    }

    input[type="file"] {
      width: 100%;
      padding: 14px;
      border: 1px solid #ddd;
      border-radius: 10px;
      background: #fafafa;
      margin-bottom: 16px;
    }

    button {
      background: #B70041;
      color: white;
      border: 0;
      padding: 12px 18px;
      border-radius: 10px;
      font-weight: bold;
      cursor: pointer;
    }

    button:hover {
      opacity: .9;
    }

    .result {
      display: none;
      margin-top: 22px;
      padding: 16px;
      border: 1px solid #ddd;
      background: #fafafa;
      border-radius: 10px;
    }

    .url {
      word-break: break-all;
      font-family: monospace;
      background: white;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin: 10px 0;
    }

    img {
      max-width: 100%;
      margin-top: 16px;
      border-radius: 10px;
      border: 1px solid #ddd;
    }

    .error {
      color: #B70041;
      font-weight: bold;
      margin-top: 14px;
    }

    a {
      color: #B70041;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="box">
    <h1>Subir imagen</h1>

    <p>
      Sube una imagen y copia la URL generada para usarla en noticias o publicidad.
    </p>

    <form id="uploadForm">
      <input id="fileInput" type="file" name="file" accept="image/*" required />
      <button type="submit">Subir imagen</button>
    </form>

    <div id="error" class="error"></div>

    <div id="result" class="result">
      <strong>URL generada:</strong>

      <div id="urlBox" class="url"></div>

      <button id="copyButton" type="button">Copiar URL</button>

      <p>
        <a id="openLink" href="#" target="_blank" rel="noopener noreferrer">
          Abrir imagen
        </a>
      </p>

      <img id="preview" src="" alt="Vista previa" />
    </div>
  </div>

  <script>
    const form = document.getElementById("uploadForm");
    const fileInput = document.getElementById("fileInput");
    const result = document.getElementById("result");
    const errorBox = document.getElementById("error");
    const urlBox = document.getElementById("urlBox");
    const preview = document.getElementById("preview");
    const openLink = document.getElementById("openLink");
    const copyButton = document.getElementById("copyButton");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      errorBox.textContent = "";
      result.style.display = "none";

      const file = fileInput.files[0];

      if (!file) {
        errorBox.textContent = "Selecciona una imagen.";
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const json = await response.json();

        if (!response.ok || !json.success) {
          throw new Error(json.message || "Error al subir la imagen.");
        }

        const url = json.data.url;

        urlBox.textContent = url;
        preview.src = url;
        openLink.href = url;
        result.style.display = "block";
      } catch (error) {
        errorBox.textContent = error.message || "Error al subir la imagen.";
      }
    });

    copyButton.addEventListener("click", async () => {
      await navigator.clipboard.writeText(urlBox.textContent);
      copyButton.textContent = "Copiada";
      setTimeout(() => {
        copyButton.textContent = "Copiar URL";
      }, 1200);
    });
  </script>
</body>
</html>
  `);
});

export default router;
