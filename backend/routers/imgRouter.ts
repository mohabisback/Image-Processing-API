import express from 'express';
import { checkImage, createThumb } from '../utils/imageUtils';

const router = express.Router({ mergeParams: true });

router.route('/:img').get(async (req, res, next) => {
  //res.status(200).sendFile()
  const fileName: string = req.params.img;
  let width: string = req.query.width as string;
  let height: string = req.query.height as string;

  //if only one exists, then it is a square
  if (!width || !height) {
    if (width) {
      height = width;
    } else if (height) {
      width = height;
    }
  }

  const existedImage = await checkImage(fileName, width, height);
  if (existedImage) {
    res.status(200).sendFile(existedImage); //return existed image

    //so if no dimensions, we already checked the full imaged no exist
  } else if (height && width) {
    const fullImagePath = await checkImage(fileName, undefined, undefined);
    if (fullImagePath) {
      const newThumb = await createThumb(fullImagePath, width, height);
      if (newThumb) {
        res.status(200).sendFile(newThumb); //return created Thumb
      } else {
        res.status(404).send('Cant create thumb.');
      }
    } else {
      res.status(404).send('Image not found.');
    }
  } else {
    res.status(404).send('Image not found.');
  }
  next()
});

export default router;
