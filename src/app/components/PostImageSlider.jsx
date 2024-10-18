import { Carousel } from "antd";

const PostImageSlider = ({ images }) => {

  if (!images || images.length === 0) {
    images = ["https://via.placeholder.com/150"];
  }

  return (
    <div style={{ width: "100%", maxWidth: "100%", height: "60vh" }}>
      {" "}
      {/* Container */}
      <Carousel dots={true} autoplay={true} autoplaySpeed={2000} arrows={true}>
        {images.map((img, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "60vh",
            }}
          >
            <img
              src={img}
              alt={`Image ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default PostImageSlider;
