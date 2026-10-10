import { IoMdSettings } from "react-icons/io";
import { Search } from "./Search";
import { RiSimCardWarningFill } from "react-icons/ri";
import { JSX, useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

type NavbarProps = {
    hasConflicts?: boolean;
    isHome?: boolean;
    onPreviousClick?: () => void;
    onConflictsClick?: () => void;
    onSettingsClick?: () => void;
};

export const Navbar = ({ hasConflicts = false, isHome = true, onPreviousClick, onConflictsClick, onSettingsClick }: NavbarProps) => {
    const [leftBtn, setLeftBtn] = useState<JSX.Element | null>(null);
    useEffect(() => {
        if (!isHome)
            setLeftBtn((
                <button
                    onClick={onPreviousClick}
                    aria-label="Go back to previous tab"
                    title="Go back to previous tab"
                    className="cursor-pointer"
                >
                    <MdKeyboardArrowLeft size={30} />
                </button>
            ));
        else if (hasConflicts)
            setLeftBtn((
                <button
                    onClick={onConflictsClick}
                    aria-label="Conflicts and new files (!)"
                    title="Conflicts / new files (!)"
                    className="cursor-pointer text-main"
                >
                    <RiSimCardWarningFill size={30} />
                </button>
            ));
        else
            setLeftBtn(null)

    }, [isHome]);

    return (
        <div className="sticky z-5 top-0 flex items-center bg-background-dark py-3 justify-between px-5 mb-9">
            {leftBtn}
            <Search searchInMiddle={hasConflicts || !isHome} />
            <button onClick={onSettingsClick} aria-label="Settings" className="group cursor-pointer">
                <IoMdSettings
                    size={30}
                    className="transition-transform duration-1000 ease-in-out group-hover:rotate-180"
                />
            </button>
        </div>
    );
};
