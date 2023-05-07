import { Link } from "react-router-dom";
import reimagine from "../../utilities/reimagine";
import SCCounter from "./Counter.styled";
import { useEffect, useState } from "react";

export default function Counter({ counter }) {
  const [url, setUrl] = useState();

  useEffect(() => {
    const url = reimagine([counter], "thumbnail")[0].url;

    setUrl(url);

    return () => URL.revokeObjectURL(url);
  }, []);

  return (
    <SCCounter>
      <Link to={`/counter/${counter._id}`} state={counter}>
        <p>name: {counter.name}</p>
        <p>count: {counter.count}</p>
        <p>index: {counter.index}</p>
        <img src={url} alt="counter image" />
        <p>{counter._id}</p>
        {counter.tags.map((tag) => (
          <span key={tag._id}>~~{tag.name}~~</span>
        ))}
      </Link>
    </SCCounter>
  );
}
