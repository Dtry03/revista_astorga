import { AdminForthDataTypes } from "adminforth";
import type { AdminForthResourceInput } from "adminforth";

const mediaFilesResource: AdminForthResourceInput = {
  dataSource: "maindb",
  table: "media_files",
  resourceId: "media_files",
  label: "Medios",

  recordLabel: (record) => String(record.original_name || record.filename || "Archivo"),

  columns: [
    {
      name: "id",
      label: "ID",
      primaryKey: true,
      type: AdminForthDataTypes.STRING,
      showIn: {
        list: false,
        create: false,
        edit: false,
        filter: false,
      },
    },

    {
      name: "original_name",
      label: "Nombre original",
      type: AdminForthDataTypes.STRING,
      required: false,
    },

    {
      name: "filename",
      label: "Archivo",
      type: AdminForthDataTypes.STRING,
      required: false,
      showIn: {
        edit: false,
        create: false,
      },
    },

    {
      name: "url",
      label: "URL",
      type: AdminForthDataTypes.STRING,
      required: false,
      showIn: {
        create: false,
        edit: false,
      },
      editingNote: {
        create: "Copia esta URL para usarla en noticias o publicidad.",
        edit: "Copia esta URL para usarla en noticias o publicidad.",
      },
    },

    {
      name: "mime_type",
      label: "Tipo",
      type: AdminForthDataTypes.STRING,
      required: false,
      showIn: {
        edit: false,
        create: false,
      },
    },

    {
      name: "size_bytes",
      label: "Tamaño",
      type: AdminForthDataTypes.INTEGER,
      required: false,
      showIn: {
        edit: false,
        create: false,
      },
    },

    {
      name: "created_at",
      label: "Subido",
      type: AdminForthDataTypes.DATETIME,
      showIn: {
        create: false,
        edit: false,
      },
    },
  ],

  options: {
    listPageSize: 30,
    defaultSort: {
      columnName: "created_at",
      direction: "desc",
    },
    baseActionsAsQuickIcons: ["show", "delete"],
  },
};

export default mediaFilesResource;
