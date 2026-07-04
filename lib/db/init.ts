import db from "./index";
import { schema } from "./schema";

export function initializeDatabase() {
  db.exec(schema);

  const count = db
    .prepare("SELECT COUNT(*) AS count FROM settings")
    .get() as { count: number };

  if (count.count === 0) {
    db.prepare(
      `
      INSERT INTO settings (
        site_name,
        company_name,
        email
      )
      VALUES (?, ?, ?)
      `
    ).run(
      "CoveWeave",
      "Suzhou Qizhang Textile Co., Ltd.",
      "info@example.com"
    );
  }

  console.log("✓ Database initialized");
}