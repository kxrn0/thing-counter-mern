import SCImage from "./Image.styled";

export default function Image({ src, alt }) {
  return (
    <SCImage className="image" src={src}>
      <span className="background"></span>
      <img src={src} alt={alt} />
    </SCImage>
  );
}
