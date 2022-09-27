import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useLayoutEffect
} from 'preact/hooks';

import clsx from 'clsx';

import PopupMenuList from './PopupMenuList';
import SearchIcon from '../../assets/icons/search.svg';


/**
 * A preact component that renders the popup menus.
 *
 * @param {any} props
 */
export default function PopupMenu(props) {
  const { onClose, headerEntries } = props;

  const onSelect = (event, entry, shouldClose = true) => {
    entry.action(event, entry);

    shouldClose && onClose();
  };

  const inputRef = useRef();
  const resultsRef = useRef();

  const [ value, setValue ] = useState('');

  const [ entries, setEntries ] = useState(props.entries);
  const [ selectedEntry, setSelectedEntry ] = useState(entries[0]);

  // filter entries on value change
  useEffect(() => {
    const filter = entry => {
      if (!value) {
        return true;
      }

      const search = [
        entry.name,
        entry.description || '',
        entry.label || '',
        entry.id || ''
      ]
        .join('---')
        .toLowerCase();

      return value
        .toLowerCase()
        .split(/\s/g)
        .every(term => search.includes(term));
    };

    const entries = props.entries.filter(filter);

    if (!entries.includes(selectedEntry)) {
      setSelectedEntry(entries[0]);
    }

    setEntries(entries);
  }, [ value, selectedEntry, props.entries ]);

  // focus input on initial mount
  useLayoutEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  // scroll to keyboard selected result
  useLayoutEffect(() => {
    const containerEl = resultsRef.current;

    if (!containerEl)
      return;

    const selectedEl = containerEl.querySelector('.selected');

    if (selectedEl) {
      scrollIntoView(selectedEl);
    }
  }, [ selectedEntry ]);

  // handle keyboard seleciton
  const keyboardSelect = useCallback(
    direction => {
      const idx = entries.indexOf(selectedEntry);

      let nextIdx = idx + direction;

      if (nextIdx < 0) {
        nextIdx = entries.length - 1;
      }

      if (nextIdx >= entries.length) {
        nextIdx = 0;
      }

      setSelectedEntry(entries[nextIdx]);
    },
    [ entries, selectedEntry ]
  );

  const handleKeyDown = useCallback(
    event => {
      if (event.key === 'Enter' && selectedEntry) {
        return onSelect(event, selectedEntry);
      }

      if (event.key === 'Escape') {
        return onClose();
      }

      // ARROW_UP or SHIFT + TAB navigation
      if (event.key === 'ArrowUp' || (event.key === 'Tab' && event.shiftKey)) {
        keyboardSelect(-1);

        return event.preventDefault();
      }

      // ARROW_DOWN or TAB navigation
      if (event.key === 'ArrowDown' || event.key === 'Tab') {
        keyboardSelect(1);

        return event.preventDefault();
      }
    },
    [ selectedEntry, keyboardSelect ]
  );

  const handleKey = useCallback(event => {
    setValue(() => event.target.value);
  }, []);

  const displayHeader = props.title || Object.keys(headerEntries).length > 0;

  return (
    <PopupMenuWrapper { ...props }>
      {displayHeader &&
        <div class="header">
          <h3 class="title">{props.title}</h3>
          {Object.entries(headerEntries).map(([ key, value ]) => (
            <span
              class={ clsx('header-entry', value.className, {
                active: value.active
              }) }
              onClick={ event => onSelect(event, value, false) }
              title={ `Toggle ${value.title}` }
              data-id={ key }
            >
              {value.imageUrl ? <img src={ value.imageUrl } /> : null}
              {value.label ? value.label : null}
            </span>
          ))}
        </div>
      }
      {props.entries.length &&
      <div class="djs-popup-body">
        <div
          class={ clsx('search', {
            hidden: props.entries.length < 5
          }) }
        >
          <SearchIcon />
          <input
            ref={ inputRef }
            type="text"
            onKeyup={ handleKey }
            onKeydown={ handleKeyDown }
          />
        </div>
        <PopupMenuList
          entries={ entries }
          selectedEntry={ selectedEntry }
          setSelectedEntry={ setSelectedEntry }
          onSelect={ onSelect }
          resultsRef={ resultsRef }
        />
      </div>
      }
    </PopupMenuWrapper>
  );
}

/**
 * A preact component that wraps the popup menu.
 *
 * @param {any} props
 */
function PopupMenuWrapper(props) {
  const { onClose, className, children } = props;

  const overlayRef = useRef();

  useLayoutEffect(() => {
    if (typeof props.position !== 'function') {
      return;
    }

    const overlayEl = overlayRef.current;
    const position = props.position(overlayEl);

    overlayEl.style.left = `${position.x}px`;
    overlayEl.style.top = `${position.y}px`;
  }, [ overlayRef.current, props.position ]);

  return (
    <div
      class={ clsx('djs-popup', className) }
      onClick={ () => onClose() }
    >
      <div
        class="overlay"
        ref={ overlayRef }
        onClick={ e => e.stopPropagation() }
      >
        {children}
      </div>
    </div>
  );
}

// helpers //////////////////////
function scrollIntoView(el) {
  if (typeof el.scrollIntoViewIfNeeded === 'function') {
    el.scrollIntoViewIfNeeded();
  } else {
    el.scrollIntoView({
      scrollMode: 'if-needed',
      block: 'nearest'
    });
  }
}
