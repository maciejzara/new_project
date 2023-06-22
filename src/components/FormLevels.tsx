import React, { FormEvent } from "react";
import Api from "services/Api";
import useGameContext from "context/useGameContext";

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  description: HTMLInputElement;
}

interface LevelForm extends HTMLFormElement {
  readonly elements: FormElements;
}

// ADD Levels Axios
export const FormLevels: React.FC = () => {
  const { levels, setLevels } = useGameContext();

  // ADD Levels Axios with Instance
  const addLevels = async (e: FormEvent<LevelForm>) => {
    e.preventDefault();

    if (e.target) {
      const name = e.currentTarget.elements.name.value;
      const description = e.currentTarget.elements.description.value;
      const response = await Api.instance().AxiosAddLevel(name, description);
      setLevels([...levels, response.data.data]);
      const levelForm = e.target as HTMLFormElement;
      levelForm.reset();
    }
  };

  return (
    <>
      <div className="columns">
        <div className="column">
          <form onSubmit={addLevels}>
            <h1 className="title is-3 is-spaced has-text-white mt-1">Levels</h1>

            <div className="field">
              <label htmlFor="name" className="label has-text-white">
                Name
              </label>
              <div className="control">
                <input
                  type="text"
                  id="name"
                  className="input is-primary is-small"
                  autoComplete="off"
                ></input>
              </div>
            </div>

            <div className="field">
              <label htmlFor="description" className="label has-text-white">
                Description
              </label>
              <div className="control">
                <input
                  id="description"
                  className="input is-primary is-small"
                  autoComplete="off"
                ></input>
              </div>
            </div>

            <div className="control">
              <button type="submit" className="button is-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
