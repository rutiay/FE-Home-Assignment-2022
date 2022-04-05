import "./Unassigned.css";

const PhotosList = ({ photos, currentPhoto, setCurrentPhoto }) => {
  const photosElement = photos.map((photo) => {
    return (
      <div className="unassignedPhotoContainer" key={photo.id}>
        <img
          className={currentPhoto.id === photo.id ? "currentImg" : null}
          src={photo.download_url}
          alt=""
          onClick={() => setCurrentPhoto(photo)}
          onDoubleClick={() => setCurrentPhoto("")}
        />
        <span>photo {photo.userId}</span>
      </div>
    );
  });
  return (
    <div className="PhotosList">
      <span className="PhotoListTitle">Unassigned</span>
      <div className="PhotosListDiv">{photosElement}</div>
    </div>
  );
};

export default PhotosList;
