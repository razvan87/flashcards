import Card from "../models/Card.js";

//GET /api/categories
export const getCategories = async (req, res) => {
  const categories = Card.schema.path("category").enumValues;
  res.json(categories);
}

//PATCH /api/cards/:id
export const updateCard = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCard = await Card.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.json(updatedCard);
  } catch (error) {
    console.error("Error updating favorite status:", error);
    res.status(500).json({ message: "Server error" });
  }
}  

//PUT /api/cards/:id
export const editCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, level, meanings, category } = req.body;

    let imageUrl = "";
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const parsedMeanings = typeof meanings === "string" ? JSON.parse(meanings) : meanings;

    const updatedCard = await Card.findByIdAndUpdate(
      id,
      { text, imageUrl, level, meanings: parsedMeanings, category },
      { new: true, runValidators: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.json(updatedCard);
  } catch (error) {
    console.error("Error editing card:", error);
    res.status(500).json({ message: "Server error" });
  }
}

//DELETE /api/cards/:id
export const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCard = await Card.findByIdAndDelete(id);

    if (!deletedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.json({ message: "Card deleted successfully" });
  } catch (error) {
    console.error("Error deleting card:", error);
    res.status(500).json({ message: "Server error" });
  }
};


//POST api/cards
export const createCard = async (req, res) => {
  try {
    const { text, level, meanings, category } = req.body;

    // Multer saves the file info in req.file
    let imageUrl = "";
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`; // or your public URL path
    }  

    // meanings come as JSON string, parse it
    const parsedMeanings = typeof meanings === "string" ? JSON.parse(meanings) : meanings;

    const newCard = new Card({
      text,
      imageUrl,
      level,
      meanings: parsedMeanings,
      category,
    });

    const savedCard = await newCard.save();
    res.status(201).json(savedCard);
  } catch (error) {
    console.error("Error creating card:", error);
    res.status(500).json({ message: "Server error"  + error.message });
  }
};

// GET /api/cards
export const getCards = async (req, res) => {
  try {
    const {
      category,
      level,
      partOfSpeech,
      search,
      sort = "createdAt",
      favorite,
    } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;

    const filter = {};

    // Filter by category
    if (category && category !== "All") {
      filter.category = category;
    }

    // Filter by level
    if (level) {
      filter.level = level;
    }

    // Filter by partOfSpeech inside meanings array
    if (partOfSpeech) {
      filter["meanings.partOfSpeech"] = partOfSpeech;
    }

    // Filter by favorite
    if (favorite !== undefined) {
      filter.favorite = favorite === "true";
    }

    // Search by text (case insensitive)
    if (search) {
      filter.text = {
        $regex: search,
        $options: "i",
      };
    }

    const skip = (page - 1) * limit;

    const cards = await Card.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await Card.countDocuments(filter);

    const host = `${req.protocol}://${req.get("host")}`;
    const cardsWithFullImages = cards.map(card => {
      const cardObj = card.toObject();
      if (cardObj.imageUrl) {
        cardObj.imageUrl = `${host}${cardObj.imageUrl}`;
      }
      return cardObj;
    });

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: cardsWithFullImages,
    });
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ message: "Server error" });
  }
};
