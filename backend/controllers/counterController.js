const mongoose = require("mongoose");
const Counter = require("../models/counterModel");
const Tag = require("../models/tagModel");
const sxarp = require("sharp");

async function set_tags(tags, userId) {
  const newTags = [];
  const allTags = [];

  for (let tag of tags) {
    const reg = new RegExp(`^${tag}$`, "i");
    const currentTag = await Tag.findOne({ name: reg, userId });

    if (!currentTag) newTags.push(tag);
    else allTags.push(currentTag);
  }

  for (let tag of newTags) {
    const newTag = new Tag({ name: tag, userId });

    await newTag.save();

    allTags.push(newTag);
  }
  return allTags;
}

exports.get_page = async (req, res) => {
  const { page, items, padLeft, padRight } = req.body;
  const skip = ~~((page - 1) * items) + padLeft;
  const userId = req.user._id;

  console.log(`left pad: ${padLeft}, right pad: ${padRight}`);

  console.log(`page: ${page}, skip: ${skip}`);

  try {
    const counters = await Counter.find(
      { userId },
      "count name thumbnail createdAt tags"
    )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(items - padRight)
      .populate("tags", "name");

    console.log("rurning:");
    console.log(counters.map((counter) => counter.name));

    res.status(200).json({ counters });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
};

exports.get_description = async (req, res) => {
  const id = req.params.id;

  const counter = await Counter.findById(id, "description");

  console.log("describing:");
  console.log(counter);
  res.status(200).json({ counter });
};

exports.get_image = async (req, res) => {
  const id = req.params.id;

  const counter = await Counter.findById(id, "image");

  console.log("imagining:");
  console.log(counter._id);

  res.status(200).json({ counter });
};

exports.get_tags = async (req, res) => {
  const userId = req.user._id;

  try {
    const tags = await Tag.find({ userId });

    res.status(200).json(tags);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
};

exports.add_tag_to_counter = async (req, res) => {
  const counterId = req.params.id;
  const tagId = req.body.tagId;
  const counter = await Counter.findById(counterId);

  counter.tags.push(tagId);
  await counter.save();

  console.log("counter id:");
  console.log(counterId);
  console.log("tag id:");
  console.log(tagId);

  res.status(200).json({ message: "done!" });
};

exports.delete_tag = async (req, res) => {
  const id = req.params.id;
  const tag = await Tag.findById(id);

  res.status(200).json({ tag });
};

exports.get_count = async (req, res) => {
  const userId = req.user._id;
  const count = await Counter.countDocuments({ userId });

  res.status(200).json({ count });
};

exports.get_counter = async (req, res) => {};

exports.create_counter = async (req, res) => {
  try {
    const userId = req.user._id;
    const optimized = await sxarp(req.file.buffer)
      .jpeg({ quality: 70 })
      .toBuffer();
    const thumbnail = await sxarp(optimized).resize({ width: 200 }).toBuffer();
    const tags = await set_tags(JSON.parse(req.body.tags), userId);
    const reTags = tags.map((tag) => tag._id);
    const counter = new Counter({
      count: 0,
      name: req.body["name-input"],
      description: req.body["description-box"],
      image: {
        data: optimized,
        contentType: "image/jpeg",
      },
      thumbnail: {
        data: thumbnail,
        contentType: "image/jpeg",
      },
      userId,
      tags: reTags,
    });

    await counter.save();

    res.status(200).json({
      counter: {
        ...(({ image, ...rest }) => rest)(counter._doc),
        tags: tags.map((tag) => (({ userId, __v, ...rest }) => rest)(tag._doc)),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
};

exports.update_counter = async (req, res) => {
  const counterId = req.params.id;
  const amount = req.body.amount;

  if (!mongoose.Types.ObjectId.isValid(counterId))
    return res.status(404).json({ error: "Not a valid counter id!" });

  const counter = await Counter.findById(counterId, "count");

  if (!counter)
    return res.status(404).json({ error: "No counter with such id!" });

  console.log(`amount: ${req.body.amount}, type: ${typeof req.body.amount}`);

  counter.count += amount;

  await counter.save();

  res.status(200).json({ counter });
};

exports.patch_counter = async (req, res) => {};

exports.delete_counter = async (req, res) => {
  const { id } = req.params;

  const counter = await Counter.findByIdAndDelete(id);

  if (!counter) return res.status(401).json({ error: "No such counter!" });

  const { tags } = counter;
  const orphanedTags = [];

  for (let tag of tags) {
    const countersWithTag = await Counter.find({ tags: { $in: [tag] } });

    if (!countersWithTag.length) orphanedTags.push(tag);
  }

  await Tag.deleteMany({ _id: { $in: orphanedTags } });

  res.status(201).json({ message: "Deleted an item" });
};
