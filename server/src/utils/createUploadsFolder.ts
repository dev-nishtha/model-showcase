import fs from 'fs';
import path from 'path';
 const UPLOADS_PATH = process.env.UPLOADS_FOLDER || path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOADS_PATH)) {
  fs.mkdirSync(UPLOADS_PATH);
}
export default UPLOADS_PATH;
