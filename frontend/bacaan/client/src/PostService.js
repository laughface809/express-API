import axios from 'axios';

const url = 'http://localhost:3003/buku/'

class PostService{
  //Get Posts
  static async getPosts() {
    const response = await fetch(url);
    const data = await response.json();

    return data.map(post => ({
      ...post,
      createdAt: new Date(post.createdAt)
    }));
  }

  //Create Posts
  static insertPost(text){
    return axios.post(url, {
      text
    });
  }

  //Delete Posts
  static deletePost(id){
      return axios.delete(`${url}${id}`);
  }
}

export default PostService;
