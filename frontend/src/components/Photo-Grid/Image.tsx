interface Props {
  src: string;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  className?: string;
  showNumber?: number;
}

const Image: React.FC<Props> = ({
  src,
  height,
  width,
  style,
  className,
  showNumber,
}) => {
  return showNumber ? (
    <div
      style={{ width, height, padding: 0, position: "relative" }}
      className={className}
    >
      <img
        height="100%"
        width="100%"
        src={src}
        style={{ ...style, filter: "brightness(28%)" }}
      />
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "white",
          transform:'translate(-50%, -50%)'
        }}
      >
        +{showNumber}
      </span>
    </div>
  ) : (
    <img
      src={src}
      height={height}
      width={width}
      style={style}
      className={className}
    />
  );
};

export default Image;
