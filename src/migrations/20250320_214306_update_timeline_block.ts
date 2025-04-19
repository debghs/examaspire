import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // First handle the timeline block tables
  await db.execute(sql`
    -- Drop existing timeline block related tables if they exist
    DROP TABLE IF EXISTS pages_blocks_timeline_items;
    DROP TABLE IF EXISTS pages_blocks_timeline;

    -- Create timeline block table
    CREATE TABLE IF NOT EXISTS pages_blocks_timeline (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_name" varchar,
      "layout_style" enum_pages_blocks_timeline_layout_style DEFAULT 'vertical',
      "layout_density" enum_pages_blocks_timeline_layout_density DEFAULT 'default',
      "layout_connector" enum_pages_blocks_timeline_layout_connector DEFAULT 'solid'
    );

    -- Create timeline items table
    CREATE TABLE IF NOT EXISTS pages_blocks_timeline_items (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "date" varchar NOT NULL,
      "content_title" varchar NOT NULL,
      "content_description" jsonb NOT NULL,
      "content_media" integer REFERENCES "media"("id") ON DELETE SET NULL
    );

    -- Create indexes for better performance
    CREATE INDEX IF NOT EXISTS idx_timeline_parent_id ON pages_blocks_timeline("_parent_id");
    CREATE INDEX IF NOT EXISTS idx_timeline_items_parent_id ON pages_blocks_timeline_items("_parent_id");
  `)

  // Then handle the video source enum update
  await db.execute(sql`DROP TYPE IF EXISTS "enum__pages_v_blocks_video_source" CASCADE;`)
  await db.execute(
    sql`CREATE TYPE "enum__pages_v_blocks_video_source" AS ENUM ('upload', 'youtube');`,
  )
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_video" 
    ALTER COLUMN source TYPE "enum__pages_v_blocks_video_source" 
    USING source::text::"enum__pages_v_blocks_video_source";
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // First revert the video source enum
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_video" 
    ALTER COLUMN source TYPE varchar 
    USING source::text;
  `)
  await db.execute(sql`DROP TYPE IF EXISTS "enum__pages_v_blocks_video_source";`)

  // Then revert the timeline block tables
  await db.execute(sql`
    -- Drop the tables and indexes in reverse order
    DROP INDEX IF EXISTS idx_timeline_items_parent_id;
    DROP INDEX IF EXISTS idx_timeline_parent_id;
    DROP TABLE IF EXISTS pages_blocks_timeline_items;
    DROP TABLE IF EXISTS pages_blocks_timeline;
  `)
}
