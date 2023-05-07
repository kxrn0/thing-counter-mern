import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Drawer from "../Drawer/Drawer";
import SCTags from "./Tags.styled";
import useTagContext from "../../hooks/useTagContext";

export default function Tags({ tags, setTags }) {
  const [tagInput, setTagInput] = useState("");
  const { tags: existingTags } = useTagContext();

  function add_tag() {
    const trimmed = tagInput.trim();
    const reg = new RegExp(`^${trimmed}$`, "i");

    if (trimmed && !tags.some((tag) => reg.test(tag)))
      setTags((prevTags) => [...prevTags, trimmed]);

    setTagInput("");
  }

  function remove_tag(tag) {
    setTags((prevTags) => prevTags.filter((other) => other !== tag));
  }

  function add_existing_tag(tag) {
    setTags((prevTags) => [...prevTags, tag]);
  }

  useEffect(() => {
    console.log(`called ${Math.random()}`);

    function handle_key_press(event) {
      if (event.key === "Enter" && document.activeElement.id === "tag-input") {
        event.preventDefault();

        add_tag();
      }
    }

    document.addEventListener("keypress", handle_key_press);

    return () => document.removeEventListener("keypress", handle_key_press);
  });

  return (
    <SCTags>
      <label>
        <input
          type="text"
          id="tag-input"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
        />
        <button type="button" className="add-tag" onClick={add_tag}>
          #add_tag
        </button>
      </label>
      <div className="tags">
        {tags.map((tag) => (
          <div key={tag} className="tag">
            <button type="button" onClick={() => remove_tag(tag)}>
              <FontAwesomeIcon icon={faClose} />
            </button>
            {tag}
          </div>
        ))}
      </div>
      <Drawer message="Add existing tags">
        {existingTags.map((tag) => {
          const reg = new RegExp(`^${tag.name}$`, "i");

          return tags.some((other) => reg.test(other)) ? null : (
            <div key={tag.name} className="tag">
              <button type="button" onClick={() => add_existing_tag(tag.name)}>
                +
              </button>
              {tag.name}
            </div>
          );
        })}
      </Drawer>
    </SCTags>
  );
}
