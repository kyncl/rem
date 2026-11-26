import { useEffect, useRef } from 'react';

export type ShortcutMap = Record<string, () => void>;

const isTyping = (target: EventTarget | null) => {
    const el = target as HTMLElement | null;
    if (!el) return false;
    if (el.isContentEditable || el.tagName === 'TEXTAREA') return true;
    return el.tagName === 'INPUT' && (el as HTMLInputElement).type !== 'range';
};

const getCombo = (e: KeyboardEvent) =>
    (e.ctrlKey || e.metaKey ? 'mod+' : '') +
    (e.altKey ? 'alt+' : '') +
    e.key.toLowerCase();

export const useShortcuts = (shortcuts: ShortcutMap) => {
    const ref = useRef(shortcuts);
    ref.current = shortcuts;

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            const combo = getCombo(e);
            const action = ref.current[combo];
            if (!action) return;
            if (isTyping(e.target) && !combo.startsWith('mod+')) return;
            e.preventDefault();
            action();
        };

        const onMouse = (e: MouseEvent) => {
            if (e.button !== 3) return;
            e.preventDefault();
            if (e.type === 'mouseup') ref.current.back?.();
        };

        // Android back button / swipe gesture / browser back
        history.pushState({ shortcutGuard: true }, '');
        const onPopState = () => {
            ref.current.back?.();
            history.pushState({ shortcutGuard: true }, '');
        };

        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('mousedown', onMouse);
        window.addEventListener('mouseup', onMouse);
        window.addEventListener('popstate', onPopState);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('mousedown', onMouse);
            window.removeEventListener('mouseup', onMouse);
            window.removeEventListener('popstate', onPopState);
        };
    }, []);
};
