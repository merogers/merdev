const { ObjectId } = require("mongodb");
const Blog = require("../models/blogModel");

// GET - and Sort Latest 5 Blog Posts

const getLatestBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ updatedAt: -1 }).limit(5);
    res.status(201).send(blogs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error establishing database connection", error });
  }
};

// GET - All blogs by user ID

const getUserBlogs = async (req, res) => {
  const user = req.params.id;
  try {
    const blogs = await Blog.find({ user: ObjectId(user) }).sort({
      updatedAt: -1,
    });
    res.status(201).send(blogs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error establishing database connection", error });
  }
};

// GET - One Blog Details

const getBlogDetails = async (req, res) => {
  try {
    const slug = req.params.slug;
    const blog = await Blog.findOne({ slug });
    res.status(200).json(blog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error establishing database connection", error });
  }
};

// POST - Add new blog entry

const postNewBlog = async (req, res) => {
  const { title, description, entry, user, firstName, lastName } = req.body;
  try {
    const newBlog = await Blog.create({
      title,
      description,
      entry,
      user,
      firstName,
      lastName,
    });
    newBlog.save();
    res.status(201).json(newBlog);
  } catch {
    res.status(400).json({ message: "Blog post creation failed" });
  }
};

// PUT - Update Blog Entry

const putBlog = async (req, res) => {
  const { slug } = req.body;
  try {
    const blog = await Blog.findOne({ slug: slug });
    console.log(blog);
    Object.assign(blog, req.body);
    blog.save();
    res.status(201).json({ message: "Post updated successfully" });
  } catch {
    res.status(400).json({ message: "Blog post update failed" });
  }
};

// DELETE - Delete blog by ID

const deleteBlogById = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.deleteOne({ _id: ObjectId(id) });
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error establishing database connection", error });
  }
};

module.exports = {
  postNewBlog,
  getLatestBlogs,
  getBlogDetails,
  getUserBlogs,
  deleteBlogById,
  putBlog,
};
