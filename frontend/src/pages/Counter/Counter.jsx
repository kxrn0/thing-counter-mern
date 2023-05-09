import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import reimagine from "../../utilities/reimagine";
import count from "../../utilities/count";
import useAuthContext from "../../hooks/useAuthContext";
import useCounterContext from "../../hooks/useCounterContext";
import SCCounter from "./Counter.styled";
import Dialog from "../../components/Dialog/Dialog";
import Image from "../../components/Image/Image";
import Drawer from "../../components/Drawer/Drawer";
import useTagContext from "../../hooks/useTagContext";

export default function Counter() {
  const [url, setUrl] = useState(null);
  const [displaying, setDisplaying] = useState(false);
  const [counter, setCounter] = useState(null);
  const { state: counterId } = useLocation();
  const { user } = useAuthContext();
  const { counters, dispatch: dispatch_counter_action } = useCounterContext();
  const { tags } = useTagContext();
  const navigate = useNavigate();
  const imageRef = useRef(null);

  async function delete_counter() {
    try {
      const response = await fetch(
        `http://localhost:9999/api/counters/${counter._id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
          method: "DELETE",
        }
      );
      const json = await response.json();

      console.log(json);

      if (response.ok) {
        dispatch_counter_action({
          type: "DELETE_COUNTER",
          payload: { counterId: counter._id, index: counter.index },
        });
        navigate("/home/1");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function count_internally(event, amount) {
    event.preventDefault();

    try {
      const res = await count(
        amount,
        counter._id,
        user.token,
        dispatch_counter_action
      );

      setCounter((prev) => ({ ...prev, count: res.count }));
    } catch (error) {
      console.log(error);
    }
  }

  async function open_image() {
    if (displaying) setDisplaying(false);
    else {
      if (!imageRef.current) {
        let url;

        if (!counter.image) {
          console.log("downloading image...");

          const response = await fetch(
            `http://localhost:9999/api/counters/image/${counter._id}`,
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          );
          const json = await response.json();
          const { counter: counterRes } = json;

          url = reimagine([counterRes], "image")[0].url;

          dispatch_counter_action({
            type: "ADD_COUNTER_DETAIL",
            payload: {
              counterId: counterRes._id,
              key: "image",
              value: counterRes.image,
            },
          });
        } else {
          console.log("using existing image...");

          url = reimagine([counter], "image")[0].url;
        }
        imageRef.current = url;
      }
      setDisplaying(true);
    }
  }

  useEffect(() => {
    setCounter(counters.find((counter) => counter._id === counterId));
  }, []);

  useEffect(() => {
    return () => URL.revokeObjectURL(imageRef.current);
  }, []);

  useEffect(() => {
    if (counter) {
      const url = reimagine([counter], "thumbnail")[0].url;

      setUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [counter]);

  useEffect(() => {
    async function get_description() {
      const response = await fetch(
        `http://localhost:9999/api/counters/description/${counter._id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const json = await response.json();
      const { counter: counterRes } = json;

      dispatch_counter_action({
        type: "ADD_COUNTER_DETAIL",
        payload: {
          counterId: counterRes._id,
          key: "description",
          value: counterRes.description,
        },
      });
      setCounter((prev) => ({
        ...prev,
        description: counterRes.description,
      }));
    }

    if (
      counter &&
      counters.some((other) => other._id === counter._id && !other.description)
    )
      get_description();
  }, [counter]);

  return (
    <SCCounter>
      {counter && (
        <div>
          <Dialog shown={displaying} close={() => setDisplaying(false)}>
            <Image src={imageRef.current} alt={counter.name} />
          </Dialog>
          {/* <button>open dialog</button>
          <button onClick={() => console.log(counter)}>counter</button>
          <button onClick={delete_counter}>Delete Counter</button>
          <img src={url} alt="counter image" />
          <p>Counter page</p>
          <button onClick={(event) => count_internally(event, 1)}>+</button>
          <p>count: {counter.count}</p>
          <button onClick={(event) => count_internally(event, -1)}>-</button>
          <p>name: {counter.name}</p>
          <p>description: {counter.description}</p>
          <p>index: ${counter.index}</p>
          <button onClick={open_image}>
            {displaying ? "close" : "open"} image
          </button>
          {counter.tags.map((tag) => (
            <span key={tag._id}>~~{tag.name}~~</span>
          ))} */}
          {/* <Image src={url} alt={counter.name} /> */}

          <button>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <div className="head">
            <div onClick={open_image}>
              <Image src={url} alt={counter.name} />
            </div>
            <div>
              <h2 className="name">{counter.name}</h2>
              <p className="description">{counter.description}</p>
            </div>
          </div>
          <div className="count">
            <button>+</button>
            <p>{counter.count}</p>
            <button>-</button>
          </div>
          <div className="tags-section">
            <label htmlFor="tag-input">
              <input type="text" id="tag-input" />
              <button>#add_tag</button>
            </label>
            <div className="current-tags">
              {counter.tags.map((tag) => (
                <span key={tag.name} className="tag">
                  <button>x</button>
                  {tag.name}
                </span>
              ))}
              <Drawer top="Add from existing tags">
                {tags
                  .filter(
                    (tag) =>
                      !counter.tags.find((other) => other.name === tag.name)
                  )
                  .map((tag) => (
                    <span key={tag.name} className="tag">
                      <button>#{tag.name}</button>
                    </span>
                  ))}
              </Drawer>
            </div>
          </div>
        </div>
      )}
    </SCCounter>
  );
}
