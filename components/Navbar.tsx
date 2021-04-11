import classNames from "classnames";
import React from "react";
import Slide from "react-reveal/Fade";
function Navbar(props: any) {
  const { comp, setComp } = props;
  const Button = (props) => {
    const { name, ...rest } = props;
    return (
      <div>
        <button
          onClick={() => setComp(name)}
          className={classNames(
            "block h-12 text-white m-2 p-2 border-b border-opacity-0 hover:border-opacity-100 border-yellow-300",
            { "text-yellow-300": comp === name }
          )}
        >
          {name}
        </button>
      </div>
    );
  };
  return (
    <div>
      <Slide bottom>
        <div className="flex flex-col h-40 justify-center ">
          <div className="m-2 p-2  text-2xl text-yellow-300 flex justify-center">
            <h1 className="uppercase tracking-wider"> Starwars</h1>
          </div>
          <div className="flex justify-center">
            <Button name="Planets" />
            <Button name="People" />
          </div>
        </div>
      </Slide>
    </div>
  );
}

export default Navbar;
