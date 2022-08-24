function ImageViewer({ imagePath }) {

    function checkURL(url) {
        return(url.match(/\.(jpeg|jpg|gif|png|svg|webp)$/) != null);
    }

    const defaultImgPath = "https://cdn-icons-png.flaticon.com/512/1053/1053244.png?w=360";

    return (
        <img className="profile-image" src={checkURL(imagePath) ? imagePath : defaultImgPath} alt="costumer_image" />
    )
}

export default ImageViewer;