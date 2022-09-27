import PopupMenuItem from './PopupMenuItem';

export default function PopupMenuList(props) {
  const {
    selectedEntry,
    setSelectedEntry,
    onSelect,
    resultsRef
  } = props;

  const groups = groupEntries(props.entries);

  const entries = groups.map(group => {
    const groupEntries = group.entries;

    return (
      <div data-group={ group.id }>
        {group.name && group && (
          <li key={ group.id } class="entry-header">
            {group.name}
          </li>
        )}
        {groupEntries.map((entry, idx) => (
          <PopupMenuItem
            key={ entry.id }
            entry={ entry }
            selected={ entry === selectedEntry }
            onMouseEnter={ () => setSelectedEntry(entry) }
            onClick={ event => onSelect(event, entry) }
          />
        ))}
      </div>
    );
  });

  return (
    <ul class="results" ref={ resultsRef }>
      {entries}
    </ul>
  );
}


// helpers
function groupEntries(entries) {
  const groups = [];

  const getGroup = group => groups.find(elem => group.id === elem.id);

  const containsGroup = group => !!getGroup(group);

  // legacy support for provider built for the old popUp menu
  const formatGroup = group =>
    typeof group === 'string' ? { id: group } : group;

  entries.forEach(entry => {

    // assume a default group when none is provided
    const group = entry.group ? formatGroup(entry.group) : { id: 'default' };

    if (!containsGroup(group)) {
      groups.push({ ...group, entries: [ entry ] });
    } else {
      getGroup(group).entries.push(entry);
    }
  });

  return groups;
}