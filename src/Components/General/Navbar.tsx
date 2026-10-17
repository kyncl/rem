import { IoMdSettings } from "react-icons/io";
import { Search } from "./Search";
import { RiSimCardWarningFill } from "react-icons/ri";
import { JSX, useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useTabs } from '../../hooks/useTabs';
import { AppLogo } from './AppLogo';
import { usePlayerInfo } from '../../hooks/usePlayerInfo';

type NavbarProps = {
    hasConflicts?: boolean;
};

export const Navbar = ({ hasConflicts = false }: NavbarProps) => {
    const { currentTab } = useTabs();

    const isHome = currentTab.type === "Home";
    const isSettings = currentTab.type === "Settings";

    const playerInfo = usePlayerInfo();
    const [leftBtn, setLeftBtn] = useState<JSX.Element | null>(null);

    useEffect(() => {
        if (!isHome)
            setLeftBtn((
                <button
                    onClick={playerInfo.actions.setPrevious}
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
                    onClick={playerInfo.actions.setConflicts}
                    aria-label="Conflicts and new files (!)"
                    title="Conflicts / new files (!)"
                    className="cursor-pointer text-main"
                >
                    <RiSimCardWarningFill size={30} />
                </button>
            ));
        else
            setLeftBtn((<AppLogo style={{ width: '30px' }} />));
    }, [isHome, currentTab]);

    return (
        <div className="sticky z-50 top-0 flex items-center bg-background-dark py-3 justify-between px-5 mb-9">
            {leftBtn}
            <Search />
            <button onClick={isSettings ? playerInfo.actions.setPrevious : playerInfo.actions.setSettings} aria-label="Settings" className="group cursor-pointer">
                <IoMdSettings
                    size={30}
                    className="transition-transform duration-1000 ease-in-out group-hover:rotate-180"
                />
            </button>
        </div>
    );
};
