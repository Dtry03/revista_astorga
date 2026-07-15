import { randomUUID } from "node:crypto";
import { AdminForthDataTypes } from "adminforth";
import type { AdminForthResourceInput } from "adminforth";

const articlesResource: AdminForthResourceInput = {
  dataSource: "maindb",
  table: "articles",
  resourceId: "articles",
  label: "Noticias",

  recordLabel: (record) => String(record.title || "Noticia"),

  columns: [
    {
      name: "id",
      label: "ID",
      primaryKey: true,
      type: AdminForthDataTypes.STRING,
      fillOnCreate: () => randomUUID(),
      showIn: {
        list: false,
        create: false,
        edit: false,
        filter: false,
      },
    },

    {
      name: "title",
      label: "Título",
      type: AdminForthDataTypes.STRING,
      required: true,
      maxLength: 180,
      editingNote: {
        create: "Titular principal de la noticia.",
        edit: "Titular principal de la noticia.",
      },
    },

    {
      name: "slug",
      label: "URL de la noticia",
      type: AdminForthDataTypes.STRING,
      required: true,
      isUnique: true,
      enforceLowerCase: true,
      maxLength: 180,
      editingNote: {
        create: "Ejemplo: agenda-cultural-astorga. Sin espacios, sin tildes y separado por guiones.",
        edit: "Ejemplo: agenda-cultural-astorga. Sin espacios, sin tildes y separado por guiones.",
      },
    },

    {
      name: "excerpt",
      label: "Entradilla",
      type: AdminForthDataTypes.TEXT,
      required: true,
      maxLength: 350,
      showIn: {
        list: false,
      },
      editingNote: {
        create: "Resumen corto que aparece debajo del titular en portada y listados.",
        edit: "Resumen corto que aparece debajo del titular en portada y listados.",
      },
    },

    {
      name: "body",
      label: "Contenido",
      type: AdminForthDataTypes.TEXT,
      required: false,
      showIn: {
        list: false,
        filter: false,
      },
      editingNote: {
        create: "Cuerpo completo de la noticia.",
        edit: "Cuerpo completo de la noticia.",
      },
    },

    {
      name: "category",
      label: "Sección",
      type: AdminForthDataTypes.STRING,
      required: true,
      suggestOnCreate: "Actualidad",
      enum: [
        { value: "León", label: "León" },
        { value: "Ponferrada", label: "Ponferrada" },
        { value: "Astorga", label: "Astorga" },
        { value: "Bañeza", label: "Bañeza" },
        { value: "Deportes", label: "Deportes" },
        { value: "Motor", label: "Motor" },
        { value: "ZonaON", label: "ZonaON" },
        { value: "#tendencias", label: "#tendencias" },
        { value: "Tablón", label: "Tablón" },
        { value: "Actualidad", label: "Actualidad" },
      ],
    },
    {
  name: "article_template",
  label: "Plantilla",
  type: AdminForthDataTypes.STRING,
  required: true,
  suggestOnCreate: "normal",
  enum: [
    {
      value: "normal",
      label: "Normal",
    },
    {
      value: "zonaon",
      label: "ZonaON",
    },
    {
      value: "tendencias",
      label: "#tendencias",
    },
  ],
  editingNote: {
    create: "Elige el diseño visual con el que se mostrará esta noticia.",
    edit: "Elige el diseño visual con el que se mostrará esta noticia.",
  },
},

    {
      name: "cover_image",
      label: "Imagen principal",
      type: AdminForthDataTypes.STRING,
      required: false,
      showIn: {
        list: false,
      },
      components: {
        create: "@@/ImageUploadField.vue",
        edit: "@@/ImageUploadField.vue",
      },
      editingNote: {
        create: "Sube una imagen o pega una URL.",
        edit: "Sube una imagen o pega una URL.",
      },
    },

    {
      name: "status",
      label: "Estado",
      type: AdminForthDataTypes.STRING,
      required: true,
      suggestOnCreate: "draft",
      enum: [
        { value: "draft", label: "Borrador" },
        { value: "published", label: "Publicado" },
      ],
    },

    {
      name: "published_at",
      label: "Fecha de publicación",
      type: AdminForthDataTypes.DATETIME,
      required: false,
    },

    {
      name: "created_at",
      label: "Creado",
      type: AdminForthDataTypes.DATETIME,
      showIn: {
        create: false,
        edit: false,
      },
    },

    {
      name: "updated_at",
      label: "Actualizado",
      type: AdminForthDataTypes.DATETIME,
      showIn: {
        create: false,
        edit: false,
      },
    },
  ],

  options: {
    listPageSize: 20,
    defaultSort: {
      columnName: "created_at",
      direction: "desc",
    },
    baseActionsAsQuickIcons: ["show", "edit", "delete"],
  },
};

export default articlesResource;