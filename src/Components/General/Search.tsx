import { useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";

export const Search = ({ searchInMiddle }: { searchInMiddle: boolean }) => {
    const results = [
        {
            text: "For example name of Album or Song",
            desc: "Some extra info, like Author, year,...",
            action: () => {/*What should happen on click*/ }
        },
        {
            text: "Other result",
            desc: "Some extra info, like Author, year,...",
            action: () => {/*What should happen on click*/ }
        },
        {
            text: "Something",
            desc: "Some extra info, like Author, year,...",
            action: () => {/*What should happen on click*/ }
        },
        {
            text: "Other result 1",
            desc: "Some extra info, like Author, year,...",
            action: () => {/*What should happen on click*/ }
        },
        {
            text: "Something 1",
            desc: "Some extra info, like Author, year,...",
            action: () => {/*What should happen on click*/ }
        },
        {
            text: "For example name of Album or Song 11",
            desc: "Some extra info, like Author, year,...",
            action: () => {/*What should happen on click*/ }
        },
        {
            text: "Other result 11",
            desc: "Some extra info, like Author, year,...",
            action: () => {/*What should happen on click*/ }
        },
        {
            text: "Something 111",
            desc: "Some extra info, like Author, year,...",
            action: () => {/*What should happen on click*/ }
        },
        {
            text: "Other result 1111",
            desc: "Some extra info, like Author, year,...",
            action: () => {/*What should happen on click*/ }
        },
        {
            text: "Something 11111",
            desc: "Some extra info, like Author, year,...",
            action: () => {/*What should happen on click*/ }
        },
    ];
    const MIN_CH = 18;
    const MAX_CH = 40;
    const [showInput, setShowInput] = useState(false);
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const chars = Math.min(Math.max(value.length, MIN_CH), MAX_CH);

    return (
        <div className="flex items-center">
            <button
                className="cursor-pointer"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                    setShowInput(!showInput);
                    if (showInput) {
                        inputRef.current?.blur();
                    } else {
                        inputRef.current?.focus();
                    }
                }}
            >
                <IoSearch size={30} />
            </button>

            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={() => setShowInput(false)}
                onKeyDown={(e) => {
                    if (e.key === "Escape") {
                        setShowInput(false);
                        inputRef.current?.blur();
                    }
                }}
                style={{ width: showInput ? `calc(${chars}ch + 1.5rem)` : 0 }}
                className={`rounded-xl bg-background py-1
                    transition-[width,margin,padding,opacity] duration-300 ease-in-out
                    ${showInput ? "ml-5 px-3 opacity-100" : "ml-0 px-0 opacity-0"}`}
            />
            {/*
                I mean it will look weird, when the Search Icon is on left,
                but I want to go to eat my dinner :(
            */}
            <ul className={`fixed sm:h-106 overflow-y-auto
                left-1/2 -translate-x-1/2
            ${!searchInMiddle ? "sm:left-0 sm:translate-x-0" : ""}
            sm:top-15 top-14 min-w-full
            sm:min-w-120 overflow-hidden sm:rounded-2xl
            rounded-b-2xl h-191
            bg-background-dark border border-foreground/20
            ${!showInput ? "hidden" : ""}`}>
                {results.map((result, i) => (
                    <li
                        key={result.text}
                        style={{ animationDelay: `${i * 50}ms` }}
                        className="animate-fly-in pl-6 pt-5 pb-3 border-b-foreground/30 not-last:border-b hover:bg-background"
                    >
                        <button onClick={result.action} className="text-left cursor-pointer">
                            <h4 className="text-xl">{result.text}</h4>
                            <h5 className="text-3xs">{result.desc}</h5>
                        </button>
                    </li>
                ))}
            </ul>
        </div >
    );
};
