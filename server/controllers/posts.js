import Post from "../models/Post.js";
import User from "../models/User.js";

/* Read */
export const createPost = async (req, res) => {
  try {
    /* Grab Request from the body */
    const { userId, caption, picturePath } = req.body;
    /* Fetch User using userId */
    const user = await User.findById(userId);
    /* Create A post using userinfo and requestbody */
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      caption,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    /* Save newly created post */
    await newPost.save();
    /* fetch updated post and send to frontend */
    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const userPosts = await Post.find({ userId: userId });
    res.status(200).json(userPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/* Update */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const commentPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    const post = await Post.findById(id);
    post.comments.push(comment);

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { comments: post.comments },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {}
};
