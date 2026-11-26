import { flushSync } from 'react-dom';

/* If you want to nerd about the transition,
 * this comment is just for you.
 * It's quite simple. You put data properties
 * on element (vt function is recommended for it)
 * and than use withTransition function and that's it.
 * On each call of withTransition will clean the
 * transition elements and reapply the names based
 * on the scope. Afterwards the webview does the
 * rest with the calculation. Don't know if
 * it is enough, but hopefully it is :P
 */

/** Separator for scope is space,
 *  PLEASE don't add new scopes with spaces
 *   or at least change it
 */
type Scope = 'Song' | 'Album';

/** To define the element is used in transition
 * name: name, which should have element in transition (MUST BE UNIQUE IN RENDERED PART)
 * scope: in which scopes/tabs should be used in transition
 * (example: miniplayer is used for transition in Song tab, meaning it will be scope: "Song")
 * What does it do? Basically adds data variables (the name and the scope) and that's it.
 * Yep. That simple
 * */
export const vt = (name: string, scope: Scope | Scope[]) => ({
    'data-vt-name': name,
    // Separator for scope is space bar, PLEASE don't add new
    // scopes with spaces or at least change this
    'data-vt-scope': Array.isArray(scope) ? scope.join(' ') : scope,
});

const SELECTOR = '[data-vt-name][data-vt-scope]';
let running: ViewTransition | null = null;

const clearNames = () =>
    document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        el.style.viewTransitionName = '';
    });

const applyNames = (scope: Scope) => {
    const used = new Set<string>();

    document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (!el.dataset.vtScope?.split(' ').includes(scope)) return;
        if (!el.checkVisibility()) return;

        let name = el.dataset.vtName;

        if (!name) {
            name = 'default-vt-name';
            console.warn(`[VT] no vtName found using: "${name}"`);
        }

        // Webview is quite freaky, when there's multiple
        // elements with same transition name
        if (used.has(name)) {
            console.warn(
                `[VT] duplicate "${name}" in scope "${scope}", skipped`,
                el,
            );
            return;
        }
        used.add(name);
        el.style.viewTransitionName = name;
    });
};

export const withTransition = (update: () => void, scope: Scope) => {
    const doc = document as Document & {
        startViewTransition?: (cb: () => void) => ViewTransition;
    };
    if (!doc.startViewTransition || document.visibilityState === 'hidden') {
        return update();
    }

    /// If you spam the transition
    running?.skipTransition();

    clearNames();
    applyNames(scope);

    const t = doc.startViewTransition(() => {
        flushSync(update);
        clearNames();
        applyNames(scope);
    });
    running = t;

    t.ready.catch((e) => console.warn('[VT] ready failed:', e));
    t.finished
        .catch(() => {})
        .finally(() => {
            if (running === t) {
                running = null;
                clearNames();
            }
        });
};
