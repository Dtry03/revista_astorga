CREATE TABLE IF NOT EXISTS media_files (
  id TEXT PRIMARY KEY,

  filename TEXT NOT NULL,
  original_name TEXT NOT NULL DEFAULT '',
  url TEXT NOT NULL,
  mime_type TEXT NOT NULL DEFAULT '',
  size_bytes INTEGER NOT NULL DEFAULT 0,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS media_files_created_at_idx ON media_files(created_at);
CREATE INDEX IF NOT EXISTS media_files_mime_type_idx ON media_files(mime_type);
