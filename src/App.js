import { useState, useEffect } from "react";
import axios from "axios";
import Assigned from "./components/Assigned";
import Unassigned from "./components/Unassigned";
import TagsList from "./components/TagsList";
import "./App.css";

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [tags, setTags] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState("");
  const [currentTag, setCurrentTag] = useState("");

  const LOCAL_STORAGE_KEY = "tagsList";

  const getTags = () => {
    const tagsList = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (tagsList) setTags(JSON.parse(tagsList));
  };

  const updateTagsList = () => {
    const currentTagsList = JSON.stringify(tags);
    localStorage.setItem(LOCAL_STORAGE_KEY, currentTagsList);
  };

  useEffect(() => {
    let counterId = 1;
    const fetchPhotos = async () => {
      const { data } = await axios.get(
        "https://picsum.photos/v2/list?page=1&limit=9"
      );
      data.map((item) => (item["userId"] = counterId++));
      setPhotos(data);
    };

    fetchPhotos();
    getTags();
  }, []);

  useEffect(updateTagsList, [tags]);

  return (
    <div className="App">
      <TagsList
        tags={tags}
        setTags={setTags}
        currentPhoto={currentPhoto}
        setCurrentPhoto={setCurrentPhoto}
        currentTag={currentTag}
        setCurrentTag={setCurrentTag}
      />
      <Unassigned
        photos={photos}
        currentPhoto={currentPhoto}
        setCurrentPhoto={setCurrentPhoto}
      />
      <Assigned
        tags={tags}
        setTags={setTags}
      />
    </div>
  );
}
