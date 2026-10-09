import { useEffect, useRef } from "react";

export type ShortcutMap = Record<string, () => void>;

const isTyping = (target: EventTarget | null) => {
    const el = target as HTMLElement | null;
    if (!el) return false;
    if (el.isContentEditable || el.tagName === "TEXTAREA") return true;
    return el.tagName === "INPUT" && (el as HTMLInputElement).type !== "range";
};

/** This is really bareboned shortcut handler
*   Later we should implement here stuff like holding (most likely) */
export const useShortcuts = (shortcuts: ShortcutMap) => {
    const ref = useRef(shortcuts);
    ref.current = shortcuts;

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey || e.metaKey || e.altKey || isTyping(e.target)) return;
            const action = ref.current[e.key.toLowerCase()];
            if (!action) return;
            e.preventDefault();
            action();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);
};
