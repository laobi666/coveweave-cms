import db from "@/lib/db";

export type ContentItem = {
  id: number;
  key: string;
  title: string;
  body: string;
  updated_at: string;
};

export function initContentTable() {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS contents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  const defaults = [
    {
      key: "home",
      title: "CoveWeave",
      body: "Premium swimwear and apparel manufacturing partner.",
    },
    {
      key: "about",
      title: "About Us",
      body: "We are a textile and garment manufacturer focused on quality products and long-term cooperation.",
    },
    {
      key: "capabilities",
      title: "Capabilities",
      body: "Custom fabrics, printing, sampling and garment production.",
    },
    {
      key: "contact",
      title: "Contact Us",
      body: "Contact us for your next collection.",
    },
    {
      key: "company",
      title: "Company Information",
      body: "Suzhou Qizhang Textile Co., Ltd.",
    },
  ];

  const insert = db.prepare(`
    INSERT OR IGNORE INTO contents 
    (key, title, body)
    VALUES
    (@key, @title, @body)
  `);

  for (const item of defaults) {
    insert.run(item);
  }
}

export function getContents() {
  initContentTable();

  return db
    .prepare(
      `
      SELECT *
      FROM contents
      ORDER BY id ASC
    `
    )
    .all() as ContentItem[];
}

export function getContent(key: string) {
  initContentTable();

  return db
    .prepare(
      `
      SELECT *
      FROM contents
      WHERE key = ?
    `
    )
    .get(key) as ContentItem | undefined;
}

export function updateContent(
  key: string,
  title: string,
  body: string
) {
  initContentTable();

  return db
    .prepare(
      `
      UPDATE contents
      SET 
        title = ?,
        body = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE key = ?
    `
    )
    .run(title, body, key);
}