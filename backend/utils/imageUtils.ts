import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagesDir = '../backend/images';
const fullDir = '/full';
const thumbsDir = '/thumbs';
const extensions: string[] = ['.jpg', '.jpeg', '.png', '.gif'];
const newFileName = (name: string, width: string, height: string): string => {
  name = path.parse(name).name;
  return width + 'x' + height + name + '.jpg';
};
//Check if the image exists, even with different extension
export const checkImage = async (name: string, width: string = '', height: string = ''): Promise<string | null> => {
  let filePath: string;
  if (width && height) {
    //add width and height to name
    name = newFileName(name, width, height);
    filePath = path.resolve(path.join(imagesDir, thumbsDir, name));
  } else {
    filePath = path.resolve(path.join(imagesDir, fullDir, name));
  }

  try {
    //if the file found with the right extension, return
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  } catch (err) {}

  //if not found check for different extension
  const noExtPath = path.join(path.parse(filePath).dir, path.parse(filePath).name);
  for (const ext of extensions) {
    try {
      if (fs.existsSync(noExtPath + ext)) {
        return noExtPath + ext;
      }
    } catch (err) {}
  }
  return null;
};

export const createThumb = async (filePath: string, width: string, height: string): Promise<string | null> => {
  const name = path.parse(filePath).name;
  const newName = newFileName(name, width, height);
  const thumbPath: string = path.resolve(path.join(imagesDir, thumbsDir, newName));

  try {
    await sharp(filePath)
      .resize({
        width: parseInt(width),
        height: parseInt(height),
      })
      .toFile(thumbPath);

    return thumbPath;
  } catch (error) {
    console.log(error);
    return null;
  }
  return null;
};
