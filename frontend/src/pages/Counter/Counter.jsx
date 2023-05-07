import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import reimagine from "../../utilities/reimagine";
import useAuthContext from "../../hooks/useAuthContext";
import useCounterContext from "../../hooks/useCounterContext";
import SCCounter from "./Counter.styled";

export default function Counter() {
  const [url, setUrl] = useState(null);
  const [displaying, setDisplaying] = useState(false);
  const [counter, setCounter] = useState(null);
  const { state: counterState } = useLocation();
  const { user } = useAuthContext();
  const { counters, dispatch: dispatch_counter_action } = useCounterContext();
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

  async function count(amount) {
    try {
      const response = await fetch(
        `http://localhost:9999/api/counters/${counter._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount }),
        }
      );
      const json = await response.json();
      const { counter: counterRes } = json;

      if (response.ok) {
        dispatch_counter_action({
          type: "COUNT",
          payload: { counterId: counterRes._id, count: counterRes.count },
        });
        setCounter((prev) => ({ ...prev, count: counterRes.count }));
      } else {
        console.log("not ok");
        throw new Error("Error updating counter!");
      }
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
    setCounter(counterState);
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
          <button onClick={() => console.log(counter)}>counter</button>
          <button onClick={delete_counter}>Delete Counter</button>
          <img src={url} alt="counter image" />
          <p>Counter page</p>
          <button onClick={() => count(1)}>+</button>
          <p>count: {counter.count}</p>
          <button onClick={() => count(-1)}>-</button>
          <p>name: {counter.name}</p>
          <p>description: {counter.description}</p>
          <p>index: ${counter.index}</p>
          <button onClick={open_image}>
            {displaying ? "close" : "open"} image
          </button>
          {counter.tags.map((tag) => (
            <span key={tag._id}>~~{tag.name}~~</span>
          ))}
          {displaying && (
            <img src={imageRef.current} alt="counter full image" />
          )}
        </div>
      )}
    </SCCounter>
  );
}
