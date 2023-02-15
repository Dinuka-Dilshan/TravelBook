import "./grid.css";
import Image from "./Image";

interface Props {
  images: any[];
  width: string;
  height: number;
  onClick: () => void;
}

const Grid: React.FC<Props> = ({ images, height, width, onClick }) => {
  return (
    <div className="row m-0" style={{ width, height }} onClick={onClick}>
      {images.length === 1 && (
        <Image
          className="col-12"
          src={images[0].src}
          height={`${height}px`}
          width={`${width}px`}
          style={{ objectFit: "cover", padding: 0 }}
        />
      )}
      {images.length === 2 &&
        images.map((image,index) => {
          return (
            <Image
              className="col-6"
              key={index}
              src={image.src}
              height={`${height}px`}
              style={{ objectFit: "cover", padding: 0 }}
            />
          );
        })}
      {images.length === 3 && (
        <>
          <Image
            className="col-12"
            src={images[0].src}
            height={`${height / 2}px`}
            style={{ objectFit: "cover", padding: 0 }}
          />
          {images.slice(1).map((image,index) => {
            return (
              <Image
                className="col-6"
                key={index}
                src={image.src}
                height={`${height / 2}px`}
                style={{ objectFit: "cover", padding: 0 }}
              />
            );
          })}
        </>
      )}
      {images.length === 4 && (
        <>
          <Image
            className="col-12"
            src={images[0].src}
            height={`${(height / 3) * 2}px`}
            style={{ objectFit: "cover", padding: 0 }}
          />
          {images.slice(1).map((image,index) => {
            return (
              <Image
                className="col-4"
                height={`${(height / 3) * 1}px`}
                key={index}
                src={image.src}
                style={{ objectFit: "cover", padding: 0 }}
              />
            );
          })}
        </>
      )}
      {images.length === 5 && (
        <>
          {images.slice(0, 2).map((image,index) => {
            return (
              <Image
                className="col-6"
                key={index}
                src={image.src}
                height={`${(height / 3) * 2}px`}
                style={{ objectFit: "cover", padding: 0 }}
              />
            );
          })}
          {images.slice(2).map((image,index) => {
            return (
              <Image
                className="col-4"
                key={index}
                src={image.src}
                height={`${(height / 3) * 1}px`}
                style={{ objectFit: "cover", padding: 0 }}
              />
            );
          })}
        </>
      )}
      {images.length > 5 && (
        <>
          {images.slice(0, 2).map((image,index) => {
            return (
              <Image
                className="col-6"
                key={index}
                src={image.src}
                height={`${(height / 3) * 2}px`}
                style={{ objectFit: "cover", padding: 0 }}
              />
            );
          })}
          {images.slice(2, 4).map((image,index) => {
            return (
              <Image
                className="col-4"
                key={index}
                src={image.src}
                height={`${(height / 3) * 1}px`}
                style={{ objectFit: "cover", padding: 0 }}
              />
            );
          })}
          <Image
            className="col-4"
            src={images[4].src}
            height={`${(height / 3) * 1}px`}
            showNumber={images.length - 5}
            style={{ objectFit: "cover", padding: 0 }}
          />
        </>
      )}
    </div>
  );
};

export default Grid;
