import TomohonLoka from "../models/TomohonLokaModel.js";
import path from "path";
import fs from "fs";

export const getTomohonLokas = async (req, res) => {
  // SELECT * FROM tomohonloka
  try {
    const response = await TomohonLoka.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getTomohonLokaById = async (req, res) => {
  // SELECT * FROM tomohonloka WHER id = ?
  try {
    const response = await TomohonLoka.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createTomohonLoka = async (req, res) => {
  // INSERT INTO tomohonloka VALUES (...)
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const { name, lokasi, desk, placeId } = req.body;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await TomohonLoka.create({
        name: name,
        lokasi: lokasi,
        desk: desk,
        image: fileName,
        url: url,
        placeId: placeId,
      });
      res.status(201).json({ msg: "TomohonLoka Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updateTomohonLoka = async (req, res) => {
  // UPDATE tomohonloka SET (...) WHERE id = ?
  const tomohonloka = await TomohonLoka.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!tomohonloka) return res.status(404).json({ msg: "No Data Found" });

  let fileName = "";
  if (req.files === null) {
    fileName = tomohonloka.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${tomohonloka.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const { name, lokasi, desk, placeId } = req.body;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await TomohonLoka.update(
      { name: name, lokasi: lokasi, desk: desk, placeId: placeId, image: fileName, url: url },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "TomohonLoka Updated Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteTomohonLoka = async (req, res) => {
  // DELETE FROM tomohonloka WHERE id = ?
  const tomohonloka = await TomohonLoka.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!tomohonloka) return res.status(404).json({ msg: "No Data Found" });

  try {
    const filepath = `./public/images/${tomohonloka.image}`;
    fs.unlinkSync(filepath);
    await TomohonLoka.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "TomohonLoka Deleted Successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const getRestoran = async (req, res) => {
  try {
    const response = await TomohonLoka.findAll({
      where: {
        placeId: 2,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

export const getDestinasi = async (req, res) => {
  try {
    const response = await TomohonLoka.findAll({
      where: {
        placeId: 1,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};
