import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import reimagine from "../../utilities/reimagine";
import count from "../../utilities/count";
import SCCounter from "./Counter.styled";
import Drawer from "../Drawer/Drawer";
import Image from "../Image/Image";
import useAuthContext from "../../hooks/useAuthContext";
import useCounterContext from "../../hooks/useCounterContext";

export default function Counter({ counter }) {
  const { user } = useAuthContext();
  const { dispatch } = useCounterContext();
  const [url, setUrl] = useState();
  const [innerCount, setInnerCount] = useState(counter.count);

  async function count_internally(event, amount) {
    event.preventDefault();

    try {
      const res = await count(amount, counter._id, user.token, dispatch);

      setInnerCount(res.count);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const url = reimagine([counter], "thumbnail")[0].url;

    setUrl(url);

    return () => URL.revokeObjectURL(url);
  }, []);

  return (
    <SCCounter>
      <Drawer
        top={
          <Link to={`/counter/${counter._id}`} state={counter._id}>
            <Image src={url} alt="alternative" />
            <p className="name">{counter.name}</p>
            <div className="count">
              <button onClick={(event) => count_internally(event, 1)}>
                <FontAwesomeIcon icon={faPlusCircle} />
              </button>
              <p>{innerCount}</p>
              <button onClick={(event) => count_internally(event, -1)}>
                <FontAwesomeIcon icon={faMinusCircle} />
              </button>
            </div>
          </Link>
        }
      >
        {counter.tags.map((tag) => (
          <span className="tag" key={`${counter._id}-${tag.name}`}>
            #{tag.name}
          </span>
        ))}
      </Drawer>
    </SCCounter>
  );
}
