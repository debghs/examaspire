import * as migration_20250320_214306_update_timeline_block from './20250320_214306_update_timeline_block'

export const migrations = [
  {
    up: migration_20250320_214306_update_timeline_block.up,
    down: migration_20250320_214306_update_timeline_block.down,
    name: '20250320_214306_update_timeline_block',
  },
]
