import { Subscribe } from "./components/Subscribe";

export const App = () => {
  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="w-full h-[100px] bg-blue-400 p-1">Header</div>
      <div className="flex flex-row w-full flex-1">
        <div className="bg-amber-600 w-[15%] h-full p-1">Sidebar left</div>
        <div className="bg-amber-200 w-[70%] h-full p-1">
          <Subscribe />
        </div>
        <div className="bg-amber-600 w-[15%] h-full p-1">Sidebar right</div>
      </div>
    </div>
  );
};
