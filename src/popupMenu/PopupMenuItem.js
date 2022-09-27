import clsx from 'clsx';

export default function PopupMenuItem(props) {
  const { entry, selected, ...restProps } = props;

  const createImage = imageUrl => {
    return <img src={ imageUrl } class="djs-popup__img" />;
  };

  return (
    <li
      class={ clsx('entry', { selected }) }
      data-id={ entry.id }
      { ...restProps }
    >
      <div class="content">
        <span
          class={ clsx('name', entry.className) }
          title={ entry.label || entry.name }
        >
          {entry.imageUrl ? createImage(entry.imageUrl) : null}
          {entry.label || entry.name}
        </span>
        <span
          class="description"
          title={ entry.description }
        >
          {entry.description}
        </span>
      </div>
    </li>
  );
}
