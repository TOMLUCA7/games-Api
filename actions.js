import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import Game from "./models/game.js";
import Genre from "./models/genre.js";
import Account from "./models/account.js";
import bcryptjs from "bcryptjs";

router.post("/createGame", async (req, res) => {
  const { genreId, gameName, gamePrice, gameDescription, gameImage } = req.body;
  const id = new mongoose.Types.ObjectId();

  const _newgame = new Game({
    _id: id,
    genreId: genreId,
    gameName: gameName,
    gamePrice: gamePrice,
    gameDescription: gameDescription,
    gameImage: gameImage,
  });
  _newgame
    .save()
    .then((results) => {
      return res.status(200).json({
        message: results,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
});

router.post("/createGenre", async (req, res) => {
  const { genreName, genreDesc } = req.body;
  const id = new mongoose.Types.ObjectId();

  const _newgenre = new Genre({
    _id: id,
    genreName: genreName,
    genreDesc: genreDesc,
  });
  _newgenre
    .save()
    .then((results) => {
      return res.status(200).json({
        message: results,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
});

router.get("/readAllGames", async (req, res) => {
  Game.find()
    .populate("genreId")
    .then((gamesList) => {
      return res.status(200).json({
        message: gamesList,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
});

router.get("/readAllGenres", async (req, res) => {
  Genre.find()
    .then((genresList) => {
      return res.status(200).json({
        message: genresList,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
});

router.delete("/deleteGame/:gid", async (req, res) => {
  const gid = req.params.gid;
  Game.findByIdAndDelete(gid)
    .then((results) => {
      return res.status(200).json({
        message: "Game deleted!",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
});

router.put("/updateGame/:gid", async (req, res) => {
  const gid = req.params.gid;
  const {
    genreId,
    gameName,
    gamePrice,
    gameDescription,
    gameImage,
    isAvailable,
  } = req.body;

  Game.findById(gid)
    .then((game) => {
      game.gamePrice = gamePrice;
      game.isAvailable = isAvailable;
      game.genreId = genreId;
      game.gameDescription = gameDescription;
      game.gameImage = gameImage;
      game.gameName = gameName;

      game
        .save()
        .then((game_updated) => {
          return res.status(200).json({
            message: game_updated,
          });
        })
        .catch((error) => {
          return res.status(500).json({
            message: error.message,
          });
        });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
});

router.get("/readGameById/:gid", async (req, res) => {
  const gid = req.params.gid;
  Game.findById(gid)
    .populate("genreId")
    .then((game) => {
      return res.status(200).json({
        message: game,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
});

router.get("/readGamesByGenre/:genId", async (req, res) => {
  const genId = req.params.genId;
  Game.find({ genreId: genId })
    .then((gamesList) => {
      return res.status(200).json({
        message: gamesList,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
});

router.get("/searchAllGames", async (req, res) => {
  const { genreId, priceRange, search } = req.query;
  let filter = {};

  if (genreId) {
    filter.genreId = genreId;
  }

  if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split("-");
    filter.gamePrice = {
      gte: minPrice,
      lte: maxPrice,
    };
  }

  if (search) {
    filter.gameName = { $regex: search, $options: "i" };
  }

  Game.find(filter)
    .populate("genreId")
    .then((gamesList) => {
      return res.status(200).json({
        message: gamesList,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
      });
    });
});

router.put("/requestToChangePassword", async (req, res) => {
  const { email } = req.body;
  Account.findOne({ email: email })
    .then((account) => {
      if (account) {
        return res.status(200).json({
          permission: true,
        });
      } else {
        return res.status(200).json({
          permission: false,
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        error: error.message,
      });
    });
});

router.put("/changePassword", async (req, res) => {
  const { email, password } = req.body;
  Account.findOne({ email: email })
    .then(async (account) => {
      const hash = await bcryptjs.hash(password, 10);
      console.log(account);
      account.password = hash;
      return account.save().then(() => {
        return res.status(200).json({
          succses: true,
        });
      });
    })
    .catch((error) => {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
      return res.status(500).json({
        succses: false,
      });
    });
});

export default router;
