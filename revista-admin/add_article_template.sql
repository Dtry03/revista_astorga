ALTER TABLE articles
ADD COLUMN IF NOT EXISTS article_template TEXT NOT NULL DEFAULT 'normal';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'articles_article_template_check'
  ) THEN
    ALTER TABLE articles
    ADD CONSTRAINT articles_article_template_check
    CHECK (article_template IN ('normal', 'zonaon', 'tendencias'));
  END IF;
END $$;
