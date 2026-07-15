import express from "express";
import AdminForth from "adminforth";
import usersResource from "./resources/adminuser.js";
import { fileURLToPath } from "url";
import path from "path";
import { Filters } from "adminforth";
import { initApi } from "./api.js";
import { logger } from "adminforth";

import articlesResource from "./resources/articles.js";
import articlesApi from "./api/articlesApi.ts";

import adsResource from "./resources/ads.ts";
import adsApi from "./api/adsApi.ts";

import uploadApi from "./api/uploadApi.ts";
import uploadPage from "./api/uploadPage.ts";
import mediaFilesResource from "./resources/mediaFiles.ts";

const ADMIN_BASE_URL = "";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const admin = new AdminForth({
  baseUrl: ADMIN_BASE_URL,

  auth: {
    usersResourceId: "adminuser",
    usernameField: "email",
    passwordHashField: "password_hash",
    rememberMeDuration: "30d",
    loginBackgroundImage:
      "https://images.unsplash.com/photo-1534239697798-120952b76f2b?q=80&w=3389&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    loginBackgroundPosition: "1/2",
    loginPromptHTML: async () => {
      const adminforthUserExists =
        (await admin.resource("adminuser").count(Filters.EQ("email", "adminforth"))) > 0;

      if (adminforthUserExists) {
        return "Please use <b>adminforth</b> as username and <b>adminforth</b> as password";
      }
    },
  },

  customization: {
    brandName: "revista-admin",
    title: "revista-admin",
    favicon: "@@/assets/favicon.png",
    brandLogo: "@@/assets/logo.svg",
    datesFormat: "DD MMM",
    timeFormat: "HH:mm a",
    showBrandNameInSidebar: true,
    showBrandLogoInSidebar: true,
    emptyFieldPlaceholder: "-",
    styles: {
      colors: {
        light: {
          primary: "#1a56db",
          sidebar: {
            main: "#f9fafb",
            text: "#213045",
          },
        },
        dark: {
          primary: "#82ACFF",
          sidebar: {
            main: "#1f2937",
            text: "#9ca3af",
          },
        },
      },
    },
  },

  dataSources: [
    {
      id: "maindb",
      url: `${process.env.DATABASE_URL}`,
    },
  ],

  resources: [
    usersResource,
    articlesResource,
    adsResource,
    mediaFilesResource,
  ],

  menu: [
    {
      homepage: true,
      label: "Noticias",
      icon: "flowbite:newspaper-solid",
      resourceId: "articles",
    },
    {
      label: "Publicidad",
      icon: "flowbite:rectangle-list-solid",
      resourceId: "ads",
    },

    {
  label: "Medios",
  icon: "flowbite:image-solid",
  resourceId: "media_files",
},
{
  label: "Subir imagen",
  path: "/subir-imagen",
  icon: "flowbite:upload-solid",
  component: "@@/MediaUpload.vue",
},

    {
      type: "gap",
    },
    {
      type: "divider",
    },
    {
      type: "heading",
      label: "Sistema",
    },

    {
      label: "Usuarios",
      icon: "flowbite:user-solid",
      resourceId: "adminuser",
    },
  ],
});

if (__filename === path.resolve(process.argv[1])) {
  const app = express();

  app.use(express.json());

  app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
  );

  app.use("/api", articlesApi);
  app.use("/api", adsApi);
  app.use("/api", uploadApi);
  app.use(uploadPage);

  initApi(app, admin);

  const port = 3500;

  admin.bundleNow({ hotReload: process.env.NODE_ENV === "development" }).then(() => {
    logger.info("Bundling AdminForth SPA done.");
  });

  admin.express.serve(app);

  admin.discoverDatabases().then(async () => {
    if ((await admin.resource("adminuser").count()) === 0) {
      await admin.resource("adminuser").create({
        email: "adminforth",
        password_hash: await AdminForth.Utils.generatePasswordHash("adminforth"),
        role: "superadmin",
      });
    }
  });

  admin.express.listen(port, () => {
    logger.info(
      `\x1b[38;5;249m ⚡ AdminForth is available at\x1b[1m\x1b[38;5;46m http://localhost:${port}${ADMIN_BASE_URL}\x1b[0m\n`
    );
  });
}