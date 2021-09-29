const { LostItem, FoundItem } = require("../models/item");
const itemValidation = require("../validations/item");

// Report Lost Item
exports.reportLostItem = async (req, res) => {
  try {
    // validate before creating new lost item post
    const { error } = itemValidation.lostItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // save new lost item post
    const lostItem = new LostItem({
      ...req.body,
      user: req.user.id,
    });
    await lostItem.save();

    res
      .status(201)
      .json({ status: "success", msg: "Lost item reported.", lostItem });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// Report Found Item
exports.reportFoundItem = async (req, res) => {
  try {
    // validate before creating new found item post
    const { error } = itemValidation.foundItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // save new found item post
    const foundItem = new FoundItem({
      ...req.body,
      user: req.user.id,
    });
    await foundItem.save();

    res
      .status(201)
      .json({ status: "success", msg: "Lost item reported.", foundItem });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// Get All Posts Created by Signed-In User
exports.getUserPosts = async (req, res) => {
  try {
    const lostItem = await LostItem.find({ user: req.user.id })
      .populate("user", "name")
      .sort({ date: -1 });
    const foundItem = await FoundItem.find({ user: req.user.id })
      .populate("user", "name")
      .sort({ date: -1 });
    if (lostItem.length === 0 && foundItem.length === 0)
      return res.status(200).json({
        status: "success",
        msg: "There are no lost or found item report!",
      });
    res.json({ lostItem, foundItem });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// Update Job Post
// exports.updateJobPost = async (req, res) => {
//   try {
//     let lostItem = await LostItem.findOne({ _id: req.params.id });
//     if (!lostItem)
//       return res.status(404).json({
//         status: "failed",
//         msg: `Item with ID ${req.params.id} not found!`,
//       });

//     // Limit job post changes via this route to only the following
//     const {
//       title,
//       description,
//       category,
//       location,
//       keyword,
//       objectives,
//       skillsRequired,
//       knowledgeRequired,
//     } = req.body;

//     // User can update or leave out any of these fields
//     if (title) job.title = title;
//     if (description) job.description = description;
//     if (category) job.category = category;
//     if (location) job.location = location;
//     if (objectives) job.objectives = objectives;
//     if (skillsRequired) job.skillsRequired = skillsRequired;
//     if (knowledgeRequired) job.knowledgeRequired = knowledgeRequired;
//     if (keyword) job.keyword = keyword;
//     await job.save();

//     res.status(200).json({
//       status: "success",
//       msg: "Job post has been updated",
//       job,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//     console.log(err);
//   }
// };

// Delete Job Post

// exports.deleteJobPost = async (req, res) => {
//   try {
//     const job = await Job.findByIdAndDelete(req.params.id);

//     if (!job)
//       return res.status(404).json({
//         status: "failed",
//         msg: `Job with ID ${req.params.id} not found!`,
//       });
//     res.status(200).json({
//       status: "success",
//       msg: `Job with ID ${job._id} successfully deleted.`,
//     });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
