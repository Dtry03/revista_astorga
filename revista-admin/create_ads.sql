CREATE TABLE IF NOT EXISTS ads (
  id TEXT PRIMARY KEY,

  name TEXT NOT NULL,
  placement TEXT NOT NULL,

  image_url TEXT NOT NULL DEFAULT '',
  target_url TEXT NOT NULL DEFAULT '',
  alt_text TEXT NOT NULL DEFAULT '',

  status TEXT NOT NULL DEFAULT 'inactive'
    CHECK (status IN ('active', 'inactive')),

  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ads_placement_idx ON ads(placement);
CREATE INDEX IF NOT EXISTS ads_status_idx ON ads(status);
CREATE INDEX IF NOT EXISTS ads_dates_idx ON ads(starts_at, ends_at);

CREATE OR REPLACE FUNCTION update_ads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_ads_updated_at ON ads;

CREATE TRIGGER trigger_update_ads_updated_at
BEFORE UPDATE ON ads
FOR EACH ROW
EXECUTE FUNCTION update_ads_updated_at();
