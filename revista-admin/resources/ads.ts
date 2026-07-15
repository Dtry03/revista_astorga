import { randomUUID } from "node:crypto";
import { AdminForthDataTypes } from "adminforth";
import type { AdminForthResourceInput } from "adminforth";

const adsResource: AdminForthResourceInput = {
  dataSource: "maindb",
  table: "ads",
  resourceId: "ads",
  label: "Publicidad",

  recordLabel: (record) => String(record.name || "Anuncio"),

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
      name: "name",
      label: "Nombre del anuncio",
      type: AdminForthDataTypes.STRING,
      required: true,
      maxLength: 180,
      editingNote: {
        create: "Nombre interno para identificar el anuncio. Ejemplo: Restaurante La Maragata julio.",
        edit: "Nombre interno para identificar el anuncio.",
      },
    },

    {
      name: "placement",
      label: "Ubicación",
      type: AdminForthDataTypes.STRING,
      required: true,
      enum: [
        {
          value: "billboard_970x250",
          label: "Billboard 970x250",
        },
        {
          value: "leaderboard_728x90",
          label: "Leaderboard 728x90",
        },
        {
          value: "rectangle_336x280",
          label: "Rectángulo 336x280",
        },
        {
          value: "sidebar_300x250",
          label: "Sidebar 300x250",
        },
        {
          value: "sidebar_300x600",
          label: "Sidebar 300x600",
        },
      ],
      editingNote: {
        create: "Elige dónde aparecerá el anuncio en la web.",
        edit: "Elige dónde aparecerá el anuncio en la web.",
      },
    },

    {
      name: "image_url",
      label: "Imagen del anuncio",
      type: AdminForthDataTypes.STRING,
      required: true,
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
      name: "target_url",
      label: "Enlace destino",
      type: AdminForthDataTypes.STRING,
      required: false,
      showIn: {
        list: false,
      },
      editingNote: {
        create: "URL a la que irá el usuario al hacer clic. Ejemplo: https://negocio.com",
        edit: "URL a la que irá el usuario al hacer clic.",
      },
    },

    {
      name: "alt_text",
      label: "Texto alternativo",
      type: AdminForthDataTypes.STRING,
      required: false,
      showIn: {
        list: false,
      },
      editingNote: {
        create: "Texto descriptivo de la imagen. Ejemplo: Anuncio de Restaurante La Maragata.",
        edit: "Texto descriptivo de la imagen.",
      },
    },

    {
      name: "status",
      label: "Estado",
      type: AdminForthDataTypes.STRING,
      required: true,
      suggestOnCreate: "inactive",
      enum: [
        {
          value: "inactive",
          label: "Inactivo",
        },
        {
          value: "active",
          label: "Activo",
        },
      ],
    },

    {
      name: "starts_at",
      label: "Fecha inicio",
      type: AdminForthDataTypes.DATETIME,
      required: false,
      editingNote: {
        create: "Opcional. Si lo dejas vacío, puede mostrarse desde ya.",
        edit: "Opcional. Si lo dejas vacío, puede mostrarse desde ya.",
      },
    },

    {
      name: "ends_at",
      label: "Fecha fin",
      type: AdminForthDataTypes.DATETIME,
      required: false,
      editingNote: {
        create: "Opcional. Si lo dejas vacío, no caduca automáticamente.",
        edit: "Opcional. Si lo dejas vacío, no caduca automáticamente.",
      },
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

export default adsResource;