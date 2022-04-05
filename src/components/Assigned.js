import { FcRemoveImage } from "react-icons/fc";
import "./Assigned.css";

const ListByTag = ({ tags, setTags }) => {
  const deleteTaggedPhoto = (selectedPhoto, tagName) => {
    setTags(
      [...tags].map((tag) => {
        if (tag.label === tagName) {
          tag.photos = tag.photos.filter(
            (photo) => photo.id !== selectedPhoto.id
          );
        }
        return tag;
      })
    );
  };

  return (
    <div className="ListByTagContainer">
      {tags.map((item) => {
        return (
          <table className="ListByTagTable" key={item.label}>
            <thead>
              <tr>
                <th style={{ background: item.color }}>{item.label}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {item.photos?.map((photo) => {
                  return (
                    <td key={photo.id}>
                      <img src={photo.download_url} alt="" />
                      <span>photo {photo.userId}</span>
                      <FcRemoveImage
                        title="Untag photo"
                        onClick={() => deleteTaggedPhoto(photo, item.label)}
                      />
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        );
      })}
    </div>
  );
};

export default ListByTag;
