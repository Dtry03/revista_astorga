DROP TABLE IF EXISTS articles CASCADE;

CREATE TABLE articles (
  id TEXT PRIMARY KEY,

  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  body TEXT NOT NULL DEFAULT '',

  category TEXT NOT NULL DEFAULT 'Actualidad',

  cover_image TEXT NOT NULL DEFAULT '',

  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published')),

  published_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX articles_status_idx ON articles(status);
CREATE INDEX articles_category_idx ON articles(category);
CREATE INDEX articles_published_at_idx ON articles(published_at);

CREATE OR REPLACE FUNCTION update_articles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_articles_updated_at
BEFORE UPDATE ON articles
FOR EACH ROW
EXECUTE FUNCTION update_articles_updated_at();
