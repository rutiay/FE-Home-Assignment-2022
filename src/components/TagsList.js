import { useState } from "react";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import { randomColor } from "randomcolor";
import Swal from "sweetalert2";
import "./TagsList.css";

const TagsList = ({
  tags,
  setTags,
  currentPhoto,
  setCurrentPhoto,
  currentTag,
  setCurrentTag,
}) => {
  const [newTag, setNewTag] = useState("");
  const [editTag, setEditTag] = useState("");
  const [newTagName, setNewTagName] = useState("");
  const [searchTagName, setSearchTagName] = useState("");

  const addNewTag = (tagName) => {
    if (tags.some((tag) => tag.label === tagName) || !tagName) {
      Swal.fire("This tag already exists!");
      return;
    }
    const tagObj = { label: newTag, color: randomColor(), photos: [] };
    setTags([...tags, tagObj]);
    setNewTag("");
  };

  const editTagName = (tagName) => {
    if (tags.some((tag) => tag.label === newTagName) || !newTagName) {
      Swal.fire("Cannot change to an existing tag name");
      return;
    }
    setTags(
      [...tags].map((tag) => {
        if (tag.label === tagName) {
          tag.label = newTagName;
        }
        return tag;
      })
    );
    setNewTagName("");
    setCurrentTag("");
  };

  const deleteTag = (selectedTag) => {
    if (!selectedTag.photos.length) {
      setTags([...tags].filter((tag) => tag.label !== selectedTag.label));
    } else {
      Swal.fire({
        title:
          "Looks like you have some pictures on that list, are you sure you want to proceed?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          setTags([...tags].filter((tag) => tag.label !== selectedTag.label));

          Swal.fire("Deleted!", "Your list has been deleted.", "success");
        }
      });
    }
  };

  const tagPhoto = (selectedTag) => {
    setTags(
      [...tags].map((tag) => {
        if (tag.label === selectedTag.label) {
          if (!tag.photos.some((photo) => photo.id === currentPhoto.id)) {
            tag.photos.push(currentPhoto);
          } else {
            Swal.fire("This picture is already in that list");
          }
        }
        return tag;
      })
    );
    setCurrentPhoto("");
    setCurrentTag("");
  };

  const title = currentPhoto
    ? `photo ${currentPhoto?.userId} - Assigned tags`
    : "Available Tags";

  const style = { border: `1px solid ${currentTag.color}` };
  return (
    <div className="TagsListForm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addNewTag(newTag);
        }}
      >
        <input
          type="text"
          placeholder="New tag..."
          value={newTag}
          onChange={(e) => {
            setNewTag(e.target.value);
          }}
        />
        <input type="submit" value="save" />
      </form>
      <div className="TagListSearch">
        <p>Search tag:</p>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearchTagName(e.target.value)}
        />
      </div>
      <div className="TagsList">
        <p>{title}</p>
        {tags
          .filter((tagName) => {
            if (
              tagName.label.toLowerCase().includes(searchTagName.toLowerCase())
            ) {
              return tagName;
            }
          })
          .map((tag) => {
            return editTag === tag.label ? (
              <div key={tag.label} className="TagListInput">
                <input
                  type="text"
                  defaultValue={tag.label}
                  onChange={(e) => setNewTagName(e.target.value)}
                />
                <FcCheckmark
                  title="OK"
                  onClick={() => {
                    editTagName(editTag);
                  }}
                />
                <FcCancel
                  title="Cancel"
                  onClick={() => {
                    setEditTag("");
                    setCurrentTag("");
                  }}
                />
              </div>
            ) : (
              <li
                style={
                  (currentTag?.label === tag.label && style) || {
                    background: tag.color,
                  }
                }
                key={tag.label}
                onClick={() => setCurrentTag(tag)}
                onDoubleClick={() => setCurrentTag("")}
              >
                {tag.label}
                <span>
                  {
                    <AiOutlineEdit
                      title="Rename"
                      onClick={() => {
                        setEditTag(tag.label);
                      }}
                    />
                  }
                  {
                    <AiFillDelete
                      title="Delete"
                      onClick={() => deleteTag(tag)}
                    />
                  }
                </span>
              </li>
            );
          })}
      </div>
      {currentTag && currentPhoto ? (
        <button
          onClick={() => {
            tagPhoto(currentTag);
          }}
        >
          Apply
        </button>
      ) : null}
    </div>
  );
};

export default TagsList;
