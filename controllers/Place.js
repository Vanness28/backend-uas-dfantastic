import Place from "../models/PlaceModel.js";

export const getPlaces = async (req, res) => {
  try {
    const response = await Place.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getPlaceById = async (req, res) => {
  try {
    const response = await Place.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createPlace = async (req, res) => {
  try {
    await Place.create(req.body);
    res.status(201).json({ msg: "Place Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePlace = async (req, res) => {
  try {
    await Place.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Place Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePlace = async (req, res) => {
  try {
    await Place.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Place Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
