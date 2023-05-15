import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Drawer from "../../components/Drawer/Drawer";
import Tags from "../../components/Tags/Tags";
import useAuthContext from "../../hooks/useAuthContext";
import SCUpload from "./Upload.styled";
import useCounterContext from "../../hooks/useCounterContext";

export default function Upload() {
  const [tags, setTags] = useState([]);
  const { dispatch: dispatch_counter_action } = useCounterContext();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  async function handle_submission(event) {
    event.preventDefault();

    const data = new FormData();
    const form = event.target;
    const name = form["name-input"].value;
    const description = form["description-box"].value;
    const image = form["image-file"].files[0];

    data.append("name-input", name);
    data.append("description-box", description);
    data.append("image-file", image);
    data.append("tags", JSON.stringify(tags));

    const response = await fetch("http://localhost:9999/api/counters", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      body: data,
    });
    const json = await response.json();
    const { counter } = json;

    console.log("created:");
    console.log(counter);

    dispatch_counter_action({
      type: "ADD_COUNTER",
      payload: { ...counter, index: 1 },
    });

    navigate(`/counter/${counter._id}`, { state: counter._id });
  }

  return (
    <SCUpload onSubmit={handle_submission}>
      <label htmlFor="file-input">
        <input type="file" name="image-file" />
      </label>
      <label htmlFor="name-input">
        <span>Name</span>
        <input type="text" id="name-input" />
      </label>
      <label htmlFor="description-box">
        <span>Description</span>
        <textarea name="description-box" id="description-box"></textarea>
      </label>
      <Tags tags={tags} setTags={setTags} />
      <button>Create</button>
    </SCUpload>
  );
}
